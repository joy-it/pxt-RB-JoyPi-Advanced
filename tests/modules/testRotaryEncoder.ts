JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializeRotaryEncoder()

basic.pause(100)

function testRotaryEncoder() {
    serial.writeLine("Testing rotary encoder")
    JoyPiAdvanced.rotaryEncoderWhenTurned(JoyPiAdvancedDirection.clockwise, function () {
        serial.writeLine("Rotary encoder turned clockwise")
    })
    JoyPiAdvanced.rotaryEncoderWhenTurned(JoyPiAdvancedDirection.counterclockwise, function () {
        serial.writeLine("Rotary encoder turned counterclockwise")
    })
    JoyPiAdvanced.rotaryEncoderWhenPressed(function () {
        serial.writeLine("Rotary encoder pressed")
    })
    while (true) {
        basic.pause(20)
    }
}

// method should be executed here

JoyPiAdvanced.deinitializeRotaryEncoder()