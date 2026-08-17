/**
* Enumeration for On/Off state
*/
enum JoyPiAdvancedColorSensor_IntegrationTime {
    //% block="40 ms"
    ms_40,
    //% block="80 ms"
    ms_80,
    //% block="160 ms"
    ms_160,
    //% block="320 ms"
    ms_320,
    //% block="640 ms"
    ms_640,
    //% block="1280 ms"
    ms_1280
}
namespace JoyPiAdvanced {
    // Address
    const colorsensorADDR = 0x10
    // Channels
    const REG_RED = 0x08
    const REG_GREEN = 0x09
    const REG_BLUE = 0x0A
    const REG_WHITE  = 0x0B
    const REG_CONF = 0x00
    // Constants
    const BIT_SD = 0x01
    const BIT_AF = 0x02
    const BIT_TRIG = 0x04
    const MASK_INTEGRATION_TIME = 0x70
    // integration time default value
    let integration_time = JoyPiAdvancedColorSensor_IntegrationTime.ms_160


    function writeOnColorSensor(cmd: number, value: number){
        let buffer = pins.createBuffer(3);
        buffer.setNumber(NumberFormat.Int8LE, 0, cmd & 0xFF)
        buffer.setNumber(NumberFormat.Int8LE, 1, value & 0xFF)
        buffer.setNumber(NumberFormat.Int8LE, 1, (value >> 8) & 0xFF)
        pins.i2cWriteBuffer(colorsensorADDR, buffer, false)
    }

    function readFromColorSensor(cmd: number){
        pins.i2cWriteNumber(colorsensorADDR, cmd & 0xFF, NumberFormat.UInt8LE, true)
        return pins.i2cReadNumber(colorsensorADDR, NumberFormat.UInt16LE, false)
    }
    
    function getIntegrationTimeDelay(int_time: JoyPiAdvancedColorSensor_IntegrationTime){
        if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_40) return 40
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_80) return 80
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_160) return 160
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_320) return 320
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_640) return 640
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_1280) return 1280
        return 160
    }

    function getIntegrationTimeValue(int_time: JoyPiAdvancedColorSensor_IntegrationTime) {
        if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_40) return 0x00
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_80) return 0x10
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_160) return 0x20
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_320) return 0x30
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_640) return 0x40
        else if (int_time == JoyPiAdvancedColorSensor_IntegrationTime.ms_1280) return 0x50
        return 0x20
    }

    /**
     * Initializes the color sensor
     */
    //% block="initialize color sensor"
    //% subcategory="Color-Sensor"
    //% weight=100
    export function initColorSensor(): void {
        let config = getIntegrationTimeValue(integration_time)
        config &= ~BIT_SD
        config &= ~BIT_AF
        config &= ~BIT_TRIG
        writeOnColorSensor(REG_CONF, config)
        basic.pause(getIntegrationTimeDelay(integration_time))
    }

    /**
     * Disable the color sensor
     */
    //% block="disable color sensor"
    //% subcategory="Color-Sensor"
    //% weight=10
    export function disableColorSensor(){
        let config = readFromColorSensor(REG_CONF)
        config |= BIT_SD
        writeOnColorSensor(REG_CONF, config)
    }

    /**
     * Measures the red color component via the color sensor
     */
    //% block="color sensor red value"
    //% subcategory="Color-Sensor"
    //% weight=80
    export function colorSensorGetRed(): number {
        return readFromColorSensor(REG_RED)
    }

    /**
     * Measures the green component via the color sensor
     */
    //% block="color sensor green value"
    //% subcategory="Color-Sensor"
    //% weight=75
    export function colorSensorGetGreen(): number {
        return readFromColorSensor(REG_GREEN)
    }

    /**
     * Measures the blue component via the color sensor
     */
    //% block="color sensor blue value"
    //% subcategory="Color-Sensor"
    //% weight=70
    export function colorSensorGetBlue(): number {
        return readFromColorSensor(REG_BLUE)
    }

    /**
     * Measures all color components via the color sensor
     */
    //% block="color sensor all RGBW-values"
    //% subcategory="Color-Sensor"
    //% weight=85
    export function colorSensorGetRGBW(){
        let red = colorSensorGetRed()
        basic.pause(5)
        let green = colorSensorGetGreen()
        basic.pause(5)
        let blue = colorSensorGetBlue()
        basic.pause(5)
        let white = colorSensorGetWhite()
        return [red, green, blue, white]
    }

    /**
     * Measures all color components via the color sensor 
     * and calculates dominant color
     */
    //% block="color sensor dominant color & all RGBW-values"
    //% subcategory="Color-Sensor"
    //% weight=90
    export function colorSensorReadAll(){
        let rgbw = colorSensorGetRGBW()
        let dominantColor = ""
        if (rgbw[0] > rgbw[1] && rgbw[0] > rgbw[2]) dominantColor = "red"
        else if (rgbw[1] > rgbw[0] && rgbw[1] > rgbw[2]) dominantColor = "green"
        else if (rgbw[2] > rgbw[0] && rgbw[2] > rgbw[1]) dominantColor = "blue"
        return [dominantColor, convertToText(rgbw[0]), convertToText(rgbw[1]), convertToText(rgbw[2]), convertToText(rgbw[3])]
    }

    /**
     * Measures the white component via the color sensor
     */
    //% block="color sensor white value"
    //% subcategory="Color-Sensor"
    //% weight=80
    export function colorSensorGetWhite(): number {
        return readFromColorSensor(REG_WHITE)
    }

    /**
     * Sets integration time of colour sensor
     */
    //% block="set color sensor integration time %int_time"
    //% subcategory="Color-Sensor"
    //% weight=60
    //% int_time.defl=JoyPiAdvancedColorSensor_IntegrationTime.ms_160
    export function colorSensorSetIntegrationTime(int_time: JoyPiAdvancedColorSensor_IntegrationTime){
        let config = readFromColorSensor(REG_CONF)
        config &= ~MASK_INTEGRATION_TIME
        config |= getIntegrationTimeValue(int_time)
        config &= ~BIT_SD
        integration_time = int_time
        writeOnColorSensor(REG_CONF, config)
        basic.pause(getIntegrationTimeDelay(integration_time))
    }

    /**
     * Sets color sensor into force mode
     */
    //% block="set color sensor to force mode"
    //% subcategory="Color-Sensor"
    //% weight=50
    export function colorSensorForceMode(){
        let config = readFromColorSensor(REG_CONF)
        config &= MASK_INTEGRATION_TIME
        config |= BIT_AF
        config |= BIT_TRIG
        config &= ~BIT_SD
        writeOnColorSensor(REG_CONF, config)
        basic.pause(getIntegrationTimeDelay(integration_time))
    }

    /**
     * Sets color sensor into auto mode
     */
    //% block="set color sensor to auto mode"
    //% subcategory="Color-Sensor"
    //% weight=40
    export function colorSensorAutoMode(){
        let config = readFromColorSensor(REG_CONF)
        config &= MASK_INTEGRATION_TIME
        config &= ~BIT_AF
        config &= ~BIT_TRIG
        config &= ~ BIT_SD
        writeOnColorSensor(REG_CONF, config)
        basic.pause(getIntegrationTimeDelay(integration_time))
    }
}