JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.gyroscopeInit()

JoyPiAdvanced.gyroscopeSetScaleFactor(JoyPiAdvancedGyroscopeScaleFactor.scale_0)

let gyroscopeTemperature = JoyPiAdvanced.gyroscopeGetTemperature()
let gyroscopeXAxis = JoyPiAdvanced.gyroscopeGetX()
let gyroscopeYAxis = JoyPiAdvanced.gyroscopeGetY()
serial.writeLine("Temperature: " + convertToText(gyroscopeTemperature) + " C -- X-Axis-Value: " + convertToText(gyroscopeXAxis) + " -- Y-Axis-Value: " + convertToText(gyroscopeYAxis))

function testGyroscope() {
    while (true){
        let movement = JoyPiAdvanced.gyroscopeGetTilt()
        if (!movement.includes("No movement")) {
            serial.writeLine(movement)
        }
    }
}

// execute method here