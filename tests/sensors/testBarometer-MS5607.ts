JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.barometerInit()

serial.writeLine("Pressure: " + convertToText(JoyPiAdvanced.barometerPressure()) + " hPa")
serial.writeLine("Temperature: " + convertToText(JoyPiAdvanced.barometerTemperature()) + " C")
serial.writeLine("Altitude: " + convertToText(JoyPiAdvanced.barometerAltitude()) + " m")