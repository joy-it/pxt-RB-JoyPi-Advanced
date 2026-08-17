JoyPiAdvanced.initializeAdvanced()

let joystickYValue = JoyPiAdvanced.joystickGetYValue()
let joystickXValue = JoyPiAdvanced.joystickGetXValue()
serial.writeLine("Y-value: " + convertToText(joystickYValue) + " -- X-value: " + convertToText(joystickXValue))

if (JoyPiAdvanced.joystickCheckButton()){
    serial.writeLine("Joystick was pressed")
}
else {
    serial.writeLine("Joystick was not pressed")
}