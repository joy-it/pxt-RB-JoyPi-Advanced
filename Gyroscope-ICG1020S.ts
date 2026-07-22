enum JoyPiAdvancedGyroscopeScaleFactor {
    //% block="0"
    scale_0,
    //% block="8"
    scale_8,
    //% block="16"
    scale_16,
    //% block="24"
    scale_24,
}

namespace JoyPiAdvanced {
    let mosiPin = DigitalPin.P15;
    let misoPin = DigitalPin.P14;
    let sclkPin = DigitalPin.P13;
    let gyroscopeCSPin = DigitalPin.P1;
    let scale_gyroscope = 700;
    let scale_range = 46.5;
    let scale_factor = JoyPiAdvancedGyroscopeScaleFactor.scale_0

    function write(register: number, data: number) {
        pins.digitalWritePin(gyroscopeCSPin, 0);
        pins.spiWrite(register & 0x7F);
        pins.spiWrite(data);
        pins.digitalWritePin(gyroscopeCSPin, 1);
    }

    function read(register: number) {
        pins.digitalWritePin(gyroscopeCSPin, 0);
        pins.spiWrite(register | 0x80);
        let data = pins.spiWrite(0);
        pins.digitalWritePin(gyroscopeCSPin, 1);
        return data;
    }

    /**
     * Initializsed the gyroscope
     */
    //% block="initialize Gyroscope"
    //% weight=100 
    //% subcategory="Gyroscope"
    export function gyroscopeInit() {
        pins.spiFrequency(200000000);
        pins.spiFormat(8, 1);
        pins.spiPins(mosiPin, misoPin, sclkPin);
        let tmp = read(27) & 0x26;
        write(27, 0x18 | tmp);
    }

    /**
     * Reasds the ambient temperature from the gyroscope
     */
    //% block="gyroscope temperature"
    //% weight=95
    //% subcategory="Gyroscope"
    export function gyroscopeGetTemperature() {
        let tempH = (read(0x41) << 8);
        let tempL = read(0x42);
        let temp = tempH | tempL;
        return temp / 100;
    }

    /**
     * Measures the rotation on the X-axis with the gyroscope
     */
    //% block="gyroscope X-axis"
    //% weight=90
    //% subcategory="Gyroscope"
    export function gyroscopeGetX() {
        let xH = (read(0x43) << 8);
        let xL = read(0x44);
        let x = xH | xL;
        if (x / scale_gyroscope > scale_range) {
            return Math.round((x / scale_gyroscope - (2 * scale_range))*100) / 100;
        }
        else {
            return Math.round((x / scale_gyroscope) * 100) / 100;
        }
    }

    /**
     * Measures the rotation of the Y-axis with the gyroscope
     */
    //% block="gyroscope Y-axis"
    //% weight=85
    //% subcategory="Gyroscope"
    export function gyroscopeGetY() {
        let yH = (read(0x45) << 8);
        let yL = read(0x46);
        let y = yH | yL;
        if (y / scale_gyroscope > scale_range) {
            return Math.round((y / scale_gyroscope - (2 * scale_range)) * 100) / 100;
        }
        else {
            return Math.round((y / scale_gyroscope) * 100) / 100;
        }
    }

    /**
     * Reads the tilt direction of the gyroscope
     */
    //% block="gyroscope tilt direction"
    //% weight=80
    //% subcategory="Gyroscope"
    export function gyroscopeGetTilt() {
        let y = gyroscopeGetY();
        let x = gyroscopeGetX();
        if (y > 5) {
            return 'right';
        }
        else if (y < -5) {
            return 'left';
        }
        else if (x > 3) {
            return 'forward';
        }
        else if (x < -3) {
            return 'backward';
        }
        else {
            return 'No movement';
        }
    }

    /**
     * Set scale factor of gyroscope
     */
    //% block="set scale factor of gyroscope to %scale"
    //% weight=10
    //% subcategory="Gyroscope"
    export function gyroscopeSetScaleFactor(scale: JoyPiAdvancedGyroscopeScaleFactor){
        scale_factor = scale
        write(0x19, 0)
        write(0x1B, scale + 1)
        if (scale == JoyPiAdvancedGyroscopeScaleFactor.scale_0){
            scale_gyroscope = 700
            scale_range = 46.5
        }
        else if (scale == JoyPiAdvancedGyroscopeScaleFactor.scale_8){
            scale_gyroscope = 350
            scale_range = 93
        }
        else if (scale == JoyPiAdvancedGyroscopeScaleFactor.scale_16){
            scale_gyroscope = 175
            scale_range = 187
        }
        else if (scale == JoyPiAdvancedGyroscopeScaleFactor.scale_24){
            scale_gyroscope = 87.5
            scale_range = 374
        }
    }
}