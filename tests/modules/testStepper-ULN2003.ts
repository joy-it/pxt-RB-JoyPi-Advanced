JoyPiAdvanced.initializeAdvanced()

JoyPiAdvanced.stepperRotate(JoypiAdvancedStepperDirection.clockwise, 10, JoyPiAdvancedStepunit.steps)

basic.pause(1000)

serial.writeLine("Clockwise rotation")
JoyPiAdvanced.stepperRotate(JoypiAdvancedStepperDirection.clockwise, 1, JoyPiAdvancedStepunit.rotations)
serial.writeLine("Counterclockwise rotation")
JoyPiAdvanced.stepperRotate(JoypiAdvancedStepperDirection.counterclockwise, 1, JoyPiAdvancedStepunit.rotations)