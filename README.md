# MakeCode Package for the Joy-IT Joy-Pi Advanced

This library provides a Microsoft Makecode package for the Joy-IT Joy-Pi Advanced. See [here](https://joy-it.net/products/RB-JoyPi-Advanced) and [here](https://www.joy-pi.net) for more details.

## Overview

The Joy-Pi Advanced is the universal all-rounder for all Makers. It combines compatibility for Raspberry Pi, Raspberry Pi Pico, Arduino Nano, BBC micro:bit and NodeMCU ESP32 with the versatility of over 38 modules, making it the ultimate maker platform.

The Joy-Pi Advanced combines the following modules:

### Modules connected directly to the micro:bit

|           Module         |                Connection          |
|:------------------------:|:----------------------------------:|
| 1.8" TFT Display         | `P0` D/C, `P1` Reset, `P10` CS     |
| Light barrier            | `P0`                                 |
| Infrared receiver        | `P0`                                 |
| Relay                    | `P1`                                 |
| Gyroscope (CS)           | `P1`                                 |
| Switch 1                 | `P2`                                 |
| Ultrasonic sensor        | `P2` Echo, `P3` Trigger            |
| Rotary Encoder           | `P2` DT, `P3` CLK, `P4` SW         |
| Switch 2                 | `P3`                                 |
| Switch 3                 | `P4`                                 |
| Stepper motor            | `P4` S1, `P5` S2, `P6` S3, `P7` S4 |
| Switch 4                 | `P5`                                 |
| Switch 5                 | `P6`                                 |
| PIR sensor               | `P6`                                 |
| PWM fan                  | `P7`                                 |
| Buzzer                   | `P7`                                 |
| Servo motor              | `P8`                                 |
| RGB Matrix               | `P8` or via I2C (since Joy-Pi Advanced 2)  |
| DHT11 sensor             | `P8`                                 |
| DS18B20 sensor           | `P9`                                 |
| Sound sensor             | `P9` or `P5` (since Joy-Pi Advanced 2) |
| Joystick                 | `P10` Switch, `A0` and `A1` on the ADC |
| Shock sensor             | `P10`                                |
| RFID                     | `P16` CS                           |
| Vibration module         | `P16`                                |
| Analog-Digtal converter  | `P16` CS                           |

### I2C modules

|           Module         |              I2C-Address           |
|:------------------------:|:----------------------------------:|
| Color sensor             | `0x10`                               |
| 16x2 LCD display         | `0x21`                               |
| Button matrix            | `0x22`                               |
| OLED display             | `0x3C`                               |
| EEPROM                   | `0x50` or `0x51` (since Joy-Pi Advanced Revision 1.1) |
| Touch sensor             | `0x5A`                               |
| Real-time clock          | `0x68`                               |
| 7-segment display        | `0x70`                               |
| Barometer                | `0x77`                               |
| RGB Matrix               | `0x66` (since Joy-Pi Advanced 2)     |

### Modules connected to the analog-digital converter

|           Module         |                Channel             |
|:------------------------:|:----------------------------------:|
| Joystick (X-Axis)        | `A0`                                 |
| Joystick (Y-Axis)        | `A1`                                 |
| NTC                      | `A2`                                 |
| Potentiometer            | `A3`                                 |
| Hall sensor              | `A4`                                 |
| LDR                      | `A5`                                 |
| /                        | `A6`                                 |
| /                        | `A7`                                 |


## Methods of the extension

### Initialization of the Advanced
There are already multiple versions of the Joy-Pi Advanced released. Some of them had hardware changes. To ensure this repository is working with your Joy-Pi Advanced, one of the following methods has to be executed beforehand.

#### Automatic Initialization
This method sets the revision of your Joy-Pi Advanced automatically.
```blocks
JoyPiAdvanced.initializeAdvanced()
```

#### Setting revision automatically
This method sets the revision of your Joy-Pi Advanced manually. You can find your revision on the main board of the Joy-Pi Advanced.

| `JoyPiAdvancedRevision`   |   Revision of Joy-Pi Advanced |
|:------------------------:|:----------------------------------:|
| `rev1_0`        | Revision 1.0 |
| `rev1_1`        | Revision 1.1 |
| `rev2_0`        | Revision 2.0 (Joy-Pi Advanced 2) |

```blocks
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev2_0)
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev1_1)
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev1_0)
```

### 7-Segment display
A 7-segment display is able to show numbers (or also characters) by displaying individual segments. A block contains 7 segments and an additional point. 7 segment displays are often used in watches, for example.

> [!NOTE]
> The 7-segment display is connected via I2C on address `0x70`.

#### Initialization
Because the 7-segment display is an I2C-device, an initial initialization is required to use the display:
```blocks
// Initialize 7-segment display
JoyPiAdvanced.segmentInit()
```

#### Display numbers
Numbers with a length of up to 4 digits can be send to the display. You can additionally set the colon to on or off.

| `JoyPiAdvancedColon`   |   Meaning |
|:------------------------:|:----------------------------------:|
| `on`        | Activates colon |
| `off`        | Disables colon |

```blocks
// Show number with colon off
JoyPiAdvanced.segmentWriteNumber(1234, Colon.off)
// Show number with colon on
JoyPiAdvanced.segmentWriteNumber(4321, Colon.on)
```

#### Clear display
Clear the display to remove all active colons
```blocks
JoyPiAdvanced.segmentClear()
```

### Analog-Digital Converter
Since many microcontrollers, like the micro:bit, cannot process analog signals, the Joy-Pi Advanced is equipped with an analog-to-digital converter. This converts analog signals into a digital signal and can thus be conveniently read out by a microcontroller. The ADC has a total of 8 (0 - 7) channels.

> [!NOTE]
> The analog-digital converter is connected via SPI on `P16` (CS).

#### Read values
This ADC is a 12-bit ADC which means that the applied voltage can be converted to a total of 4096 (0 - 4095) values.
```blocks
// Read value on channel no. 0
JoyPiAdvanced.adcReadValue(0)
// Read value on channel no. 3
JoyPiAdvanced.adcReadValue(3)
```

#### Read voltages
Instead of values, you can also directly read the raw applied voltage or calculate the already measured digital value into voltage:
```blocks
// Read voltage on channel no. 0
JoyPiAdvanced.adcReadVoltage(0, adcValue)
// Read voltage on channel no. 3
JoyPiAdvanced.adcReadVoltage(3)
```

### Barometer
A barometer is a measuring device for determining the static air pressure. The barometer used in the Joy-Pi Advanced is additionally able to measure the temperature.

> [!NOTE]
> The barometer is connected via I2C on address `0x77`.

#### Initialization
Because the barometer is an I2C-device, an initial initialization is required before use:
```blocks
// Initialize barometer
JoyPiAdvanced.barometerInit()
```

#### Read pressure
Read the pressure measurement from the barometer in mBar.
```blocks
// Read pressure from barometer
JoyPiAdvanced.barometerGetPressure()
```

#### Read temperature
Read the temperature measurement from the barometer in Celsius.
```blocks
// Read temperature from barometer
JoyPiAdvanced.barometerGetTemperature()
```

#### Calculate altitude
You can calculate the altitude with the measured pressure of the barometer. Therefore, your local QNH should be given the method. Alternatively, you can use the mean sea level pressure, which is set as the default value.
```blocks
// Read altitude from barometer
JoyPiAdvanced.barometerGetAltitude(1013.25)
```

### Button matrix
The button matrix is a keypad consisting of a total of 16 buttons arranged in a 4 x 4 matrix.

> [!NOTE]
> The button matrix is connected via I2C on address `0x22`.

#### Initialization
Because the button matrix is an I2C-device, an initial initialization is required before use:
```blocks
// Initialize button matrix
JoyPiAdvanced.buttonmatrixInit()
```

#### Button pressed
Returns the value number when a button is pressed. If no button is pressed, `-1` is returned.
```blocks
// Return button value number
JoyPiAdvanced.buttonmatrixIsButtonPressed()
```

#### Button value
On the silk screen of the Joy-Pi Advanced, the button matrix is labeled with `0`-`9` and `#`, `x`, `/`, `+`, `-` and `=`. This function returns the corresponding button value (as a string) when a button is pressed. If no button is pressed, `-1` is returned.
```blocks
// Return button value
JoyPiAdvanced.buttonmatrixGetKey()
```

#### Button code
This method returns the location of the pressed button. Therefore, it is a code `column|row` returned.
```blocks
// Return button code
JoyPiAdvanced.buttonmatrixGetButtonCode()
```

#### Button matrix as calculator
This block uses the button matrix as a calculator. It returns the current input. If `=`is pressed, the term is calculated. If `#`is pressed, the term is cleared.
```blocks
// Use button matrix as calculator
let term = ""
term = JoyPiAdvanced.buttonmatrixCalcsulate()
```

### Buzzer
The buzzer is an acoustig signal generator, which is controlled with a frequency and thus emits a sound. The frequency determines the pitch of the tone.

> [!NOTE]
>The buzzer is connected to `P7`.

#### Turn buzzer on
You can turn the buzzer on by using the `JoyPiAdvanced.buzzerOn(frequency)` function. The `frequency` can be a value between 100 and 20000.
```blocks
// Turn buzzer on with a frequency of 2000
JoyPiAdvanced.buzzerOn(2000)
```

#### Turn buzzer off
You can turn the buzzer off by using this function.
```blocks
JoyPiAdvanced.buzzerOff()
```

### Color Sensor
The color sensor allows you to determine the composition (red, green, blue and white) of colors. The module outputs a signal which will be converted into the corresponding color values. Please note that the color sensor can **not** measure the exact composition of colors. Instead it gives you an indication to which base color the color tends.

> [!NOTE]
> The color sensor is connected via I2C on address `0x10`.

#### Initialization
Because the color sensor is an I2C-device, an initial initialization is required before use:
```blocks
// Initialize color sensor
JoyPiAdvanced.initColorSensor()
```

#### Integration time
This method set the integration time of the sensor. It determines how fast the sensor is reading its values. Possible settings are shown in the table below:

| `JoyPiAdvancedColorSensor_IntegrationTime`   |                Duration of integration time          |
|:------------------------:|:----------------------------------:|
| `ms_40`        | 40 ms  |
| `ms_80`        | 80 ms  |
| `ms_160`        | 160 ms  |
| `ms_320`        | 320 ms  |
| `ms_640`        | 640 ms  |
| `ms_1280`        | 1280 ms  |

```blocks
// set integration time
JoyPiAdvanced.colorSensorSetIntegrationTime(JoyPiAdvancedColorSensor_IntegrationTime.ms_160)
```

#### Set modes of sensor
The color sensor can be used in two different modes. These can be set up with the following blocks:

##### Auto mode
```blocks
// set color sensor to auto mode
JoyPiAdvanced.colorSensorAutoMode()
```
##### Force mode
```blocks
// set color sensor to force mode
JoyPiAdvanced.colorSensorForceMode()
```

#### Detect colors
The data from the sensor can be read from different blocks.

##### Single colors
You can detect the intensity of the base colors with the following functions.
```blocks
// Get red intensity
JoyPiAdvanced.colorSensorGetRed()
// Get green intensity
JoyPiAdvanced.colorSensorGetGreen()
// Get blue intensity
JoyPiAdvanced.colorSensorGetBlue()
// Get white intensity
JoyPiAdvanced.colorSensorGetWhite()
```

##### All colors
You can read all color values with one block. This method returns an array with the detected color values `[red, green, blue, white]`. 
```blocks
// get RGBW values
JoyPiAdvanced.colorSensorGetRGBW()
```

##### All colors & dominant color
This block adds to the previous method the dominant power. Therefore, it returns additionally the `dominant color` as a string`[dominant color, red, green, blue, white}`.
```blocks
// get dominant color and RGBW values
JoyPiAdvanced.colorSensorReadAll()
```

#### Disable sensor
This block disables the color sensor again.
```blocks
// disable color sensor
JoyPiAdvanced.disableColorSensor()
```

### DHT11 temperature & humidity sensor
The DHT11 is a combination sensor which can measure temperatures (0 - 50 degrees celsius) and humidity (20 - 90 %).

> [!NOTE]
> The DHT11 sensor is connected to `P8`.

#### Measurement values
This block triggers a measurement from the DHT11 and returns an array with temperature and humidity `[temperature, humidity]`.
```blocks
// Measure temperature & humidity and return it
JoyPiAdvanced.dht11GetMeasurement()
```

#### Start measurement
This block triggers a measurement from the DHT11. It also returns if the triggered measurement was successful or not.
```blocks
// Measure temperature & humidity
JoyPiAdvanced.dht11ReadSensor()
```

#### Successful measurement
This block returns `false` if last measurement was unsuccessful and `true` if it was successfull.
```blocks
// check if last measurement was successfull
JoyPiAdvanced.dht11WasSuccessful()
```

#### Last measured values
You can use `JoyPiAdvanced.dht11GetTemperature()` and `JoyPiAdvanced.dht11GetHumidity()` to receive the **last** corresponding measurement values.
```blocks
// Return humidity
JoyPiAdvanced.dht11GetLastHumidity()
// Return temperature
JoyPiAdvanced.dht11GetLastTemperature()
```

### DS18B20 temperature sensor
The DS18B20 is an external, waterproof temperature sensor. It is located in an encapsulated housing on an approx. 1m long cable and is thus able to measure the temperature in liquids. Please note that the DS18B20 sensor need to be connected to your Joy-Pi Advanced board before you can use it.

> [!NOTE]
> The DS18B20 sensor is connected to `P9`.

#### Measure temperature
The temperature can be measured by using the `JoyPiAdvanced.readDS18B20()` function.
```blocks
// Measure temperature
JoyPiAdvanced.readDS18B20()
```

### EEPROM module
The EEPROM memory allows data to be stored and read out again at a later time. A write protection can additionally ne activated on the board.

> [!NOTE]
> The EEPROM is connected via I2C on address `0x50`. After **revision 1.1 or newer** the EEPROM is connected via I2C on address `0x51`.

#### Write data
You can write up to 32 kB of data to the EEPROM by using the `JoyPiAdvanced.eepromWrite(data, address)` function. Both parameters, `data` and `address`, need to be a number. `data` can be between 0 and 255, so it can be saved at one adress point in the EEPROM. `address` can be between 0 and 32767 because this is the amount of register in the used EEPROM.
```blocks
// Write number 123 to address 5
JoyPiAdvanced.eepromWrite(123, 5);
```

#### Read data
Data can be read out by using the `JoyPiAdvanced.eepromRead(address)` function. `address` can be between 0 and 32767 because this is the amount of register in the used EEPROM.
```blocks
// Read data from address 5
JoyPiAdvanced.eepromRead(5)
```

### Gyroscope
With the help of a gyroscope, the angular velocity and thus the orientation of the object can be measured. The gyroscope built into the Joy-Pi Advanced is capable of measuring the orientation within the X-axis and the Y-axis, as well as the tilt. In addition, the temperature can also be measured.

> [!NOTE]
> The gyroscope is connected via SPI on `P1` (CS).

#### Initialization
Because the gyroscope is an SPI-device, an initial initialization is required before use:
```blocks
// Initialize gyroscope
JoyPiAdvanced.gryoscopeInit()
```

#### Set scale factor
This folowing method set the scale factor of the gyroscope. The following table holds all possible factors. 

| `JoyPiAdvancedGyroscopeScaleFactor`   |   Scale factor         |
|:------------------------:|:----------------------------------:|
| `scale_0`        | 0 |
| `scale_8`        | 8 |
| `scale_16`        | 16  |
| `scale_24`        | 24  |

```blocks
// set default scale factor
JoyPiAdvanced.gyroscopeSetScaleFactor(JoyPiAdvancedGyroscopeScaleFactor.scale_0)
```
#### Measure axis values
The orientation of the X-axis and Y-axis can be measured by using the `JoyPiAdvanced.gyroscopeGetX()` and `JoyPiAdvanced.gyroscopeGetY()` functions.
```blocks
// Measure orientation of X-Axis
JoyPiAdvanced.gyroscopeGetX()
// Measure orientation of Y-Axis
JoyPiAdvanced.gyroscopeGetY()
```

#### Measure tilt
The tilt of the device can be measured by using the `JoyPiAdvanced.gyroscopeGetTilt()` function. The method returns `right`, `left`, `forward`, `backward` or `No movement`.
```blocks
// Measure tilt of the device
JoyPiAdvanced.gyroscopeGetTilt()
```

#### Measure temperature
Additionally, the temperature can be measured with the help of the gyroscope by using the `JoyPiAdvanced.gyroscopeGetTemperature()` function.
```blocks
// Measure temperature
JoyPiAdvanced.gyroscopeGetTemperature()
```

### Hall sensor
Hall sensors are sensitive to magnetic fields and can therefore determine the strength of such a field. The stronger the magnetic field, the more voltage can be measured.

> [!NOTE]
> The hall sensor is an analog sensor and is connected to channel `A4` of the ADC.

#### Measure digital value
Determine the intensity of a magnetic field by measuring the digital value passing through the sensor with the `JoyPiAdvanced.hallSensorGetMagneticField()` function.
```blocks
// Measure magnetic field
JoyPiAdvanced.hallSensorGetMagneticField()
```

#### Identify magnetic field
With the following blocks, you can determine if a north or a south pole was detected. Both methods return `true` if the corresponding pole was detected. Otherwise, it will return `false`.

##### North pole
```blocks
// Measure magnetic field
let hallsensor_value = JoyPiAdvanced.hallSensorGetMagneticField()
// check if hall sensor detected north pole
if (JoyPiAdvanced.hallSensorIsNorthPole(hallsensor_value)) {
    // do something here
}
```
##### South pole
```blocks
// Measure voltage
let hallsensor_value = JoyPiAdvanced.hallSensorGetMagneticField()
// check if hall sensor detected south pole
if (JoyPiAdvanced.hallSensorIsSouthPole(hallsensor_value)) {
    // do something here
}
```

### Infrared receiver
The infrared receiver can receive infrared signals and output them as a digital signal sequence. Please note that not all remote controls can be detected, as remote controls from different manufacturers also use different communication protocols. We therefore recommend to use only the remote control included in the Joy-Pi Advanced.

> [!NOTE]
> The infrared receiver is connected to `P0`.

#### Initialize infrared receiver
The infrared receiver needs to be initialized before use because it is listening for input in the background. You can initialize the ir receiver with `JoyPiAdvanced.initIrReceiver()`
```blocks
// Initialize IR receiver
JoyPiAdvanced.initIrReceiver()
```

#### Get pressed button code
Each button is assigned a unique number for identification. With `JoyPiAdvanced.irGetValue()` the corresponding identification number can be read out. If no button was pressed, 0 is returned instead.
```blocks
// Read out pressed button code
JoyPiAdvanced.irGetValue()
```

#### Get pressed button value of remote control
With the unique number of each button on the remote control, which is included in the Joy-Pi Advanced, this method returns the printed name on each button. If the code is not assigned, the method returns `Unkown: ` together with the unknown number.
```blocks
// Read out pressed button code
let ir_code = JoyPiAdvanced.irGetValue()
// Return value of remote control
JoyPiAdvanced.irReadValue(ir_code)
```

### Joystick
The joystick outputs its position on the X an d Y axes and can thus be clearly localized in its current position. It is additionally equipped with a button.

> [!NOTE]
> The joystick is connected to the ADC channel `A0` (X-Axis) and `A1` (Y-Axis) as well as to `P10` (button).

#### Axis positions
You can locate the position of the Joystick by using `JoyPiAdvanced.joystickGetXValue()` and `JoyPiAdvanced.joystickGetYValue()`. Because the joystick is connected to the build-in 12-bit ADC of the Joy-Pi Advanced, the axis values are between 0 and 4095.
```blocks
// Get X-Axis
JoyPiAdvanced.joystickGetXValue()
// Get Y-Axis
JoyPiAdvanced.joystickGetYValue()
```

#### Button input
The press of the button can be checked with the `JoyPiAdvanced.joystickCheckButton()` function. The function returns `true` or `false`.
```blocks
// Check if button was pressed
JoyPiAdvanced.joystickCheckButton()
```

### 16x2 LCD Display
The 16x2 display can output texts on a total of 16 characters and over 2 lines. It is ideally suited for the quick output of status information or measurement results.

> [!NOTE]
> The 16x2 lcd display is connected via I2C on address `0x21`.

#### Initialization
Because the display is an I2C-device, an initial initialization is required before use:
```blocks
// initialize LCD
JoyPiAdvanced.lcd16x2Init()
```

#### Power functions
The display supports various power functions. 

##### Power on/off
You can turn the display on or off with these methods.
```blocks
// Turn LCD on
JoyPiAdvanced.lcd16x2TurnOn()
// Turn LCD off
JoyPiAdvanced.lcd16x2TurnOff()
```

##### Backlight power on/off
You can turn the backlight of the display on or off with these methods.
```blocks
// Turn backlight on
JoyPiAdvanced.lcd16x2BacklightOn()
// Turn backlight off
JoyPiAdvanced.lcd16x2BacklightOff()
```

#### Clear display
The display can be cleared with the following method. All shown data will be removed by this method.
```blocks
// Clear display
JoyPiAdvanced.lcd16x2Clear()
```

#### Output text
Text can be send to the display by using the `JoyPiAdvanced.LCD16x2_showText(text, x, y)` function. The string to be displayed is passed with the parameter`text` and the position on the display is passed with `x`-coordinate and `y`-coordinate.
```blocks
// Show text at position 0 on line 0
JoyPiAdvanced.lcd16x2ShowText('Hello World', 0, 0)
// Show text at position 2 on line 1
JoyPiAdvanced.lcd16x2ShowText('Hello World', 2, 1)
```

#### Shift text
The whole output can be shifted to the left and right and can thus be moved over the display.
```blocks
// Shift text to the left
JoyPiAdvanced.lcd16x2ShiftLeft()
// Shift text to the right
JoyPiAdvanced.lcd16x2ShiftRight()
```

#### Cursor functions
The display also offers the possibility to switch on the current cursor position. You can choose between a permanent and a blinking cursor. Of course, the cursor can also be switched off and moved back to the start position.
```blocks
// Show permanent cursor
JoyPiAdvanced.lcd16x2ShowCursor()
// Show blinking cursor
JoyPiAdvanced.lcd16x2BlinkingCursor()
// Move cursor to starting position
JoyPiAdvanced.lcd16x2ReturnHome()
// Hide cursor
JoyPiAdvanced.lcd16x2HideCursor()
```

### Light dependent resistor (LDR)
A light dependent resistor is a light sensitive module. The more light that hits the sensor, the lower its resistance value and the higher the measurable voltage that flows through it. The LDR can therefore be used to measure the light intensity.

> [!NOTE]
> The LDR is connected to the ADC channel `A5`.

#### Measure light intensity
The light intensity can measured by using `JoyPiAdvanced.ldrGetRawVoltage()`. The intensity is returned as voltage.
```blocks
// Measure light intensity
JoyPiAdvanced.ldrGetRawVoltage()
```

#### Calculate lux
With the measured light intensity, the light intensity can be calculated in lux. Therefore this method receives as a parameter `U2` the voltage from the LDR and returns the calculated lux.
```blocks
// Measure light intensity
let ldr_voltage = JoyPiAdvanced.ldrGetRawVoltage()
// calculate lux
JoyPiAdvanced.ldrGetLux(ldr_voltage)
```

### Light barrier
The light barrier detects when it has been interrupted by something. In combination with the attachment and motor included in the Joy-Pi Advanced, it is possible, for example, to drive the perforated disc and measure the motor speed.

> [!NOTE]
> The light barrier is connected to `P0`.

#### Initialization
An initialization is required for the light barrier before it can be used.
```blocks
// initialize light barrier
JoyPiAdvanced.lightBarrierInitiliaze()
```

#### Check for interruption
Check if something is interrupting the light barrier by using `JoyPiAdvanced.lightBarrierIsTriggered()`. The function returns `true` or `false`.
```blocks
// Check if light barrier is interrupted
if (JoyPiAdvanced.lightBarrierIsTriggered()) {
    // do something
}
```

#### Calculate RPM
If the light barrier is interrupted several times in succession by the perforated disc supplied, the corresponding revolutions per minute can be calculated from this.
```blocks
// Calculate RPM
JoyPiAdvanced.lightBarrierRPM()
```

#### RPM Interval
Check if RPM is calulated. If it is newly calculated, return `true` otherwise `false`. This method can be used to visually show new calculations.
```blocks
// Check if a RPM calulation is finished
if (JoyPiAdvanced.lightBarrierRPMInterval()) {
    // do something
}
```

### NTC
A negative temperature coefficient thermistor (NTC) is a temperature-dependent resistor. It conducts electrical current better at high temperatures than at low temperatures. The current temperature can thus be derived from the individual characteristic curve of the resistor and the measured current.

> [!NOTE]
> The NTC is connected to the ADC channel `A2`.

#### Measure temperature
The temperature can be measured by using `JoyPiAdvanced.ntcGetRawVoltage(). This method returns the raw voltage value of the NTC.
```blocks
// Measure temperature
JoyPiAdvanced.ntcGetRawVoltage()
```

#### Calculate temperature
This method can calculate the temperature in Celsius. As a parameter `raw_value` it receives the raw voltage value from the NTC.
```blocks
// Measure temperature
let ntc_voltage = JoyPiAdvanced.ntcGetRawVoltage()
// Calculate temperature in Celsius
JoyPiAdvanced.ntcGetTemperature(ntc_voltage)
```

### OLED Display
An OLED dipslay consists of organic light-emitting diodes and is technically fundamentally different from the 16x2 LCD display. A big advantage is that graphic elements (such as circles and rectangles) can be displayed on the OLED.

> [!NOTE]
> The OLED display is connected via I2C on address `0x3C`.

#### Initialization
Because the display is an I2C-device, an initial initialization is required before use:
```blocks
// Initialize OLED display
JoyPiAdvanced.oledInit()
```

#### Display text 
The display can show text with the following method.
```blocks
// Show text
JoyPiAdvanced.oledShowString("Hello World")
```
#### Graphical elements
The display can show graphical elements. Therefore different method are implemented to display different figures.

##### Line
A line can be drawn to the display via the following method. `x0` and `y0` are the coordinates of the start of the line. `x1` and `y1` are the coordinates of the end of the line.
```blocks
// Draw line from x-y coordinates 10-15 to x-y coordinates 60-60
JoyPiAdvanced.oledDrawLine(10, 15, 60, 60)
```

##### Rectangle
You can draw a rectangle on the OLED with the following method. `x` and `y` are the coordinates of the bottom left corner of the rectangle. `width` and `height` define the width and height of the rectangle.
```blocks
// Draw rectangle starting at x-y coordinate 10-15 with a width of 20 and a height of 30
JoyPiAdvanced.oledDrawRectangle(10, 15, 20, 30)
```

##### Circle
You can draw a circle on the OLED with the follwing method. `x` and `y` are the coordinates of the center of the cirlce. `radius` defines the radius of the circle.
```blocks
// Draw circle at x-y coordinate 50-50 with a radius of 20
JoyPiAdvanced.oledDrawCircle(50, 50, 20)
```

#### Clear display
All contents on the display can be erased by using the `JoyPiAdvanced.oledClear()` function.
```blocks
// CLear output from display
JoyPiAdvanced.oledClear()
```

### PIR sensor
A PIR sensor is an infrared-based motion sensor. Temperature changes in its proximity lead to measurable change in electrical voltage and thus allow conclusions to be drawn about movements in its vicinity.

> [!NOTE]
> The PIR sensor is connected to `P6`.

#### Initialization
The PIR sensor has to be initialiazed because it uses pin events in the background. Therefore you can define special handler in each case which are executed if that event is triggered.
```blocks
// initialize PIR
JoyPiAdvanced.initializePIR()
```

##### Deinitialization
This method removes the pin events again. You can not use the PIR afterwards again if you do not initialize again.
```blocks
// deinitialize PIR
JoyPiAdvanced.deinitializePIR()
```

#### Detect motion
The function `JoyPiAdvanced.pirCheckMotion()` allows you to detect motion. The function returns `true` or `false`.
```blocks
// Detect motion
if (JoyPiAdvanced.pirCheckMotion()) {
    // do something
}
```
#### Handler to be executed in an event
This method enables handlers to be executed in case an event is triggered. This enables you to define your own programm which can be executed.

| `JoyPiAdvancedMovement`   |   Which event        |
|:------------------------:|:----------------------------------:|
| `movement`        | Movement was recognized |
| `no_movement`        | Sensor is ready to monitor again |

```blocks
JoyPiAdvanced.pirMovementRecognized(JoyPiAdvancedMovement.no_movement, function () {
    // do something
})
JoyPiAdvanced.pirMovementRecognized(JoyPiAdvancedMovement.movement, function () {
    // do something
})
```

### PWM fan
The fan on the Joy-Pi Advanced is supposed to cool an installed Raspberry Pi. When set to PWM mode, it is possible to control the speed of the fan by applying a PWM signal to the fan.

> [!NOTE]
> The PWM fan is connected to `P7`.

#### Initialization
You can initialize the fan with the following method.
```blocks
// initialize PIR
JoyPiAdvanced.initializePWMFan()
```

#### Control speed
You can control the speed of the fan from 0 to 100.
```blocks
// Set PWM fan to maximum speed
JoyPiAdvanced.pwmSetSpeed(100)
// Set PWM fan to medium speed
JoyPiAdvanced.pwmSetSpeed(50)
// Stop PWM fan
JoyPiAdvanced.pwmSetSpeed(0)
```

### Potentiometer
A potentiometer is a component whose resistance can be changed mechanically. By moving it from left to right, its resistance can be increased continuously.

> [!NOTE]
> The potentiometer is connected to the ADC on channel `A3`.

#### Read potentiometer
The digital value currently applied to the potentiometer can be measured directly.
```blocks
JoyPiAdvanced.potentiometerGetValue()
```

### RFID module
RFID is a technology in which a transmitter communicates with a receiver without contact. The transponder usually consists of an object that can be held in front of the sensor.

> [!NOTE]
> The RFID module is connected via SPI on `P16` (CS).

#### Initialization
The RFID module needs to be initialized before use.
```blocks
JoyPiAdvanced.rfidInit()
```

#### Read from RFID tag
You can either read the **ID** of an RFID tag, for unique tag identification, or the **content stored** in an RFID tag.
```blocks
// Read ID of RFID tag
JoyPiAdvanced.rfidReadId()
// Read content of RFID tag
JoyPiAdvanced.rfidReadText()
```

#### Write to RFID tag
You can also overwrite the content stored in a tag.
```blocks
// Write content to RFID tag
JoyPiAdvanced.rfidWriteText('Hello World')
```

### RGB matrix
An RGB matrix is a grid of LEDs divided into vertical columns and horizontal rows. Each LED can be controlled individually and can be set in the RGB color space.

> [!NOTE]
> The RGB matrix is connected to `P8`. After **Joy-Pi Advanced 2 or newer** the RGB matrix is connected via I2C on address `0x66`.

#### Initialization
To determine how the RGB matrix is connected to the micro:bit, you have to initialize the matrix. In this method it is set how all the following methods try to communicate with the matrix.
```blocks
// initialize RGB matrix
JoyPiAdvanced.initializeRGBMatrix()
```

#### Set Brightness
You can set the brightness of the RGB matrix with this method. The parameter `brightness` can be set from 0 to 255.
```blocks
// initialize RGB matrix
JoyPiAdvanced.rgbMatrixSetBrightness(125)
```

#### Clear matrix
The output of the matrix can be erased with `JoyPiAdvanced.matrixClear()`.
```blocks
// Clear matrix
JoyPiAdvanced.rgbMatrixClear()
```

#### Control matrix
You can control the complete matrix as well as single pixels of the matrix. You are also able to set the brightness of the matrix.

##### Fill whole matrix
With the following method you can set the whole RGB matrix to one color. Therefore, the method needs the parameter `(red, green, blue)` to be able to display different colors. `(red, green, blue)` are RGB values and have a minimum of 0 and a maximum of 255 each.
```blocks
// Set complete matrix to red
JoyPiAdvanced.rgbMatrixShowColor(255, 0, 0)
// Set complete matrix to green
JoyPiAdvanced.rgbMatrixShowColor(0, 255, 0)
// Set complete matrix to blue
JoyPiAdvanced.rgbMatrixShowColor(0, 0, 255)
// Set complete matrix to white
JoyPiAdvanced.rgbMatrixShowColor(255, 255, 255)
```

##### Set single pixel
With the following method you can set one pixel of the RGB matrix to a specific color. The parameter `x` and `y` define the coordinates of the pixel of the matrix which should be set to the color according to the parameter `(red, green, blue)`. `(red, green, blue)` are RGB values and have a minimum of 0 and a maximum of 255 each.
```blocks
// Set single pixel at (x,y) position (5,5) to red
JoyPiAdvanced.rgbMatrixSetPixel(5, 5, 255, 0, 0)
```

#### Rainbow animation
The rainbow mode automatically cycles the RGB matrix through all colors.
```blocks
// Activate rainbow mode
JoyPiAdvanced.rgbMatrixRainbow()
```

### Real time clock
An RTC does not measure the relative runtime of a microcontroller, but the actual time. So that the RTC does not have to be set again each time the device is switched off, it is additionally equipped with a button cell and can thus retain its settings.

> [!NOTE]
> The RTC is connected via I2C on address `0x68`.

#### Set time
The RTC can be set completely with a single function, as well as individually with a function for each parameter.
```blocks
// Set RTC to year 2023, month 2, day 1, weekday 3, hour 13, minute 37 and second 2
JoyPiAdvanced.rtcSetDateTime(2023, 2, 1, 3, 13, 37, 2)
// Set year to 2023
JoyPiAdvanced.rtcSetYear(2023)
// Set month to 2
JoyPiAdvanced.rtcSetMonth(2)
// Set day to 1
JoyPiAdvanced.rtcSetDay(1)
// Set weekday to 3
JoyPiAdvanced.rtcSetWeekday(3)
// Set hour to 13
JoyPiAdvanced.rtcSetHour(13)
// Set minute to 37
JoyPiAdvanced.rtcSetMinute(37)
// Set second to 2
JoyPiAdvanced.rtcSetSecond(2)
```

#### Get time
Of course each parameter can also be read out again.
```blocks
// Read year
JoyPiAdvanced.rtcGetYear()
// Read month
JoyPiAdvanced.rtcGetMonth()
// Read day
JoyPiAdvanced.rtcGetDay()
// Read weekday
JoyPiAdvanced.rtcGetWeekday()
// Read hour
JoyPiAdvanced.rtcGetHour()
// Read minute
JoyPiAdvanced.rtcGetMinute()
// Read second
JoyPiAdvanced.rtcGetSecond()
```

### Relay
A relay is a remotely controllable switch operated by current. Other circuits can be switched via a circuit that is activated. The line to be switched is connected to the **COM** interface. If the relay is switched off, the current is continued via the **NC** (normally closed) interface. The **NO** (normally open) interface remains currentless, if the relay is switched off, the two interfaces change. The current is now carried on via **NO** and **NC** is deenergized.

> [!NOTE]
> The relay is connected to `P1`.

#### Control the relay
The relay is fairly simple. It can be turned on (**NO** is closed and **NC** is open) and off (**NC** is closed and **NO** is open).
```blocks
// Turn relay on
JoyPiAdvanced.relayOn()
// Turn relay off
JoyPiAdvanced.relayOff()
```

### Rotary encoder
The rotary encoder is a switch that can be turned clockwise or counterclockwise. When the roary encoder is moved, the direction of movement and the current position of the switch are encoded. Per steop the states of the outputs change. The direction of rotation can be determined by checking which of the two states changed first. In addition, the rotary encoder can be pressed to switch another signal.

> [!NOTE]
> The rotary encoder is connected to `P2` (DT), `P3` (CLK) and `P4` (SW).

#### Initialization
The rotrary encoder has to be initialiazed because it uses pin events in the background. Therefore you can define special handler in each case which are executed if that event is triggered.
```blocks
// initialize encoder
JoyPiAdvanced.initializeRotaryEncoder()
```

##### Deinitialization
This method removes the pin events again. You can not use the encoder afterwards again if you do not initialize again.
```blocks
// deinitialize encoder
JoyPiAdvanced.deinitializeRotaryEncoder()
```

#### Handler to be executed in an event
These methods enable handlers to be executed in case an event is triggered. This enables you to define your own programm which can be executed.

##### Rotation
The encoder recognize the difference of rotation and therefore these are defined as different events. In the following table, you can see the defined events.

| `JoyPiAdvancedDirection`   |   Which event        |
|:------------------------:|:----------------------------------:|
| `clockwise`        | Clockwise rotation was recognized |
| `counterclockwise`        | Counterclockwise rotation was recognized |

```blocks
JoyPiAdvanced.rotaryEncoderWhenTurned(JoyPiAdvancedDirection.clockwise, function () {
    // do something
})
JoyPiAdvanced.rotaryEncoderWhenTurned(JoyPiAdvancedDirection.counterclockwise, function () {
    // do something
})
```

##### Pressed
The encoder can also be pressed like a button. Therefore it is possible to set also an event with the following method.
```blocks
JoyPiAdvanced.rotaryEncoderWhenPressed(function () {
    // do something
})
```

### Servo motor
Servo motors are small motors that are adjustable in their direction of rotation and speed. Please note that the servo motor is an external device that needs to be connected to your Joy-Pi Advanced. 

> [!NOTE]
> The servo motor is connected to `P8`.

#### Control servo motor
The speed of the servo motor is not adjustable via the function. Instead, the speed can be influenced via pauses within the code. The servo motor can be driven to a degreen angle between 0 and 180.
```blocks
// Rotate servo motor to degree angle 90
JoyPiAdvanced.turnMotor(90)
// Rotate servo motor cto degree angle
JoyPiAdvanced.turnMotor(120)
```

### Shock sensor
A shock sensor can detect shakes and vibrations. As soon as the signal exceeds a certain threshold, this is automatically output at the signal output of the sensor.

> [!NOTE]
> The shock sensor is connected to `P10`.

#### Initialization
The shock sensor has to be initialiazed because it uses pin events in the background. Therefore you can define special handler which is executed if that event is triggered.
```blocks
// initialize shock sensor
JoyPiAdvanced.initializeShockSensor()
```

##### Deinitialization
This method removes the pin events again. You can not use the shock sensor afterwards again if you do not initialize again.
```blocks
// deinitialize shock sensor
JoyPiAdvanced.deinitializeShockSensor()
```

#### Detect shock or vibrations
The function `JoyPiAdvanced.shockSensorGetState()` allows you to detect shocks and vibrations. The function returns `true` or `false`.
```blocks
// Check for shocks
if (JoyPiAdvanced.shockSensorGetState()) {
    // do something
}
```
#### Handler to be executed in an event
This method enables handlers to be executed in case a shock or vibration was recognized. This enables you to define your own programm which can be executed.
```blocks
JoyPiAdvanced.shockSensorWhenShock(function () {
    // do something
})
```

### Sound sensor
The sound sensor detects noise. As soon as the noise level exceeds a defined threshold, this is automatically output at the signal output of the sensor.

> [!NOTE]
> The sound sensor is connected to `P9`. After **Joy-Pi Advanced 2** or newer the sound sensor is connected to `P5`.

#### Initialization
The sound sensor has to be initialiazed because it uses pin events in the background. Therefore you can define special handler which is executed if that event is triggered.
```blocks
// initialize sound sensor
JoyPiAdvanced.initializeSoundSensor()
```

##### Deinitialization
This method removes the pin events again. You can not use the sound sensor afterwards again if you do not initialize again.
```blocks
// deinitialize sound sensor
JoyPiAdvanced.deinitializeSoundSensor()
```

#### Detect sound
The function `JoyPiAdvanced.soundSensorGetState()` allows you to detect sound. The function returns `true` or `false`.
```blocks
// Check for shocks
if (JoyPiAdvanced.soundSensorGetState()) {
    // do something
}
```

#### Handler to be executed in an event
This method enables handlers to be executed in case sound was recognized. This enables you to define your own programm which can be executed.
```blocks
JoyPiAdvanced.soundSensorWhenSound(function () {
    // do something
})
```

### Stepper motor
The stepper motor is a type of electric motor that moves in precise, fixed increments called steps, allowing for accurate position control. It is commonly used in robotics, 3D printers, and CNC machines for precise motion.

> [!NOTE]
> The stepper motor is connected to `P4` (S1), `P5` (S2), `P6` (S3) and `P7` (S4).

#### Rotate stepper motor
The stepper motor can be used with the `JoyPiAdvanced.stepperRotate(direction, steps, unit)` function. You can choose if you want to rotate by a number of steps or a number of full rotation.`direction` defines via `JoypiAdvancedStepperDirection` the rotation of the stepper motor. In the following table the states of `JoypiAdvancedStepperDirection` are defined. `unit` defines via `JoyPiAdvancedStepunit` the unit in which the paramter `steps` is interpreted.

| `JoyPiAdvancedStepunit`   |   Unit motor is supposed to turn     |
|:------------------------:|:----------------------------------:|
| `steps`        | `steps` is counted as steps |
| `rotations`        | `steps` is counted as rotations |

| `JoypiAdvancedStepperDirection`   |   Direction of rotation   |
|:------------------------:|:----------------------------------:|
| `clockwise`        | Clockwise rotation|
| `counterclockwise`        | Counterclockwise rotation |

```blocks
// Rotate clockwise by 10 steps
JoyPiAdvanced.stepperRotate(Stepperdirection.clockwise, 10, Stepunit.steps)
// Rotate counterclockwise by 2 rotations
JoyPiAdvanced.stepperRotate(Stepperdirection.counterclockwise, 2, Stepunit.rotations)
```

### Switches
A switch is a component with which an electrical connection can be closed and opened. The Joy-Pi Advanced has a total of 5 switches.

> [!NOTE]
> The switches are connected to `P2`, `P3`, `P4`, `P5` and `P6`.

#### Check switch setting
The condition of the switches can be checked with the `JoyPiAdvanced.switchCheck(JoyPiSwitch)` function. The function returns `true` or `false`. In the following table is defined how to select each switch.
```blocks
// Check switch 1
JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch1)
// Check switch 2
JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch2)
// Check switch 3
JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch3)
// Check switch 4
JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch4)
// Check switch 5
JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch5)
```

| `JoyPiAdvancedSWSeelection`   |   Possible switches    |
|:------------------------:|:----------------------------------:|
| `switch1`        | Switch A3 |
| `switch2`        | Switch A4 |
| `switch3`        | Switch A5 |
| `switch4`        | Switch A6 |
| `switch5`        | Switch A7 |


### TFT display
The TFT display is the all-rounder among the displays. It has a sufficient size for displaying content and can also display graphic elements in addition to text.

> [!NOTE]
> The TFT display is connected via SPI on `P10` (CS), `P0` (D/C) and `P1` (Reset).

#### Initialize
The display needs to be initialized before use.
```blocks
// Initialize display
JoyPiAdvanced.tftInit()
```
#### Power function
The following functions enable to turn the display on or off. The display needs to be turned on if you want to draw graphical elements onto the display. 
```blocks
// turn TFT on
JoyPiAdvanced.tftOn()
// turn TFT off
JoyPiAdvanced.tftOff()
```

#### Clear display
You can clear the display with the following method.
```blocks
// clear TFT
JoyPiAdvanced.tftClear()
```

#### Predefined Colors
There are predefined colors to use on the TFT display. In the following table, you can find the defined color with color code from the TFT and the RGB value.

| `JoyPiAdvancedTFTColor`   |   TFT color code  | RGB value  |
|:-------------:|:---------:|:---------:|
| `black`       | 0x0000 | 0x000000  |
| `navy`        | 0x8000 | 0x000084  |
| `darkgreen`   | 0x0A00 | 0x004108  |
| `darkcyan`    | 0xA530 | 0x80A5A6  | 
| `maroon`      | 0x3270 | 0x844D31  |
| `purple`      | 0x906F | 0x7B0C94  |
| `olive`       | 0x030F | 0x7B6100  |
| `lightgrey`   | 0xDEB7 | 0xBCD5DB  |
| `darkgrey`    | 0x4249 | 0x4D4946  |
| `blue`        | 0xF800 | 0x0000FF  |
| `green`       | 0x07E0 | 0x00FF00  |
| `cyan`        | 0xFF0F | 0x7BE3FF  |
| `red`         | 0x00FF | 0xFF1C00  |
| `magenta`     | 0x80FF | 0xFF1C84  |
| `yellow`      | 0x0FFF | 0xFFFF08  |
| `white`       | 0xFFFF | 0xFFFFFF  |
| `orange`      | 0x02FF | 0xFF5D00  |
| `greenyellow` | 0x0F0F | 0x7BE308  |
| `pink`        | 0xF0FF | 0xFF1CF7  |
| `gold`        | 0x06BF | 0xFFD700  |
| `brown`       | 0x09EB | 0x5A3C08  |

#### Text
You can write also text onto the TFT with the following method. The parameters `x` and `y` define the coordinates where the text should begin. The text which should be written onto the display is handed to parameter `text`. With parameter `zoom` you can increase the size of the font. The color is set by the paramter `color` which can be set by the [predefined colors](#predefined-colors).
```blocks
// Show text at x-y position 20-30 with zoom level 1, font color red and background color black
JoyPiAdvanced.tftShowString('Hello World', 20, 30, 1, color.red, Color.black)
```

#### Fill Display with one color
You can fill the display with following method to one color. The color is set by the paramter `color` which can be set by the [predefined colors](#predefined-colors).
```blocks
// fill TFT display with color dark grey
JoyPiAdvanced.tftFill(JoyPiAdvancedTFTColor.darkgrey)
```

#### Graphical elements

##### Pixel
You can set the color of a single pixel with the following method. The parameter `x`and `y`are the coordinates of the pixel and `color` sets a [predefined color](#predefined-colors). 
```blocks
// Draw single pixel at (x,y) position (10, 20) with color blue
JoyPiAdvanced.tftDrawPixel(10, 20, JoyPiAdvancedTFTColor.blue)
```

##### Line
You can draw a colored line onto the display. The parameter `x0` and `y0`define the start coordinates of the line and `x1`and `y1` the end coordinates. The line is drawn between these coordinates. The color is set by the paramter `color` which can be set by the [predefined colors](#predefined-colors).
```blocks
// Draw line from (x0, y0) position (10, 10) to (x1, y1) position (100, 80) with color yellow
JoyPiAdvanced.tftDrawLine(10, 10, 100, 80, JoyPiAdvancedTFTColor.yellow)
```

##### Rectangle
You can draw a rectangle filled or just as an outline onto the display. The parameters `x` and `y` define the bottom left corner of the rectangle. The width and height of the rectangle are defined by the parameters `width` and `height`. The color is set by the paramter `color` which can be set by the [predefined colors](#predefined-colors).

###### Outline
```blocks
// Draw the outline of a rectangle at (x, y) position (10, 10) with a width of 50 and a height of 20 in color green
JoyPiAdvanced.tftDrawRectangle(10, 10, 50, 20, JoyPiAdvancedTFTColor.green)
```
###### Filled
```blocks
// Draw a filled rectangle at (x, y) position (10, 10) with a width of 50 and a height of 20 in color green
JoyPiAdvanced.tftFillRectangle(10, 10, 50, 20, JoyPiAdvancedTFTColor.green)
```

##### Circle
You can draw a circle filled or just as an outline onto the display. The parameters `x` and `y` define the center of the circle. With the parameter `radius` you can define the radius of the circle. The color is set by the paramter `color` which can be set by the [predefined colors](#predefined-colors).

###### Outline
```blocks
// Draw the outline of a circle at (x, y) position (50, 50) with a radius of 20 in color blue
JoyPiAdvanced.tftDrawCircle(50, 50, 20, JoyPiAdvancedTFTColor.blue)
```
###### Filled
```blocks
// Draw a filled circle at (x, y) position (50, 50) with a radius of 20 in color blue
JoyPiAdvanced.tftFillCircle(50, 50, 20, JoyPiAdvancedTFTColor.blue)
```
##### Filled Triangle
You can draw a filled triangle with the following method onto the display. The parameter `x0` and `y0` define the coordinates of the left corner of the triangle, `x1` and `y1` define the coordinates of the corner in the middle of the triangle and `x2` and `y2` define the coordinates of the right corner of the triangle. The color is set by the paramter `color` which can be set by the [predefined colors](#predefined-colors).
```blocks
// Draw a filled triangle at (x0, y0) position (64, 40), (x1, y1) position (30, 110) and (x2, y2) position (98, 110) in color orange
JoyPiAdvanced.tftFillTriangle(64, 40, 30, 110, 98, 110, JoyPiAdvancedTFTColor.orange)
```

#### Constants of display
With the following methods, you can get the width or height of the TFT in case these are needed for the graphical elements.
```blocks
// width of the TFT
JoyPiAdvanced.tftGetWidth()
// height of the TFT
JoyPiAdvanced.tftGetHeight()
```

### Touch sensor
With the touch sensor, the contact is closed by touch. The contacts can either be touched directly or attached to any object using the supplied clamps. A total of 6 touch sensors are available.

> [!NOTE]
> The touch sensor is connected via I2C on address `0x5A`.

#### Initialize
Because the touch sensor is an I2C-device, an initial initialization is required before use:
```blocks
// Initialize touch sensor
JoyPiAdvanced.touchsensorInit()
```

#### Detect touch
The status of each contact can be queried directly. The function returns either `true` or `false`.
```blocks
// Detect touch on channel 1
JoyPiAdvanced.touchsensorCheck(1)
// Detect touch on channel 2
JoyPiAdvanced.touchsensorCheck(2)
// Detect touch on channel 3
JoyPiAdvanced.touchsensorCheck(3)
// Detect touch on channel 4
JoyPiAdvanced.touchsensorCheck(4)
// Detect touch on channel 5
JoyPiAdvanced.touchsensorCheck(5)
// Detect touch on channel 6
JoyPiAdvanced.touchsensorCheck(6)
```

### Ultrasonic sensor
The ultrasonic sensor is a sensor that can determine distances using ultrasound.

> [!NOTE]
> The ultrasonic sensor is connected to `P2` (Echo) and `P3` (Trigger).

#### Measure distances
A measurement can be initiated directly via the `JoyPiAdvanced.measureDistance()` function. The measurement result is returned in cm.
```blocks
// Measure distance
JoyPiAdvanced.measureDistance()
```

### Vibration motor
The vibration motor is a device that oscillates at a high frequency to produce noticable vibrations.

> [!NOTE]
> The vibration motor is connected to `P16`.**

#### Control motor
The vibration motor can be turned on or off.
```blocks
// Turn vibration motor on
JoyPiAdvanced.vibrationOn()
// Turn vibration motor off
JoyPiAdvanced.vibrationOff()
```

## Supported targets 
* for PXT/microbit 
```package
pxt-rb-joypi-advanced=github:joy-it/pxt-RB-JoyPi-Advanced
```
## License 
MIT