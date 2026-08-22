JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializeSoundSensor()

basic.pause(100)

if (JoyPiAdvanced.soundSensorGetState()) {
    serial.writeLine("Sound detected")
}
else {
    serial.writeLine("No sound detected")
}

function testSoundSensor() {
    serial.writeLine("Testing sound sensor")
    JoyPiAdvanced.soundSensorWhenSound(function () {
        serial.writeLine("Sound detected")
    })
    while (true) {
        basic.pause(20)
    }
}

// method should be executed here

JoyPiAdvanced.deinitializeSoundSensor()