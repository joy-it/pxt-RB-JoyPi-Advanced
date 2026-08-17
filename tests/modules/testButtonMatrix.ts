function testButtonMatrix() {
    while (true) {
        key = JoyPiAdvanced.buttonmatrixGetKey()
        if (key != "") {
            serial.writeLine(key)
        }
        basic.pause(100)
    }
}

function testButtonMatrixCalculate() {
    while (true) {
        result = JoyPiAdvanced.buttonmatrixCalculate(result)
        if (result != last_result && result != "") {
            serial.writeLine(result)
            last_result = result
        }
        if (result.includes("can not be calculated")) result = ""
    }
}

function testButtonMatrixCode() {
    while (true) {
        code = JoyPiAdvanced.buttonmatrixGetButtonCode()
        if (code != -1) {
            serial.writeLine(convertToText(code))
        }
        basic.pause(100)
    }
}
let key: string = null
let code: number = null
let result = ""
let last_result = ""
JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.buttonmatrixInit()

// methods has to be executed to test matrix