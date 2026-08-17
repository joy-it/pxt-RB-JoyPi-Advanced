namespace JoyPiAdvanced {

   /**
    * Measures the current state of the potentiometer as a digital value. A higher value means that the potentiometer is positioned further to the right
    */
    //% block="potentiometer value"
    //% subcategory="Potentiometer"
    //% weight=100
    export function potentiometerGetValue(): number {
      return adcReadValue(3)
    }
  }