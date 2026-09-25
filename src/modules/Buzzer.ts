namespace JoyPiAdvanced {
  const buzzerPin = AnalogPin.P7

  function scale(input: number, inMin: number, inMax: number, outMin: number, outMax: number) {
      return (input - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  /**
   * Turns on the buzzer with a selectable frequency
   * @param frequency The frequency can be set from 100 (low pitch) to 20000 (high pitch)
   */
  //% block="turn buzzer on with frequency %frequency"
  //% subcategory="Buzzer"
  //% weight=100
  //% frequency.min=100 frequency.max=20000 frequency.defl=100
  export function buzzerOn(frequency: number): void {
    led.enable(false)
    if (frequency <= 0){
        pins.analogWritePin(buzzerPin, 0)
        return
    }
    let period = 1000000 / frequency
    pins.analogSetPeriod(buzzerPin, period)
    pins.analogWritePin(buzzerPin, 512)
  }

  /**
   * Turns the buzzer off
   */
  //% block="turn buzzer off"
  //% subcategory="Buzzer"
  //% weight=90
  export function buzzerOff(): void {
    pins.analogWritePin(buzzerPin, 0)
  }

}