namespace JoyPiAdvanced {
    //% block="north pole"
    //% subcategory="Hall sensor"
    export const NORTH_POLE = 1800
    //% block="south pole"
    //% subcategory="Hall sensor"
    export const SOUTH_POLE = 2400

    /**
     * returns if magnetic field was detected
     */
    //% block="hall sensor magnetic field"
    //% subcategory="Hall sensor"
    //% weight=100
    export function hallSensorGetMagneticField() {
      let value = adcReadValue(4)
      if (value < 1800) return NORTH_POLE
      else if (value > 2400 ) return SOUTH_POLE
      else return 0
    } 
}