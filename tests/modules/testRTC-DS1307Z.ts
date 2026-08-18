JoyPiAdvanced.initializeAdvanced()

function printRTCReadData() {
    serial.writeLine(convertToText(JoyPiAdvanced.rtcGetYear()) + "-" + convertToText(JoyPiAdvanced.rtcGetMonth()) + "-" + convertToText(JoyPiAdvanced.rtcGetDay()) + " - Weekday: " + convertToText(JoyPiAdvanced.rtcGetWeekday()) + " --- " + convertToText(JoyPiAdvanced.rtcGetHour()) + ":" + convertToText(JoyPiAdvanced.rtcGetMinute()) + ":" + convertToText(JoyPiAdvanced.rtcGetSecond()))
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