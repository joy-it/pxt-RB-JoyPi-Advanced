// Show "1234" on 7-segment display, then clear display
JoyPiAdvanced.segmentInit()
JoyPiAdvanced.segmentWriteNumber(1234, JoyPiAdvancedColon.off)
JoyPiAdvanced.segmentClear()

// Read ADC value and voltage from channel 1
let adcChannel1 = JoyPiAdvanced.adcReadValue(1)
let adcChannel1Voltage = JoyPiAdvanced.adcReadVoltage(1)

// Read Pressure & temperature from barometer
JoyPiAdvanced.barometerInit()
let barometerPressure = JoyPiAdvanced.barometerGetPressure()
let barometerTemperature = JoyPiAdvanced.barometerGetTemperature()

// Get pressed button from matrix
JoyPiAdvanced.buttonmatrixInit()
let buttonmatrixButton = JoyPiAdvanced.buttonmatrixGetKey()

// Turn on buzzer - wait 5 seconds - turn off buzzer
JoyPiAdvanced.buzzerOn(2000)
pause(5000)
JoyPiAdvanced.buzzerOff()

// Measure red with color sensor
JoyPiAdvanced.initColorSensor()
let colorSensorRed = JoyPiAdvanced.colorSensorGetRed()

// Measure temperature & humidity with DHT11
let dht_values = JoyPiAdvanced.dht11GetMeasurement()
if (JoyPiAdvanced.dht11WasSuccessful()) {
    let dht11Temperature = dht_values[0]
    let dht11Humidity = dht_values[1]
}

// Measure temperature with DS18B20
let DS18B20Temperature = JoyPiAdvanced.readDS18B20()

// Write "12345 to address 5 on EEPROM - then read from eeprom
JoyPiAdvanced.eepromWrite(12345, 5)
let eepromValue = JoyPiAdvanced.eepromRead(5)

// Read X Axis from Gyroscope
JoyPiAdvanced.gyroscopeInit()
let gyroscopeXAxis = JoyPiAdvanced.gyroscopeGetX()

// Measure voltage off hall sensor
let hallSensorVoltage = JoyPiAdvanced.hallSensorVoltage()

// Get pressed button from IR receiver
JoyPiAdvanced.initIrReceiver()
let pressedIRButton = JoyPiAdvanced.irButton()

// Get Y Value from joystick
let joystickYValue = JoyPiAdvanced.joystickGetYValue()

// Show "Hello World" on 16x2 display
JoyPiAdvanced.lcd16x2Init()
JoyPiAdvanced.lcd16x2ShowText('Hello World', 0, 0)

// Measure light intensity with LDR
let ldrLight = JoyPiAdvanced.ldrLight()

// Check if light barrier is triggered
let lightBarrierIsTriggered = JoyPiAdvanced.lightBarrierIsTriggered()

// Measure temperature with NTC
let ntcTemperature = JoyPiAdvanced.ntcTemperature()

// Draw 10x10 rectangle on OLED
JoyPiAdvanced.oledInit()
JoyPiAdvanced.oledDrawRectangle(0, 0, 10, 10)

// Check state of PIR sensor
let pirMotion = JoyPiAdvanced.pirCheckMotion()

// Set pwm fan to 50% speed
JoyPiAdvanced.pwmSetSpeed(50)

// Get current voltage of potentiomer
let potentiometerVoltage = JoyPiAdvanced.potentiometerVoltage()

// Read from RFID tag
JoyPiAdvanced.rfidInit()
JoyPiAdvanced.rfidReadText()

// Set RGB matrix to full red
JoyPiAdvanced.matrixShowColor(255, 0, 0)

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