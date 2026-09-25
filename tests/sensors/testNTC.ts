JoyPiAdvanced.initializeAdvanced()

let ntc_voltage = JoyPiAdvanced.ntcRawVoltage()
let ntc_temperature = JoyPiAdvanced.ntcTemperature(ntc_voltage)

serial.writeLine(convertToText(ntc_voltage) + " V -- " + convertToText(ntc_temperature) + " C")