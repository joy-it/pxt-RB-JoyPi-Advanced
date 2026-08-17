// Read X Axis from Gyroscope
JoyPiAdvanced.gyroscopeInit()
let gyroscopeXAxis = JoyPiAdvanced.gyroscopeGetX()

// Measure voltage off hall sensor
let hallSensorVoltage = JoyPiAdvanced.hallSensorGetMagneticField()

// Get pressed button from IR receiver
JoyPiAdvanced.initIrReceiver()
let pressedIRButton = JoyPiAdvanced.irGetValue()

// Get Y Value from joystick
let joystickYValue = JoyPiAdvanced.joystickGetYValue()

// Show "Hello World" on 16x2 display
JoyPiAdvanced.lcd16x2Init()
JoyPiAdvanced.lcd16x2ShowText('Hello World', 0, 0)

// Measure light intensity with LDR
let ldrLight = JoyPiAdvanced.ldrGetRawVoltage()

// Check if light barrier is triggered
let lightBarrierIsTriggered = JoyPiAdvanced.lightBarrierIsTriggered()

// Measure temperature with NTC
let ntcTemperature = JoyPiAdvanced.ntcGetRawVoltage()

// Draw 10x10 rectangle on OLED
JoyPiAdvanced.oledInit()
JoyPiAdvanced.oledDrawRectangle(0, 0, 10, 10)

// Check state of PIR sensor
let pirMotion = JoyPiAdvanced.pirCheckMotion()

// Set pwm fan to 50% speed
JoyPiAdvanced.pwmFanSetSpeed(50)

// Get current voltage of potentiomer
let potentiometerVoltage = JoyPiAdvanced.potentiometerGetValue()

// Read from RFID tag
JoyPiAdvanced.rfidInit()
JoyPiAdvanced.rfidReadText()

// Set RGB matrix to full red
JoyPiAdvanced.rgbMatrixShowColor(255, 0, 0)

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