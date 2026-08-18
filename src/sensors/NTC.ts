namespace JoyPiAdvanced {

    /**
     * Measures voltage of NTC
     */
    //% block="raw voltage of NTC"
    //% subcategory="NTC"
    //% weight=90
    export function ntcGetRawVoltage(): number {
      return adcReadVoltage(2)
    }
  
    /**
     * calculate temperature with NTC
     * @param raw_value read voltage from NTC
     */
    //% block="calculate temperature of NTC with %raw_value"
    //% subcategory="NTC"
    //% weight=100
    export function ntcGetTemperature(raw_value:number) {
        let temperature = ((raw_value / 5.0) * 10000) / (1 - (raw_value / 5.0))
        temperature = 1 / ((1 / 298.15) + (1 / 3950.0) * Math.log(temperature / 10000))
        temperature = temperature - 273.15
        temperature = Math.round(temperature * 100) / 100
        return temperature
    }
  }