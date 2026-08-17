JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.barometerInit()

serial.writeLine("Pressure: " + convertToText(JoyPiAdvanced.barometerGetPressure()) + " hPa")
serial.writeLine("Temperature: " + convertToText(JoyPiAdvanced.barometerGetTemperature()) + " C")
serial.writeLine("Altitude: " + convertToText(JoyPiAdvanced.barometerGetAltitude()) + " m")