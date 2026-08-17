namespace JoyPiAdvanced {
  const relayPin = DigitalPin.P1
  /**
   * Turn relay on
   */
  //% block="turn relay on"
  //% subcategory="Relay"
  //% weight=100
  export function relayOn(){
    pins.digitalWritePin(relayPin, 0)
  }

  /**
   * Turn relay off
   */
  //% block="turn relay off"
  //% subcategory="Relay"
  //% weight=90
  export function relayOff(){
    pins.digitalWritePin(relayPin, 1)
  }
}
