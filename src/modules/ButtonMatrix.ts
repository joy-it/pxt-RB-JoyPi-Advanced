namespace JoyPiAdvanced  {
    let i2c_address: number
    let row1: boolean
    let row2: boolean
    let row3: boolean
    let row4: boolean
    let column1: boolean
    let column2: boolean
    let column3: boolean
    let column4: boolean

    i2c_address = 0x22

    function readGPIO() {
        let gpio = pins.createBuffer(1)
        gpio.setNumber(NumberFormat.Int8LE, 0, 0x09)
        pins.i2cWriteBuffer(i2c_address, gpio, false)
        return pins.i2cReadNumber(i2c_address, NumberFormat.Int8LE)
    }

    function checkMatrix() {
        let column_value = readGPIO()

        if (column_value == 14) column1 = true
        else if (column_value == 13) column2 = true
        else if (column_value == 11) column3 = true
        else if (column_value == 7) column4 = true
        else return false

        let rows = pins.createBuffer(2)
        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x80)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        let row_value = readGPIO() & 0xFF
        if (row_value == 0x8F)row4 = true

        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x40)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        row_value = readGPIO() & 0xFF
        if (row_value == 0x4F) row3 = true

        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x20)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        row_value = readGPIO() & 0xFF
        if (row_value == 0x2F) row2 = true

        rows.setNumber(NumberFormat.Int8LE, 0, 0x09)
        rows.setNumber(NumberFormat.Int8LE, 1, 0x10)
        pins.i2cWriteBuffer(i2c_address, rows, false)
        row_value = readGPIO()
        if (row_value == 0x1F) row1 = true

        if (row1 == false && row2 == false && row3 == false && row4 == false) return false
            
        return true
    }

    function buttonmatrixCleanup() {
        column1 = false
        column2 = false
        column3 = false
        column4 = false
        row1 = false
        row2 = false
        row3 = false
        row4 = false

        let reset = pins.createBuffer(2)

        reset.setNumber(NumberFormat.Int8LE, 0, 0x00)
        reset.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, reset, false)

        reset.setNumber(NumberFormat.Int8LE, 0, 0x09)
        reset.setNumber(NumberFormat.Int8LE, 1, 0x00)
        pins.i2cWriteBuffer(i2c_address, reset, false)

        reset.setNumber(NumberFormat.Int8LE, 0, 0x06)
        reset.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, reset, false)
    }

    function isDigit(character: string) {
        return character >= "0" && character <= "9"
    }

    function isOperator(operator: string) {
        return operator == "+" ||
            operator == "-" ||
            operator == "*" ||
            operator == "/" ||
            operator == "**" ||
            operator == "//"
    }

    function operatorPriority(operator: string) {
        if (operator == "**") return 3;
        if (operator == "*" || operator == "/" || operator == "//") return 2;
        if (operator == "+" || operator == "-") return 1;
        return 0;
    }

    function applyOperator(values: number[], operators: string[]) {
        if (values.length < 2 || operators.length < 1) return false;
        let operator = operators.pop()
        let rightValue = values.pop()
        let leftValue = values.pop()
        let result = 0
        if (operator == "+") result = leftValue + rightValue
        else if (operator == "-") result = leftValue - rightValue
        else if (operator == "*") result = leftValue * rightValue
        else if (operator == "**") result = Math.pow(leftValue, rightValue)
        else if (operator == "/") {
            if (rightValue == 0) return false
            result = leftValue / rightValue
        }
        else if (operator == "//") {
            if (rightValue == 0) return false
            result = Math.floor(leftValue / rightValue)
        }
        else return false
        values.push(result)
        return true
    }

    function readOperator(term: string, position: number) {
        let firstCharacter = term.charAt(position)
        if (position + 1 < term.length) {
            let twoCharacters = firstCharacter + term.charAt(position + 1)
            if (twoCharacters == "**" || twoCharacters == "//") return twoCharacters
        }
        if (firstCharacter == "+" || firstCharacter == "-" || firstCharacter == "*" || firstCharacter == "/") return firstCharacter;
        return ""
    }
    
    function calculateTerm(term: string) {
        let values: number[] = []
        let operators: string[] = []
        let position = 0
        let expectNumber = true
        while (position < term.length) {
            let character = term.charAt(position)
            if (expectNumber) {
                let sign = 1
                if (character == "+" || character == "-") {
                    if (character == "-") sign = -1
                    if (position < term.length) position += 1
                }
                let numberValue = 0
                let digitFound = false
                let decimalFactor = 0.1
                let decimalPointFound = false
                while (position < term.length) {
                    character = term.charAt(position)
                    if (isDigit(character)) {
                        digitFound = true
                        let digit = character.charCodeAt(0) - 48
                        if (decimalPointFound) {
                            numberValue += digit * decimalFactor
                            decimalFactor /= 10
                        }
                        else numberValue = numberValue * 10 + digit
                        position += 1
                    }
                    else if (character == "." && !decimalPointFound) {
                        decimalPointFound = true
                        position += 1
                    }
                    else break;
                }
                if (!digitFound) return "Term can not be calculated"
                values.push(numberValue * sign)
                expectNumber = false
            }
            else {
                let currentOperator = readOperator(term, position)
                if (!isOperator(currentOperator)) return "Term can not be calculated"
                while (operators.length > 0) {
                    let previousOperator = operators[operators.length - 1]
                    let shouldCalculate = false
                    if (currentOperator == "**") shouldCalculate = operatorPriority(previousOperator) > operatorPriority(currentOperator)
                    else shouldCalculate = operatorPriority(previousOperator) >= operatorPriority(currentOperator)
                    if (!shouldCalculate) break;
                    if (!applyOperator(values, operators)) return "Term can not be calculated"
                }
                operators.push(currentOperator)
                position += currentOperator.length
                expectNumber = true
            }
        }
        while (operators.length > 0) {
            if (!applyOperator(values, operators)) return "Term can not be calculated!"
        }
        if (values.length != 1 || expectNumber) return "Term can not be calculated!"
        return "" + values[0]
    }


    /**
     * Initialized the button matrix
     */
    //% block="initialize button matrix"
    //% weight=100
    //% subcategory="Button matrix"
    export function buttonmatrixInit() {
        let buffer = pins.createBuffer(11);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xFF)
        buffer.setNumber(NumberFormat.Int8LE, 2, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 3, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 4, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 5, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 6, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 7, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 8, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 9, 0x00)
        buffer.setNumber(NumberFormat.Int8LE, 10, 0x00)
        pins.i2cWriteBuffer(i2c_address, buffer, false)

        let setup = pins.createBuffer(2)

        setup.setNumber(NumberFormat.Int8LE, 0, 0x00)
        setup.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, setup, false)

        setup.setNumber(NumberFormat.Int8LE, 0, 0x09)
        setup.setNumber(NumberFormat.Int8LE, 1, 0x00)
        pins.i2cWriteBuffer(i2c_address, setup, false)

        setup.setNumber(NumberFormat.Int8LE, 0, 0x06)
        setup.setNumber(NumberFormat.Int8LE, 1, 0x0F)
        pins.i2cWriteBuffer(i2c_address, setup, false)

        basic.pause(1)
    }

    /**
     * Returns the the button-code (column|row) if a button on the matrix is pressed
     */
    //% block="button-code of pressed button on button matrix"
    //% weight=60
    //% subcategory="Button matrix"
    export function buttonmatrixGetButtonCode() {
        let returnValue = -1
        if (checkMatrix() == false) return -1
        else {
            control.waitMicros(250000)
            if (column1) {
                if (row1) returnValue = 11
                if (row2) returnValue = 12
                if (row3) returnValue = 13
                if (row4) returnValue = 14
            }
            else if (column2) {
                if (row1) returnValue = 21
                if (row2) returnValue = 22
                if (row3) returnValue = 23
                if (row4) returnValue = 24
            }
            else if (column3) {
                if (row1) returnValue = 31
                if (row2) returnValue = 32
                if (row3) returnValue = 33
                if (row4) returnValue = 34
            }
            else if (column4) {
                if (row1) returnValue = 41
                if (row2) returnValue = 42
                if (row3)  returnValue = 43
                if (row4) returnValue = 44
            }
        }
        buttonmatrixCleanup()
        return returnValue
    }

    /**
     * Returns true if a button on matrix was pressed otherwise false
     */
    //% block="button on button matrix was pressed"
    //% weight=70
    //% subcategory="Button matrix"
    export function buttonmatrixIsButtonPressed() {
        return checkMatrix()
    }

    /**
     * Returns the exact value if a button on the matrix is pressed
     */
    //% block="value of pressed button on button matrix"
    //% weight=90
    //% subcategory="Button matrix"
    export function buttonmatrixGetKey() {
        let value = buttonmatrixGetButtonCode()
        if(value == 11) return "7"
        if (value == 12) return "4"
        if (value == 13) return "1"
        if (value == 14) return "0"
        if (value == 21) return "8"
        if (value == 22) return "5"
        if (value == 23) return "2"
        if (value == 24) return "#"
        if (value == 31) return "9"
        if (value == 32) return "6"
        if (value == 33) return "3"
        if (value == 34) return "="
        if (value == 41) return "*"
        if (value == 42) return "/"
        if (value == 43) return "+"
        if (value == 44) return "-"
        return ""
    }

    /**
     * Calculate term which is input via button Matrix
     * @param current term
     */
    //% block="Calculate %term of button matrix"
    //% weight=60
    //% subcategory="Button matrix"
    export function buttonmatrixCalculate(term?: string){
        let value = buttonmatrixGetKey()
        if (value == "") return term
        else if (value == "=") return calculateTerm(term)
        else if (value == "#") return ""
        return term += value
    }
}
