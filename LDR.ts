namespace JoyPiAdvanced {
    const U1 = 5
    const R2 = 10000
    
    /**
     * Measures the ambient light with the LDR sensor. The return value is the measured voltage. A higher value means a higher light intensity.
     */
    //% block="read voltage from LDR"
    //% subcategory="LDR"
    //% weight=100
    export function ldrGetRawVoltage(): number {
        return adcReadVoltage(5)
    }

    /**
     * Calculates lux value from raw voltage value
     */
    //% block="calculate lux with %U2"
    //% subcategory="LDR"
    //% weight=90
    export function ldrGetLux(U2: number) {
        let lux = 0
        if (U2 != 0){
            let R1 = (U1 * R2) / U2
            let I = (U1 / R1) * 1000000
            lux = Math.round((Math.log(I) / 0.06) * 100) / 100
        }
        return lux
    }
}