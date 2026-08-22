// Get ultrasonic distance
let ultrasonicDistance = JoyPiAdvanced.measureDistance()

// Turn vibration motor on for 5 seconds
JoyPiAdvanced.vibrationOn()
pause(5000)
JoyPiAdvanced.vibrationOff()