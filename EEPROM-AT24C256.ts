namespace JoyPiAdvanced {
    let eepromADDR = 0x51;

    // method to set right I2C address
    function eepromCheckAdress(){
        checkAdvancedRevision()
        if (getAdvancedRevision() == JoyPiAdvancedRevision.rev1_0) eepromADDR = 0x50;
        else eepromADDR = 0x51;
        basic.pause(10)
    }

    /**
     * Writes data to the EEPROM storage
     * @param data The data that is supposed to be written
     * @param address The address of the EEPROM where the data is supposed to be stored
     */
    //% block="write %data to EEPROM address %address"
    //% subcategory="EEPROM"
    //% weight=100
    //% data.min=0 data.max=255
    //% address.min=0 address.max=32767
    export function eepromWrite(data: number, address: number): void {
        eepromCheckAdress()
        let buffer = pins.createBuffer(3);
        buffer[0] = (address >> 8) & 0xFF;
        buffer[1] = (address & 0xFF);
        buffer[2] = data & 0xFF;
        pins.i2cWriteBuffer(eepromADDR, buffer)
        basic.pause(10)
    }

    /**
     * Reads data from the EEPROM storage
     * @param address The address of the EEPROM where the data is supposed to be read from
     */
    //% block="read byte from EEPROM address %address"
    //% subcategory="EEPROM"
    //% weight=99
    export function eepromRead(address: number): number {
        eepromCheckAdress()
        let buffer = pins.createBuffer(2)
        buffer[0] = (address >> 8) & 0xFF
        buffer[1] = address & 0xFF
        pins.i2cWriteBuffer(eepromADDR, buffer, true)
        return pins.i2cReadNumber(eepromADDR, NumberFormat.UInt8BE);
    }
}