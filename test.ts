// Check touch sensor no.5
JoyPiAdvanced.touchsensorInit()
let touchsensorState = JoyPiAdvanced.touchSensorCheck(5)

// Get ultrasonic distance
let ultrasonicDistance = JoyPiAdvanced.measureDistance()

// Turn vibration motor on for 5 seconds
JoyPiAdvanced.vibrationOn()
pause(5000)
JoyPiAdvanced.vibrationOff()