JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.touchsensorInit()

if (JoyPiAdvanced.touchSensorCheck(1)) {
    serial.writeLine("Touch sensor 1 is touched")
}
else {
    serial.writeLine("Touch sensor 1 is not touched")
}

if (JoyPiAdvanced.touchSensorCheck(2)) {
    serial.writeLine("Touch sensor 2 is touched")
}
else {
    serial.writeLine("Touch sensor 2 is not touched")
}

if (JoyPiAdvanced.touchSensorCheck(3)) {
    serial.writeLine("Touch sensor 3 is touched")
}
else {
    serial.writeLine("Touch sensor 3 is not touched")
}

if (JoyPiAdvanced.touchSensorCheck(4)) {
    serial.writeLine("Touch sensor 4 is touched")
}
else {
    serial.writeLine("Touch sensor 4 is not touched")
}

if (JoyPiAdvanced.touchSensorCheck(5)) {
    serial.writeLine("Touch sensor 5 is touched")
}
else {
    serial.writeLine("Touch sensor 5 is not touched")
}

if (JoyPiAdvanced.touchSensorCheck(6)) {
    serial.writeLine("Touch sensor 6 is touched")
}
else {
    serial.writeLine("Touch sensor 6 is not touched")
}