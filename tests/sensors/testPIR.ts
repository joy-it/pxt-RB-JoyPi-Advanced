JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializePIR()

basic.pause(100)

if (JoyPiAdvanced.pirCheckMotion()) {
    serial.writeLine("Motion detected")
}
else {
    serial.writeLine("No motion detected")
}

function testPIRMotionDetected() {
    serial.writeLine("Testing PIR motion detected event")
    JoyPiAdvanced.pirMovementRecognized(JoyPiAdvancedMovement.movement, function () {
        serial.writeLine("Motion detected")
    })
    JoyPiAdvanced.pirMovementRecognized(JoyPiAdvancedMovement.no_movement, function () {
        serial.writeLine("PIR ready to detect motion again")
    })
    while (true) {
        basic.pause(20)
    }
}

// method should be executed here

JoyPiAdvanced.deinitializePIR()