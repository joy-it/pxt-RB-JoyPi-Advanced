JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializeLightBarrier()


if (JoyPiAdvanced.lightBarrierIsTriggered()) {
    serial.writeLine("Light barrier is triggered")
}
else {
    serial.writeLine("Light barrier is not triggered")
}

function testLightBarrier() {
    let rpm = 0
    lightBarrier_test = true
    while (true) {
        rpm = JoyPiAdvanced.lightBarrierRPM(5)
        if (JoyPiAdvanced.lightBarrierRPMInterval()) {
            serial.writeLine("RPM: " + rpm)
        }
        basic.pause(5)
    }
}

let lightBarrier_test = false

control.inBackground(function () {
    while (true) {
        if (lightBarrier_test) {
            JoyPiAdvanced.stepperRotate(JoypiAdvancedStepperDirection.clockwise, 1, JoyPiAdvancedStepunit.rotations)
        }
        else{
            basic.pause(20)
        }
    }
})

// method should be executed here