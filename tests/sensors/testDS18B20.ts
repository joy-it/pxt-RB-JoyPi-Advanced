JoyPiAdvanced.initializeAdvanced()

let DS18B20Temperature = JoyPiAdvanced.readDS18B20()
serial.writeLine(convertToText(DS18B20Temperature) + " C")