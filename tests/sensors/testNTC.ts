JoyPiAdvanced.initializeAdvanced()

let ntc_voltage = JoyPiAdvanced.ntcGetRawVoltage()
let ntc_temperature = JoyPiAdvanced.ntcGetTemperature(ntc_voltage)

serial.writeLine(convertToText(ntc_voltage) + " V -- " + convertToText(ntc_temperature) + " C")