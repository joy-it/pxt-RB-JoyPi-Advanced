JoyPiAdvanced.initializeAdvanced()

let ldr_voltage = JoyPiAdvanced.ldrGetRawVoltage()
let ldr_lux = JoyPiAdvanced.ldrGetLux(ldr_voltage)
serial.writeLine("Lux: " + convertToText(ldr_lux))