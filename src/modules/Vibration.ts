namespace JoyPiAdvanced {
    const vibrationPin = DigitalPin.P16
  
    /**
     * Turns the vibration motor off
     */
    //% block="turn vibration off"
    //% subcategory="Vibration motor"
    //% weight=100
    export function vibrationOff(){
      led.enable(false)
      pins.digitalWritePin(vibrationPin, 0)
    }
  
    /**
     * Turns the vibration motor on
     */
    //% block="turn vibration on"
    //% subcategory="Vibration motor"
    //% weight=90
    export function vibrationOn(){
      led.enable(false)
      pins.digitalWritePin(vibrationPin, 1)
    }
  
  }
  