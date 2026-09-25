JoyPiAdvanced.initializeAdvanced()

serial.writeLine("Reading only Digital Values")
for (let i = 0; i <= 7; i++){
    let adc_digital = JoyPiAdvanced.adcReadValue(i)
    serial.writeLine("Channel " + convertToText(i) + ": "+ convertToText(adc_digital) + " -- " + convertToText(JoyPiAdvanced.adcReadVoltage(i, adc_digital)) + " V")
    basic.pause(100)
}

serial.writeLine("Reading directly voltage")
for (let i = 0; i <= 7; i++){
    let adc_digital = JoyPiAdvanced.adcReadValue(i)
    serial.writeLine("Channel " + convertToText(i) + ": "+ convertToText(JoyPiAdvanced.adcReadVoltage(i)) + " V")
    basic.pause(100)
}