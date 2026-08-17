JoyPiAdvanced.initializeAdvanced()

serial.writeLine("Check if read values are from a sucessfull measurement")
let dht_values = JoyPiAdvanced.dht11GetMeasurement()
if (JoyPiAdvanced.dht11WasSuccessful()) {
    let dht11Temperature = dht_values[0]
    let dht11Humidity = dht_values[1]
    serial.writeLine("Temperature: " + convertToText(dht11Temperature) + " C -- Humidity: " + convertToText(dht11Humidity) + " %")
}
else {
    serial.writeLine("Measurement were unsucessfull")
}
basic.pause(2000)

serial.writeLine("Get values after sucessfull measurement")
if (JoyPiAdvanced.dht11ReadSensor()){
    serial.writeLine("Temperature: " + convertToText(JoyPiAdvanced.dht11GetLastTemperature()) + " C -- Humidity: " + convertToText(JoyPiAdvanced.dht11GetLastHumidity()) + " %")
}
else {
    serial.writeLine("Measurement were unsucessfull")
}