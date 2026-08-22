JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializeShockSensor()

basic.pause(100)

if (JoyPiAdvanced.shockSensorGetState()) {
    serial.writeLine("Shock detected")
}
else {
    serial.writeLine("No shock detected")
}

function testShockSensor() {
    serial.writeLine("Testing shock sensor")
    JoyPiAdvanced.shockSensorWhenShock(function () {
        serial.writeLine("Shock detected")
    })
    while (true) {
        basic.pause(20)
    }
}

// method should be executed here

JoyPiAdvanced.deinitializeShockSensor()