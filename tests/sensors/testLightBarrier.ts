JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializeLightBarrier()


if( JoyPiAdvanced.lightBarrierIsTriggered()){
    serial.writeLine("Light barrier is triggered")
}
else {
    serial.writeLine("Light barrier is not triggered")
}

function testLightBarrier(){
    let rpm = 0
    lightBarrier_test = true
    while (true) {
        rpm = JoyPiAdvanced.lightBarrierRPM(5)
        if (JoyPiAdvanced.lightBarrierRPMInterval()) {
            serial.writeLine("RPM: " + rpm)
    }
    }
}

let lightBarrier_test = false

control.inBackground(function () {
    if (lightBarrier_test){
    JoyPiAdvanced.stepperRotate(JoypiAdvancedStepperDirection.clockwise, 100, JoyPiAdvancedStepunit.rotations)
    }
})