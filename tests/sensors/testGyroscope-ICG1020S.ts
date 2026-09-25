JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.gyroscopeInit()

JoyPiAdvanced.gyroscopeSetScaleFactor(JoyPiAdvancedGyroscopeScaleFactor.scale_0)

let gyroscopeTemperature = JoyPiAdvanced.gyroscopeTemperature()
let gyroscopeXAxis = JoyPiAdvanced.gyroscopeXValue()
let gyroscopeYAxis = JoyPiAdvanced.gyroscopeYValue()
serial.writeLine("Temperature: " + convertToText(gyroscopeTemperature) + " C -- X-Axis-Value: " + convertToText(gyroscopeXAxis) + " -- Y-Axis-Value: " + convertToText(gyroscopeYAxis))

function testGyroscope() {
    while (true){
        let movement = JoyPiAdvanced.gyroscopeTilt()
        if (!movement.includes("No movement")) {
            serial.writeLine(movement)
        }
    }
}

// execute method here