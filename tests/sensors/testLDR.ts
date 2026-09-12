JoyPiAdvanced.initializeAdvanced()

let ldr_voltage = JoyPiAdvanced.ldrRawVoltage()
let ldr_lux = JoyPiAdvanced.ldrLux(ldr_voltage)
serial.writeLine("Lux: " + convertToText(ldr_lux))