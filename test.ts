// Read current year from RTC
let rtcCurrentYear = JoyPiAdvanced.rtcGetYear()

// Turn on relay
JoyPiAdvanced.relayOn()

// Turn servo motor to degree angle 90
JoyPiAdvanced.turnMotor(90)

// Read current state of shock sensor
let shocksensorIsTriggered = JoyPiAdvanced.shocksensorCheck()

// Turn stepper motor clockwise by 10 steps
JoyPiAdvanced.stepperRotate(JoypiAdvancedStepperDirection.clockwise, 10, JoyPiAdvancedStepunit.steps)

// Check state of switch no. 2
let switchState = JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch2)

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