JoyPiAdvanced.initializeAdvanced()

if (JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch1)) {
    serial.writeLine("Switch 1 is ON")
}
else {
    serial.writeLine("Switch 1 is OFF")
}

if (JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch2)) {
    serial.writeLine("Switch 2 is ON")
}
else {
    serial.writeLine("Switch 2 is OFF")
}

if (JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch3)) {
    serial.writeLine("Switch 3 is ON")
}
else {
    serial.writeLine("Switch 3 is OFF")
}

if (JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch4)) {
    serial.writeLine("Switch 4 is ON")
}
else {
    serial.writeLine("Switch 4 is OFF")
}

if (JoyPiAdvanced.switchCheck(JoyPiAdvancedSWSeelection.switch5)) {
    serial.writeLine("Switch 5 is ON")
}
else {
    serial.writeLine("Switch 5 is OFF")
}