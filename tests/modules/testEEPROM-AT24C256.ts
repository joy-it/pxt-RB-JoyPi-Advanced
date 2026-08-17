JoyPiAdvanced.initializeAdvanced()

JoyPiAdvanced.eepromWrite(212, 5)
let eepromValue = JoyPiAdvanced.eepromRead(5)
serial.writeLine(convertToText(eepromValue))