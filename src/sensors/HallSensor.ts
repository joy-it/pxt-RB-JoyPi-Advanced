namespace JoyPiAdvanced {
    /**
     * returns digital value of hall sensor
     */
    //% block="hall sensor digital value"
    //% subcategory="Hall sensor"
    //% weight=100
    export function hallSensorGetMagneticField() {
      return adcReadValue(4)
    } 

    /**
     * returns true if value of hall sensor fits north pole
     * @param value digital value from hall sensor
     */
    //% block="%value is a north pole"
    //% subcategory="Hall sensor"
    //% weight=90
    export function hallSensorIsNorthPole(value: number){
        if (value < 1800) return true
        else return false
    }

    /**
     * returns true if value of hall sensor fits south pole
     * @param value digital value from hall sensor
     */
    //% block="%value is a south pole"
    //% subcategory="Hall sensor"
    //% weight=80
    export function hallSensorIsSouthPole(value: number) {
        if (value > 2400) return true
        else return false
    }
}