JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.lcd16x2Init()

JoyPiAdvanced.lcd16x2ShowText('1. line', 0, 0)
JoyPiAdvanced.lcd16x2ShowText('2. line', 2, 1)
basic.pause(1000)

JoyPiAdvanced.lcd16x2ShiftRight()
basic.pause(1000)
JoyPiAdvanced.lcd16x2ShiftLeft()

JoyPiAdvanced.lcd16x2ShowCursor()
basic.pause(1000)
JoyPiAdvanced.lcd16x2BlinkingCursor()
basic.pause(1000)

JoyPiAdvanced.lcd16x2Clear()
basic.pause(1000)
JoyPiAdvanced.lcd16x2ShowText('Test', 0, 0)

JoyPiAdvanced.lcd16x2ReturnHome()
basic.pause(1000)
JoyPiAdvanced.lcd16x2HideCursor()
basic.pause(1000)

JoyPiAdvanced.lcd16x2BacklightOff()
basic.pause(1000)
JoyPiAdvanced.lcd16x2BacklightOn()
basic.pause(1000)

JoyPiAdvanced.lcd16x2TurnOff()
basic.pause(1000)
JoyPiAdvanced.lcd16x2TurnOn()
basic.pause(1000)
JoyPiAdvanced.lcd16x2TurnOff()