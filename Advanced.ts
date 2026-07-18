/**
* Enumeration for Joy-Pi Advanced Revision
*/
enum JoyPiAdvancedRevision {
    //% block="Version 1.0"
    rev1_0,
    //% block="Version 1.1"
    rev1_1,
    //% block="Version 2.0"
    rev2_0,
}

/**
 * Joy-Pi Advanced: Unleash your creativity with this compact, powerful device! 
 * Compatible with Micro:Bit, Raspberry Pi, Arduino & more, it features over 30 stations, lessons and modules, plus a learning hub for continuous improvement and project support.
 */
//% color="#275C6B" weight=100 icon="\uf109" 
//% block="JoyPi Advanced"
//% subcategories='["Set-Up Advanced", "7-Segment Display", "Analog-Digital Converter", "Barometer", "Button matrix", "Buzzer", "Color-Sensor", "DHT11", "DS18B20", "EEPROM", "Gyroscope", "Hall sensor", "IR Receiver", "Joystick", "LCD16x2", "LDR", "Light barrier", "NTC", "OLED Display", "PIR Sensor", "PWM Fan", "Potentiometer", "MFRC522 RFID", "RGB Matrix", "RTC", "Relay", "Rotary Encoder", "Servo motor", "Shock sensor", "Switches", "TFT1.8", "Touch sensor", "Ultrasonic sensor", "Vibrations motor"]'
namespace JoyPiAdvanced {
    let advanced_revision = 0;
    const fixed_i2c_devices = [0x10, 0x21, 0x22, 0x3C, 0x5A, 0x68, 0x70, 0x77]
    /**
     * Initialize the Joy-Pi Advanced so everything is set up
     */
    //% block="initialize Joy-Pi Advanced"
    //% subcategory="Set-Up Advanced"
    //% weight=100
    export function initializeAdvanced() {
        const i2c_devices = getI2CDevices();
        if (containsAll(i2c_devices, fixed_i2c_devices)) {
            // RGB Matrix 0x66 for Rev2.0, not I2C before
            if (i2c_devices.indexOf(0x66) >= 0) advanced_revision = 2.0;
            // EEPROM 0x51 for Rev1.1, 0x50 for Rev1.0
            else if ((i2c_devices.indexOf(0x51) >= 0)) advanced_revision = 1.1;
            else advanced_revision = 1.0;
        }
        else {
            serial.writeLine("ERROR: Not all I2C devices were found!")
            serial.writeNumbers(i2c_devices)
        }
    }

    /**
     * Set version of Joy-Pi Advanced
     * @param Version of used Joy-Pi Advanced
     */
    //% block="set Joy-Pi Advanced to %JoyPiAdvancedRevision"
    //% subcategory="Set-Up Advanced"
    //% weight=90
    //% version.defl=JoyPiAdvancedRevision.rev2_0
    export function setAdvancedRevision(version: JoyPiAdvancedRevision) {
        if (version == JoyPiAdvancedRevision.rev1_0) advanced_revision = 1.0;
        else if (version == JoyPiAdvancedRevision.rev1_1) advanced_revision = 1.1;
        else if (version == JoyPiAdvancedRevision.rev2_0) advanced_revision = 2.0;
    }

    // method to search for all possible I2C devices
    function getI2CDevices() {
        const i2c_devices = [];
        for (let addr = 0x01; addr <= 0x7F; addr++) {
            let buffer = control.createBuffer(0)
            let error = pins.i2cWriteBuffer(addr, buffer, false)
            if (error == 0) {
                i2c_devices.push(addr)
            }
        }
        return i2c_devices;
    }

    // method to return saved version of Joy-Pi Advanced
    export function getAdvancedRevision() {
        return advanced_revision;
    }

    // method to check if initializeAdvanced() was executed
    export function isAdvancedInitialized() {
        if (getAdvancedRevision() == 0) return false;
        return true;
    }

    // method to run initializeAdvanced() if it was not executed before
    export function checkAdvancedRevision() {
        if (!isAdvancedInitialized()) {
            initializeAdvanced();
            return false;
        }
        else return true;
    }


    // method to check if array has all elements of required
    function containsAll(array: number[], required: number[]): boolean {
        for (let i = 0; i < required.length; i++) {
            if (array.indexOf(required[i]) < 0) {
                return false;
            }
        }
        return true;
    }
}