JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initIrReceiver()

function testIR() {
    let ir_code = 0
    while (true){
        ir_code = JoyPiAdvanced.irGetValue()
        if (ir_code != 0) {
            serial.writeLine(JoyPiAdvanced.irReadValue(ir_code))
        }
        basic.pause(5)
    }
}

// execute method here