JoyPiAdvanced.initializeAdvanced()

let joystickYValue = JoyPiAdvanced.joystickYValue()
let joystickXValue = JoyPiAdvanced.joystickXValue()
serial.writeLine("Y-value: " + convertToText(joystickYValue) + " -- X-value: " + convertToText(joystickXValue))

if (JoyPiAdvanced.joystickCheckButton()){
    serial.writeLine("Joystick was pressed")
}
else {
    serial.writeLine("Joystick was not pressed")
}