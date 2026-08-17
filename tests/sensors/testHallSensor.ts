JoyPiAdvanced.initializeAdvanced()

let hallSensor_value= JoyPiAdvanced.hallSensorGetMagneticField()

if (JoyPiAdvanced.hallSensorIsNorthPole(hallSensor_value)){
    serial.writeLine("North pole detected")
}
else if (JoyPiAdvanced.hallSensorIsSouthPole(hallSensor_value)){
    serial.writeLine("South pole detected")
}
else{
    serial.writeLine("Nothing detected")
}