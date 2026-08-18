JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.oledInit()

JoyPiAdvanced.oledShowString("Show String")
basic.pause(1000)

JoyPiAdvanced.oledClear()
basic.pause(1000)

JoyPiAdvanced.oledDrawLine(0, 0, 128, 64)
JoyPiAdvanced.oledDrawLine(0, 64, 128, 0)
basic.pause(1000)

JoyPiAdvanced.oledClear()
basic.pause(1000)

JoyPiAdvanced.oledDrawRectangle(0, 0, 10, 10)
basic.pause(1000)

JoyPiAdvanced.oledClear()
basic.pause(1000)

JoyPiAdvanced.oledDrawCircle(64, 32, 20)
basic.pause(1000)

JoyPiAdvanced.oledClear()
basic.pause(1000)