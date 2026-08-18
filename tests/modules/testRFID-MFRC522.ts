JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.rfidInit()

function testRFID() {
    let rfid_id = JoyPiAdvanced.rfidReadId()
    serial.writeLine("RFID ID: " + rfid_id)
    serial.writeLine("RFID Text: " + JoyPiAdvanced.rfidReadText())
    JoyPiAdvanced.rfidWriteText("RFID Test")
    serial.writeLine("new RFID Text: " + JoyPiAdvanced.rfidReadText())
}

// method shoulb be executed here