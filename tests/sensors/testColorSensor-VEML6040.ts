JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initColorSensor()

function testColorSensorSingleRead() {
    while (true) {
        let red = JoyPiAdvanced.colorSensorGetRed()
        let green = JoyPiAdvanced.colorSensorGetGreen()
        let blue = JoyPiAdvanced.colorSensorGetBlue()
        let white = JoyPiAdvanced.colorSensorGetWhite()
        serial.writeLine("Red: " + convertToText(red) + " -- Green: " + convertToText(green) + " -- Blue: " + convertToText(blue) + " -- White: " + convertToText(white))
        basic.pause(1000)
    }
}

function testColorSensorReadRGBW() {
    let raw_values: number[] = []
    while (true) {
        raw_values = JoyPiAdvanced.colorSensorGetRGBW()
        serial.writeLine("Red: " + convertToText(raw_values[0]) + " -- Green: " + convertToText(raw_values[1]) + " -- Blue: " + convertToText(raw_values[2]) + " -- White: " + convertToText(raw_values[3]))
        basic.pause(1000)
    }
}

function testColorSensorReadAll() {
    let raw_values: string[] = []
    let last_color = ""
    let color = ""
    while (true) {
        raw_values = JoyPiAdvanced.colorSensorReadAll()
        color = raw_values[0]
        if (color != last_color) {
            serial.writeLine("Detected color: " + raw_values[0])
            serial.writeLine("red: " + raw_values[1])
            serial.writeLine("green: " + raw_values[2])
            serial.writeLine("blue: " + raw_values[3])
            serial.writeLine("white: " + raw_values[4])
            serial.writeLine("-------------------------------------------------")
            last_color = color
        }
    }
}

JoyPiAdvanced.colorSensorSetIntegrationTime(JoyPiAdvancedColorSensor_IntegrationTime.ms_160)
JoyPiAdvanced.colorSensorForceMode()
JoyPiAdvanced.colorSensorAutoMode()

// execute methods here

JoyPiAdvanced.disableColorSensor()