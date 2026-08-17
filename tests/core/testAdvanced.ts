JoyPiAdvanced.initializeAdvanced()
// should display current revision - without Advanced 0
serial.writeLine(convertToText(JoyPiAdvanced.getAdvancedRevision()))

// should display 1.1
JoyPiAdvanced.setAdvancedRevision(JoyPiAdvancedRevision.rev1_1)
serial.writeLine(convertToText(JoyPiAdvanced.getAdvancedRevision()))