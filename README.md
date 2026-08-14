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

```typescript
JoyPiAdvanced.initializeAdvanced()
```

#### Setting revision automatically
This method sets the revision of your Joy-Pi Advanced manually. You can find your revision on the main board of the Joy-Pi Advanced.

| `JoyPiAdvancedRevision`   |   Revision of Joy-Pi Advanced |
|:------------------------:|:----------------------------------:|
| `rev1_0`        | Revision 1.0 |
| `rev1_1`        | Revision 1.1 |
| `rev2_0`        | Revision 2.0 (Joy-Pi Advanced 2) |

```typescript
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev2_0)
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev1_1)
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev1_0)
```

### 7-Segment display

A 7-segment display is able to show numbers (or also characters) by displaying individual segments. A block contains 7 segments and an additional point. 7 segment displays are often used in watches, for example.

> [!NOTE]
> The 7-segment display is connected via I2C on address 0x70.

#### Initialization

Because the 7-segment display is an I2C-device, an initial initialization is required to use the display:

```typescript
// Initialize 7-segment display
JoyPiAdvanced.segmentInit()
```

#### Display numbers

Numbers with a length of up to 4 digits can be send to the display. You can additionally set the colon to on or off.

| `JoyPiAdvancedColon`   |   Meaning |
|:------------------------:|:----------------------------------:|
| `on`        | Activates colon |
| `off`        | Disables colon |

```typescript
// Show number with colon off
JoyPiAdvanced.segmentWriteNumber(1234, Colon.off)
// Show number with colon on
JoyPiAdvanced.segmentWriteNumber(4321, Colon.on)
```

#### Clear display

Clear the display to remove all active colons

```typescript
JoyPiAdvanced.segmentClear()
```

### Analog-Digital Converter

Since many microcontrollers, like the micro:bit, cannot process analog signals, the Joy-Pi Advanced is equipped with an analog-to-digital converter. This converts analog signals into a digital signal and can thus be conveniently read out by a microcontroller. The ADC has a total of 8 (0 - 7) channels.

> [!NOTE]
> The analog-digital converter is connected via SPI on P16 (CS).

#### Read values

This ADC is a 12-bit ADC which means that the applied voltage can be converted to a total of 4096 (0 - 4095) values.

```typescript
// Read value on channel no. 0
JoyPiAdvanced.adcReadValue(0)
// Read value on channel no. 3
JoyPiAdvanced.adcReadValue(3)
```

#### Read voltages

Instead of values, you can also directly read the raw applied voltage or calculate the already measured digital value into voltage:

```typescript
// Read voltage on channel no. 0
JoyPiAdvanced.adcReadVoltage(0, adcValue)
// Read voltage on channel no. 3
JoyPiAdvanced.adcReadVoltage(3)
```

### Barometer

A barometer is a measuring device for determining the static air pressure. The barometer used in the Joy-Pi Advanced is additionally able to measure the temperature.

> [!NOTE]
> The barometer is connected via I2C on address 0x77.

#### Initialization

Because the barometer is an I2C-device, an initial initialization is required before use:

```typescript
// Initialize barometer
JoyPiAdvanced.barometerInit()
```

#### Read pressure

Read the pressure measurement from the barometer in mBar.

```typescript
// Read pressure from barometer
JoyPiAdvanced.barometerGetPressure()
```

#### Read temperature

Read the temperature measurement from the barometer in Celsius.

```typescript
// Read temperature from barometer
JoyPiAdvanced.barometerGetTemperature()
```

#### Calculate altitude

You can calculate the altitude with the measured pressure of the barometer. Therefore, your local QNH should be given the method. Alternatively, you can use the mean sea level pressure, which is set as the default value.

```typescript
// Read altitude from barometer
JoyPiAdvanced.barometerGetAltitude(1013.25)
```

### Button matrix

The button matrix is a keypad consisting of a total of 16 buttons arranged in a 4 x 4 matrix.

> [!NOTE]
> The button matrix is connected via I2C on address 0x22.

#### Initialization

Because the button matrix is an I2C-device, an initial initialization is required before use:

```typescript
// Initialize button matrix
JoyPiAdvanced.buttonmatrixInit()
```

#### Button pressed

Returns the value number when a button is pressed. If no button is pressed, -1 is returned.

```typescript
// Return button value number
JoyPiAdvanced.buttonmatrixIsButtonPressed()
```

#### Button value

On the silk screen of the Joy-Pi Advanced, the button matrix is labeled with 0-9 and #, X, /, +, - and =. This function returns the corresponding button value (as a string) when a button is pressed. If no button is pressed, -1 is returned.

```typescript
// Return button value
JoyPiAdvanced.buttonmatrixGetKey()
```


#### Button code

This method returns the location of the pressed button. Therefore, it is a code `column|row` returned.

```typescript
// Return button code
JoyPiAdvanced.buttonmatrixGetButtonCode()
```

#### Button matrix as calculator

This block uses the button matrix as a calculator. It returns the current input. If `=`is pressed, the term is calculated. If `#`is pressed, the term is cleared.

```typescript
// Use button matrix as calculator
let term = ""
term = JoyPiAdvanced.buttonmatrixCalcsulate()
```

### Buzzer

The buzzer is an acoustig signal generator, which is controlled with a frequency and thus emits a sound. The frequency determines the pitch of the tone.

> [!NOTE]
>The buzzer is connected to P7.

#### Turn buzzer on

You can turn the buzzer on by using the `JoyPiAdvanced.buzzerOn(frequency)` function. The `frequency` can be a value between 100 and 20000.

```typescript
// Turn buzzer on with a frequency of 2000
JoyPiAdvanced.buzzerOn(2000)
```

#### Turn buzzer off

You can turn the buzzer off by using this function.

```typescript
JoyPiAdvanced.buzzerOff()
```

### Color Sensor

The color sensor allows you to determine the composition (red, green, blue and white) of colors. The module outputs a signal which will be converted into the corresponding color values. Please note that the color sensor can **not** measure the exact composition of colors. Instead it gives you an indication to which base color the color tends.

> [!NOTE]
>The color sensor is connected via I2C on address 0x10.

#### Initialization

Because the color sensor is an I2C-device, an initial initialization is required before use:

```typescript
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


```typescript
// set integration time
JoyPiAdvanced.colorSensorSetIntegrationTime(JoyPiAdvancedColorSensor_IntegrationTime.ms_160)
```

#### Set modes of sensor
The color sensor can be used in two different modes. These can be set up with the following blocks:

##### Auto mode
```typescript
// set color sensor to auto mode
JoyPiAdvanced.colorSensorAutoMode()
```
##### Force mode
```typescript
// set color sensor to force mode
JoyPiAdvanced.colorSensorForceMode()
```

#### Detect colors
The data from the sensor can be read from different blocks.

##### Single colors
You can detect the intensity of the base colors with the following functions.

```typescript
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
```typescript
// get RGBW values
JoyPiAdvanced.colorSensorGetRGBW()
```

##### All colors & dominant color
This block adds to the previous method the dominant power. Therefore, it returns additionally the dominant color as a string`[dominant color, red, green, blue, white}`.

```typescript
// get dominant color and RGBW values
JoyPiAdvanced.colorSensorReadAll()
```

#### Disable sensor
This block disables the color sensor again.
```typescript
// disable color sensor
JoyPiAdvanced.disableColorSensor()
```

### DHT11 temperature & humidity sensor

The DHT11 is a combination sensor which can measure temperatures (0 - 50 degrees celsius) and humidity (20 - 90 %).

> [!NOTE]
>The DHT11 sensor is connected to P8.

#### Measurement values
This block triggers a measurement from the DHT11 and returns an array with temperature and humidity `[temperature, humidity]`.

```typescript
// Measure temperature & humidity and return it
JoyPiAdvanced.dht11GetMeasurement()
```

#### Start measurement
This block triggers a measurement from the DHT11. It also returns if the triggered measurement was successful or not.

```typescript
// Measure temperature & humidity
JoyPiAdvanced.dht11ReadSensor()
```

#### Successful measurement
This block returns false if last measurement was unsuccessful and true if it was successfull.

```typescript
// check if last measurement was successfull
JoyPiAdvanced.dht11WasSuccessful()
```

#### Last measured values
You can use `JoyPiAdvanced.dht11GetTemperature()` and `JoyPiAdvanced.dht11GetHumidity()` to receive the **last** corresponding measurement values.
```typescript
// Return humidity
JoyPiAdvanced.dht11GetLastHumidity()
// Return temperature
JoyPiAdvanced.dht11GetLastTemperature()
```

### DS18B20 temperature sensor

The DS18B20 is an external, waterproof temperature sensor. It is located in an encapsulated housing on an approx. 1m long cable and is thus able to measure the temperature in liquids. Please note that the DS18B20 sensor need to be connected to your Joy-Pi Advanced board before you can use it.

**The DS18B20 sensor is connected to P9.**

#### Measure temperature

The temperature can be measured by using the **JoyPiAdvanced.readDS18B20()** function.

```typescript
// Measure temperature
JoyPiAdvanced.readDS18B20()
```

### EEPROM module

The EEPROM memory allows data to be stored and read out again at a later time. A write protection can additionally ne activated on the board.

**The EEPROM is connected via I2C on address 0x50.**

#### Write data

You can write up to 32 kB of data to the EEPROM by using the **JoyPiAdvanced.eepromWrite(data, address)** function. Both parameters, **data** and **address**, need to be a number.

```typescript
// Write number 12345 to address 5
JoyPiAdvanced.eepromWrite(12345, 5);
```

#### Read data

Data can be read out by using the **JoyPiAdvanced.eepromRead(address)** function.

```typescript
// Read data from address 5
JoyPiAdvanced.eepromRead(5)
```

### Gyroscope

With the help of a gyroscope, the angular velocity and thus the orientation of the object can be measured. The gyroscope built into the Joy-Pi Advanced is capable of measuring the orientation within the X-axis and the Y-axis, as well as the tilt. In addition, the temperature can also be measured.

**The gyroscope is connected via SPI on P1 (CS).**

#### Initialization

Because the gyroscope is an SPI-device, an initial initialization is required before use:

```typescript
// Initialize gyroscope
JoyPiAdvanced.gryoscopeInit()
```

#### Measure axis values

The orientation of the X-axis and Y-axis can be measured by using the **JoyPiAdvanced.gyroscopeGetX()** and **JoyPiAdvanced.gyroscopeGetY()** functions.

```typescript
// Measure orientation of X-Axis
JoyPiAdvanced.gyroscopeGetX()
// Measure orientation of Y-Axis
JoyPiAdvanced.gyroscopeGetY()
```

#### Measure tilt

The tilt of the device can be measured by using the **JoyPiAdvanced.gyroscopeGetTilt()** function.

```typescript
// Measure tilt of the device
JoyPiAdvanced.gyroscopeGetTilt()
```

#### Measure temperature

Additionally, the temperature can be measured with the help of the gyroscope by using the **JoyPiAdvanced.gyroscopeGetTemperature()** function.

```typescript
// Measure temperature
JoyPiAdvanced.gyroscopeGetTemperature()
```

### Hall sensor

Hall sensors are sensitive to magnetic fields and can therefore determine the strength of such a field. The stronger the magnetic field, the more voltage can be measured.

**The hall sensor is an analog sensor and is connected to channel A4 of the ADC.**

#### Measure voltage

Determine the intensity of a magnetic field by measuring the voltage passing through the sensor with the **JoyPiAdvanced.hallSensorVoltage()** function.

```typescript
// Measure voltage
JoyPiAdvanced.hallSensorVoltage()
```

### Infrared receiver

The infrared receiver can receive infrared signals and output them as a digital signal sequence. Please note that not all remote controls can be detected, as remote controls from different manufacturers also use different communication protocols. We therefore recommend to use only the remote control included in the Joy-Pi Advanced.

**The infrared receiver is connected to P0.**

#### Initialize infrared receiver

The infrared receiver needs to be initialized before use because it is listening for input in the background. You can initialize the ir receiver with **JoyPiAdvanced.initIrReceiver()**.

```typescript
// Initialize IR receiver
JoyPiAdvanced.initIrReceiver()
```

#### Get pressed button

Each button is assigned a unique number for identification. With **JoyPiAdvanced.irButton()** the corresponding identification number can be read out. If no button was pressed, 0 is returned instead.

```typescript
// Read out pressed button
JoyPiAdvanced.irButton()
```

### Joystick

The joystick outputs its position on the X an d Y axes and can thus be clearly localized in its current position. It is additionally equipped with a button.

**The joystick is connected to the ADC channel A0 (X-Axis) and A1 (Y-Axis) as well as to P10 (button).**

#### Axis positions

You can locate the position of the Joystick by using **JoyPiAdvanced.joystickGetXValue()** and **JoyPiAdvanced.joystickGetYValue()**. Because the joystick is connected to the build-in 12-bit ADC of the Joy-Pi Advanced, the axis values are between 0 and 4095.

```typescript
// Get X-Axis
JoyPiAdvanced.joystickGetXValue()
// Get Y-Axis
JoyPiAdvanced.joystickGetYValue()
```

#### Button input

The press of the button can be checked with the **JoyPiAdvanced.joystickCheckButton()** function. The function returns true or false.

```typescript
// Check if button was pressed
JoyPiAdvanced.joystickCheckButton()
```

### 16x2 LCD Display

The 16x2 display can output texts on a total of 16 characters and over 2 lines. It is ideally suited for the quick output of status information or measurement results.

**The 16x2 lcd display is connected via I2C on address 0x21.**

#### Initialization

Because the display is an I2C-device, an initial initialization is required before use:

```typescript
JoyPiAdvanced.lcd16x2Init()
```

#### Power functions

The display supports various power functions. These include power on, power off, backlight power on and backlight power off.

```typescript
// Turn LCD on
JoyPiAdvanced.lcd16x2TurnOn()
// Turn LCD off
JoyPiAdvanced.lcd16x2TurnOff()
// Turn backlight on
JoyPiAdvanced.lcd16x2BacklightOn()
// Turn backlight off
JoyPiAdvanced.lcd16x2BacklightOff()
```

#### Output text

Text can be send to the display by using the **JoyPiAdvanced.LCD16x2_showText(text, x, y)** function. The string to be displayed is passed with **text** and the position on the display is passed with **x** and **y**. The entire display output can be deleted with **JoyPiAdvanced.LCD16x2_clear()**.

```typescript
// Show text at position 0 on line 0
JoyPiAdvanced.lcd16x2ShowText('Hello World', 0, 0)
// Show text at position 2 on line 1
JoyPiAdvanced.lcd16x2ShowText('Hello World', 2, 1)
// Clear output
JoyPiAdvanced.lcd16x2Clear()
```

#### Shift text

The whole output can be shifted to the left and right and can thus be moved over the display.

```typescript
// Shift text to the left
JoyPiAdvanced.lcd16x2ShiftLeft()
// Shift text to the right
JoyPiAdvanced.lcd16x2ShiftRight()
```

#### Cursor functions

The display also offers the possibility to switch on the current cursor position. You can choose between a permanent and a blinking cursor. Of course, the cursor can also be switched off and moved back to the start position.

```typescript
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

**The LDR is connected to the ADC channel A5.**

#### Measure light intensity

The light intensity can measured by using **JoyPiAdvanced.ldrLight()**. The intensity is returned as a percentages. Please note that a light intensity of 100% does not mean the greatest possible luminosity, but only that the measurement limit of the sensor has been reached.

```typescript
// Measure light intensity
JoyPiAdvanced.ldrLight()
```

### Light barrier

The light barrier detects when it has been interrupted by something. In combination with the attachment and motor included in the Joy-Pi Advanced, it is possible, for example, to drive the perforated disc and measure the motor speed.

**The light barrier is connected to P0.**

#### Check for interruption

Check if something is interrupting the light barrier by using **JoyPiAdvanced.lightBarrierIsTriggered()**. The function returns true or false.

```typescript
// Check if light barrier is interrupted
JoyPiAdvanced.lightBarrierIsTriggered()
```

#### Calculate RPM

If the light barrier is interrupted several times in succession by the perforated disc supplied, the corresponding revolutions per minute can be calculated from this.

```typescript
// Calculate RPM
JoyPiAdvanced.lightBarrierRPM()
```

### NTC

A negative temperature coefficient thermistor (NTC) is a temperature-dependent resistor. It conducts electrical current better at high temperatures than at low temperatures. The current temperature can thus be derived from the individual characteristic curve of the resistor and the measured current.

**The NTC is connected to the ADC channel A2.**

#### Measure temperature

The temperature can be measured in celsius by using **JoyPiAdvanced.ntcTemperature()**.

```typescript
// Measure temperature
JoyPiAdvanced.ntcTemperature()
```

### OLED Display

An OLED dipslay consists of organic light-emitting diodes and is technically fundamentally different from the 16x2 LCD display. A big advantage is that graphic elements (such as circles and rectangles) can be displayed on the OLED.

**The OLED display is connected via I2C on address 0x3C.**

#### Initialization

Because the display is an I2C-device, an initial initialization is required before use:

```typescript
// Initialize OLED display
JoyPiAdvanced.oledInit()
```

#### Display text and graphical elements
The display can show text as well as the graphical elements **line**, **rectangle**, and **circle**.

```typescript
// Show text
JoyPiAdvanced.oledShowString("Hello World")
// Draw line from x-y coordinates 10-15 to x-y coordinates 60-60
JoyPiAdvanced.oledDrawLine(10, 15, 60, 60)
// Draw rectangle starting at x-y coordinate 10-15 with a width of 20 and a height of 30
JoyPiAdvanced.oledDrawRectangle(10, 15, 20, 30)
// Draw circle at x-y coordinate 50-50 with a radius of 20
JoyPiAdvanced.oledDrawCircle(50, 50, 20)
```

#### Clear display

All contents on the display can be erased by using the **JoyPiAdvanced.oledClear()** function.

```typescript
// CLear output from display
JoyPiAdvanced.oledClear()
```

### PIR sensor

A PIR sensor is an infrared-based motion sensor. Temperature changes in its proximity lead to measurable change in electrical voltage and thus allow conclusions to be drawn about movements in its vicinity.

**The PIR sensor is connected to P6.**

#### Detect motion

The function JoyPiAdvanced.pirCheckMotion() allows you to detect motion. The function returns true or false.

```typescript
// Detect motion
JoyPiAdvanced.pirCheckMotion()
```

### PWM fan

The fan on the Joy-Pi Advanced is supposed to cool an installed Raspberry Pi. When set to PWM mode, it is possible to control the speed of the fan by applying a PWM signal to the fan.

**The PWM fan is connected to P7.**

#### Control speed

You can control the speed of the fan from 0 to 100.

```typescript
// Set PWM fan to maximum speed
JoyPiAdvanced.pwmSetSpeed(100)
// Set PWM fan to medium speed
JoyPiAdvanced.pwmSetSpeed(50)
// Stop PWM fan
JoyPiAdvanced.pwmSetSpeed(0)
```

### Potentiometer

A potentiometer is a component whose resistance can be changed mechanically. By moving it from left to right, its resistance can be increased continuously.

**The potentiometer is connected to the ADC on channel A3.**

#### Read potentiometer

The voltage currently applied to the potentiometer can be measured directly.

```typescript
JoyPiAdvanced.potentiometerVoltage()
```

### RFID module

RFID is a technology in which a transmitter communicates with a receiver without contact. The transponder usually consists of an object that can be held in front of the sensor.

**The RFID module is connected via SPI on P16 (CS).**

#### Initialization

The RFID module needs to be initialized before use.

```typescript
JoyPiAdvanced.rfidInit()
```

#### Read from RFID tag

You can either read the ID of an RFID tag, for unique tag identification, or the content stored in an RFID tag.

```typescript
// Read ID of RFID tag
JoyPiAdvanced.rfidReadId()
// Read content of RFID tag
JoyPiAdvanced.rfidReadText()
```

#### Write to RFID tag

You can also overwrite the content stored in a tag.

```typescript
// Write content to RFID tag
JoyPiAdvanced.rfidWriteText('Hello World')
```

### RGB matrix

An RGB matrix is a grid of LEDs divided into vertical columns and horizontal rows. Each LED can be controlled individually and can be set in the RGB color space.

**The RGB matrix is connected to P8.**

#### Control matrix

You can control the complete matrix as well as single pixels of the matrix. You are also able to set the brightness of the matrix.

```typescript
// Set complete matrix to red
JoyPiAdvanced.matrixShowColor(255, 0, 0)
// Set complete matrix to green
JoyPiAdvanced.matrixShowColor(0, 255, 0)
// Set complete matrix to blue
JoyPiAdvanced.matrixShowColor(0, 0, 255)
// Set complete matrix to white
JoyPiAdvanced.matrixShowColor(255, 255, 255)
// Set single pixel at x-y position 5-5 to red
JoyPiAdvanced.matrixSetPixel(5, 5, 255, 0, 0, 0)
```

### Rainbow mode

The rainbow mode automatically cycles the RGB matrix through all colors.

```typescript
// Activate rainbow mode
JoyPiAdvanced.matrixRainbow()
```

### Clear matrix

The output of the matrix can be erased with **JoyPiAdvanced.matrixClear()**.

```typescript
// Clear matrix
JoyPiAdvanced.matrixClear()
```

### Real time clock

An RTC does not measure the relative runtime of a microcontroller, but the actual time. So that the RTC does not have to be set again each time the device is switched off, it is additionally equipped with a button cell and can thus retain its settings.

**The RTC is connected via I2C on address 0x68.**

#### Set time

The RTC can be set completely with a single function, as well as individually with a function for each parameter.

```typescript
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

```typescript
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

A relay is a remotely controllable switch operated by current. Other circuits can be switched via a circuit that is activated. The line to be switched is connected to the **COM** interface. If the relay is switched off, the current is continued via the **NC** interface. The **NO** interface remains currentless. If the relay is switched, the two interfaces change. The current is now carried on via **NO** and **NC** is deenergized.

**The relay is connected to P1.**

#### Control the relay

The relay is fairly simple. It can be turned on and off.

```typescript
// Turn relay on
JoyPiAdvanced.relayOn()
// Turn relay off
JoyPiAdvanced.relayOff()
```

### Rotary encoder

The rotary encoder is a switch that can be turned clockwise or counterclockwise. When the roary encoder is moved, the direction of movement and the current position of the switch are encoded. Per steop the states of the outputs change. The direction of rotation can be determined by checking which of the two states changed first. In addition, the rotary encoder can be pressed to switch another signal.

**The rotary encoder is connected to P2 (DT), P3 (CLK) and P4 (SW).**

#### Rotation and button

The rotation of the rotary encoder is not controlled by a single function, but by an event. All necessary instructions for the control can be integrated into this event.

```typescript
// Respond to clockwise rotation
JoyPiAdvanced.rotaryEncoderonTurned(Direction.clockwise, function(){
    serial.writeLine('Rotary encoder turned clockwise')
})

// Respond to counterclockwise rotation
JoyPiAdvanced.rotaryEncoderonTurned(Direction.counterclockwise, function(){
    serial.writeLine('Rotary encoder turned counterclockwise')
})

// Respond to button pressed
JoyPiAdvanced.rotaryEncoderonPressEvent(function(){
    serial.writeLine('Button has been pressed')
})
```

### Servo motor

Servo motors are small motors that are adjustable in their direction of rotation and speed. Please note that the servo motor is an external device that needs to be connected to your Joy-Pi Advanced. 

**The servo motor is connected to P8.**

#### Control servo motor

The speed of the servo motor is not adjustable via the function. Instead, the speed can be influenced via pauses within the code. The servo motor can be driven to a degreen angle between 0 and 180.

```typescript
// Rotate servo motor to degree angle 90
JoyPiAdvanced.turnMotor(90)
// Rotate servo motor cto degree angle
JoyPiAdvanced.turnMotor(120)
```

### Shock sensor

A shock sensor can detect shakes and vibrations. As soon as the signal exceeds a certain threshold, this is automatically output at the signal output of the sensor.

**The shock sensor is connected to P10.**

#### Detect shocks

Shocks and vibrations can be detected with the **JoyPiAdvanced.shocksensorCheck()** function. The function returns true or false.

```typescript
// Check for shocks
JoyPiAdvanced.shocksensorCheck()
```

### Sound sensor

The sound sensor detects noise. As soon as the noise level exceeds a defined threshold, this is automatically output at the signal output of the sensor.

**The sound sensor is connected to P9.**

#### Detect sound

You can detect sound via the **JoyPiAdvanced.soundsensorCheck()** function. The function returns true or false.

```typescript
// Check for sound
JoyPiAdvanced.soundsensorCheck()
```

### Stepper motor

The stepper motor is a type of electric motor that moves in precise, fixed increments called steps, allowing for accurate position control. It is commonly used in robotics, 3D printers, and CNC machines for precise motion.

**The stepper motor is connected to P4 (S1), P5 (S2), P6 (S3) and P7 (S4)**

#### Rotate stepper motor ###

The stepper motor can be used with the **JoyPiAdvanced.stepperRotate(direction, steps, unit)** function. You can choose if you want to rotate by a number of steps or a number of full rotationF

```typescript
// Rotate clockwise by 10 steps
JoyPiAdvanced.stepperRotate(Stepperdirection.clockwise, 10, Stepunit.steps)
// Rotate counterclockwise by 2 rotations
JoyPiAdvanced.stepperRotate(Stepperdirection.counterclockwise, 2, Stepunit.rotations)
```

### Switches

A switch is a component with which an electrical connection can be closed and opened. The Joy-Pi Advanced has a total of 5 switches.

**The switches are connected to P2, P3, P4, P5 and P6.**

#### Check switch setting

The condition of the switches can be checked with the **JoyPiAdvanced.switchCheck(JoyPiSwitch)** function. The function returns true or false.

```typescript
// Check switch 1
JoyPiAdvanced.switchCheck(SWselection.switch1)
// Check switch 2
JoyPiAdvanced.switchCheck(SWselection.switch2)
// Check switch 3
JoyPiAdvanced.switchCheck(SWselection.switch3)
// Check switch 4
JoyPiAdvanced.switchCheck(SWselection.switch4)
// Check switch 5
JoyPiAdvanced.switchCheck(SWselection.switch5)
```

### TFT display

The TFT display is the all-rounder among the displays. It has a sufficient size for displaying content and can also display graphic elements in addition to text.

**The TFT display is connected via SPI on P10 (CS), P0 (D/C) and P1 (Reset).**

#### Initialize

The display needs to be initialized before use.

```typescript
// Initialize display
JoyPiAdvanced.tftInit()
```

#### Display functions

The display can show single pixels, lines, rectangles and circles in addition to text.

```typescript
// Show text at x-y position 20-30 with zoom level 1, font color red and background color black
JoyPiAdvanced.tftShowString('Hello World', 20, 30, 1, color.red, Color.black)
// Draw single pixel at x-y position 10-20 with color blue
JoyPiAdvanced.tftDrawPixel(10, 20, Color.blue)
// Draw line from x-y position 10-10 to x-y position 100-80 with color yellow
JoyPiAdvanced.tftDrawLine(10, 10, 100, 80, Color.yellow)
// Draw rectangle at x-y position 10-10 with a width of 50 and a height of 20 in color green
JoyPiAdvanced.tftDrawRectangle(10, 10, 50, 20, Color.green)
// Draw circle at x-y position 50-50 with a radius of 20 in color blue
JoyPiAdvanced.tftDrawCircle(50, 50, 20, Color.blue)
```

#### Settings

The display supports zoom levels for text from 1 to 5 and supports various predefined colors:

- color.black
- color.navy
- color.darkgreen
- color.darkcyan
- color.maroon
- color.purple
- color.olive
- color.lightgrey
- color.darkgrey
- color.blue
- color.green
- color.cyan
- color.red
- color.magenta
- color.yellow
- color.white
- color.orange
- color.greenyellow
- color.pink

#### Other functions

In addition to the display drawing functions, the display can be switched off, switched on, and the current output can be deleted.

```typescript
// Turn display off
JoyPiAdvanced.tftOff()
// Turn display on
JoyPiAdvanced.tftOn()
// Clear display
JoyPiAdvanced.tftClear()
```

### Touch sensor

With the touch sensor, the contact is closed by touch. The contacts can either be touched directly or attached to any object using the supplied clamps. A total of 6 touch sensors are available.

**The touch sensor is connected via I2C on address 0x5A.**

#### Initialize

Because the touch sensor is an I2C-device, an initial initialization is required before use:

```typescript
// Initialize touch sensor
JoyPiAdvanced.touchsensorInit()
```

#### Detect touch

The status of each contact can be queried directly. The function returns either true or false.

```typescript
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

**The ultrasonic sensor is connected to P2 (Echo) and P3 (Trigger).**

#### Measure distances

A measurement can be initiated directly via the JoyPiAdvanced.measureDistance() function. The measurement result is returned in cm.

```typescript
// Measure distance
JoyPiAdvanced.measureDistance()
```

### Vibration motor

The vibration motor is a device that oscillates at a high frequency to produce noticable vibrations.

**The vibration motor is connected to P16.**

#### Control motor

The vibration motor can be turned on or off.

```typescript
// Turn vibration motor on
JoyPiAdvanced.vibrationOn()
// Turn vibration motor off
JoyPiAdvanced.vibrationOff()
```

## Supported targets 

* for PXT/microbit 

## License 

MIT
