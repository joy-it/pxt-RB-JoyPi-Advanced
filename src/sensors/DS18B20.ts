namespace JoyPiAdvanced {
    //% shim=DS18B20::Temperature
    export function Temperature(): number {
      return 0
    }

    /**
     * Measures temperature with the DS18B20 sensor. Please note that this is an external sensor that needs to be connected first!
     */
    //% block="DS18B20 temperature"
    //% subcategory="DS18B20"
    //% weight=100
    export function readDS18B20(): number {
      return Temperature()/10
    }



}
