JoyPiAdvanced.initializeAdvanced()

function printRTCReadData() {
    serial.writeLine(convertToText(JoyPiAdvanced.rtcYear()) + "-" + convertToText(JoyPiAdvanced.rtcMonth()) + "-" + convertToText(JoyPiAdvanced.rtcDay()) + " - Weekday: " + convertToText(JoyPiAdvanced.rtcWeekday()) + " --- " + convertToText(JoyPiAdvanced.rtcHour()) + ":" + convertToText(JoyPiAdvanced.rtcMinute()) + ":" + convertToText(JoyPiAdvanced.rtcSecond()))
}

serial.writeLine("RTC Set all at once")
JoyPiAdvanced.rtcSetDateTime(2026, 8, 18, 2, 13, 12, 30)
printRTCReadData()

serial.writeLine("RTC Set each value seperately")
JoyPiAdvanced.rtcSetYear(2024)
JoyPiAdvanced.rtcSetMonth(6)
JoyPiAdvanced.rtcSetDay(15)
JoyPiAdvanced.rtcSetWeekday(6)
JoyPiAdvanced.rtcSetHour(14)
JoyPiAdvanced.rtcSetMinute(30)
JoyPiAdvanced.rtcSetSecond(45)
printRTCReadData()