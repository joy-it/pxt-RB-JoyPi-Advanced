// Show blue rectangle on TFT
JoyPiAdvanced.tftInit()
JoyPiAdvanced.tftDrawRectangle(10, 10, 50, 20, JoyPiAdvancedTFTColor.blue)

// Check touch sensor no.5
JoyPiAdvanced.touchsensorInit()
let touchsensorState = JoyPiAdvanced.touchSensorCheck(5)

// Get ultrasonic distance
let ultrasonicDistance = JoyPiAdvanced.measureDistance()

// Turn vibration motor on for 5 seconds
JoyPiAdvanced.vibrationOn()
pause(5000)
JoyPiAdvanced.vibrationOff()