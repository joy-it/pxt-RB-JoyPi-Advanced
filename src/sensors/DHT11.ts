namespace JoyPiAdvanced {
    const dhtPin = DigitalPin.P8;
    let humidity = 0;
    let temperature = 0;
    let valid = false;

    function waitForLevel(level: number, timeout: number){
        let start = input.runningTimeMicros()
        while (pins.digitalReadPin(dhtPin) != level){
            if (input.runningTimeMicros() - start > timeout) return false
        }
        return true
    }

    function measurePulse(level: number, timeout: number){
        let start = input.runningTimeMicros()
        while (pins.digitalReadPin(dhtPin) == level) {
            if (input.runningTimeMicros() - start > timeout) return -1
        }
        return input.runningTimeMicros() - start
    }

    function readDHT11(){
        let data = [0, 0, 0, 0, 0]
        valid = false
        // send start signal
        pins.digitalWritePin(dhtPin, 0)
        basic.pause(18)
        // release data line
        pins.digitalWritePin(dhtPin, 1)
        control.waitMicros(30)
        pins.setPull(dhtPin, PinPullMode.PullUp)
        pins.digitalReadPin(dhtPin)
        // DHT11 response
        if (!waitForLevel(0, 120)) return false
        if (!waitForLevel(1, 120)) return false
        if (!waitForLevel(0, 120)) return false
        // read data
        for (let bit = 0; bit < 40; bit++){
            if (!waitForLevel(1, 120)) return false
            let pulse = measurePulse(1, 120)
            if (pulse < 0) return false
            let byteIndex = Math.idiv(bit, 8)
            data[byteIndex] = data[byteIndex] << 1
            if (pulse > 45) data[byteIndex] = data[byteIndex] | 1
        }
        let checksum = (data[0] + data[1] + data[2] + data[3]) & 0xFF
        if (checksum != data[4]) return false
        humidity = data[0]
        if ((data[2] & 0x80) != 0) temperature = -(data[2] & 0x7F)
        else temperature = data[2]
        valid = true
        return true
    }

    /**
     * Measure temperature and humidity with DHT11
     */
    //% block="measure temperature and humidity from DHT11"
    //% subcategory="DHT11"
    //% weight=100
    export function dht11ReadSensor(){
        return readDHT11()
    }

    /**
     * Reads temperature and humidity with DHT11
     */
    //% block="reads temperature and humidity from DHT11"
    //% subcategory="DHT11"
    //% weight=90
    export function dht11GetMeasurement(){
        readDHT11()
        return [temperature, humidity]
    }

    /**
     * Returns last measured temperature of DHT11
     */
    //% block="last measured temperature of DHT11"
    //% subcategory="DHT11"
    //% weight=80
    export function dht11GetLastTemperature(): number {
        return temperature;
    }

    /**
     * Returns last measured humidity of DHT11
     */
    //% block="last measured humidity of DHT11"
    //% subcategory="DHT11"
    //% weight=75
    export function dht11GetLastHumidity(): number {
        return humidity;
    }

    /**
     * Returns if last reading of DHT was valid
     */
    //% block="last reading of DHT11 valid"
    //% subcategory="DHT11"
    //% weight=70
    export function dht11WasSuccessful(){
        return valid
    }

}