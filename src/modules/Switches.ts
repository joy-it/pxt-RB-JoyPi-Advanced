enum JoyPiAdvancedSWSeelection {
  //% block="Switch1"
  switch1,
  //%block="Switch2"
  switch2,
  //%block="Switch3"
  switch3,
  //%block="Switch4"
  switch4,
  //%block="Switch5"
  switch5
}

namespace JoyPiAdvanced {
    const sw1 = DigitalPin.P2
    const sw2 = DigitalPin.P3
    const sw3 = DigitalPin.P4
    const sw4 = DigitalPin.P5
    const sw5 = DigitalPin.P6
  
    /**
     * Checks the current state of a switch. True means that the switch is set to ON. False means that the switch is set to OFF.
     * @param JoyPiSwitch The switch which is supposed to be checked
     */
    //% block="check switch %switch"
    //% subcategory="Switches"
    //% weight=100
    export function switchCheck(JoyPiSwitch: JoyPiAdvancedSWSeelection): boolean {
      let selection  
  
      if(JoyPiSwitch == JoyPiAdvancedSWSeelection.switch1) {
        selection = sw1
      }
      else if(JoyPiSwitch == JoyPiAdvancedSWSeelection.switch2) {
        selection = sw2
        led.enable(false)
      }
      else if(JoyPiSwitch == JoyPiAdvancedSWSeelection.switch3) {
        selection = sw3
        led.enable(false)
      }
      else if(JoyPiSwitch == JoyPiAdvancedSWSeelection.switch4) {
        selection = sw4
      }
      else if(JoyPiSwitch == JoyPiAdvancedSWSeelection.switch5) {
        selection = sw5
        led.enable(false)
      }

      pins.setPull(selection, PinPullMode.PullDown)
  
      if(pins.digitalReadPin(selection)){
        return true
      }
      else {
        return false
      }
  
    }
  }