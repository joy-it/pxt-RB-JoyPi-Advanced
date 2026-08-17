enum JoyPiAdvancedMovement {
  //% block="movement"
  movement = 2,
  //% block="no movement"
  no_movement = 4
}

namespace JoyPiAdvanced {
  const pirPin = DigitalPin.P6;
  let pir_initiliazed = false
  let pir_movement_handler: () => void = null
  let pir_no_movement_handler: () => void = null
  let pir_movement_state = false


  function pirHandler(){
    if (!pir_initiliazed) return
    if (pins.digitalReadPin(pirPin)) {
      pir_movement_state = true
      if (pir_movement_handler) pir_movement_handler()
    }
    else {
      pir_movement_state = false
      if (pir_no_movement_handler) pir_no_movement_handler()
    }
  }

  /**
    * initialize PIR sensor
    */
  //% block="initialize PIR"
  //% subcategory="PIR Sensor"
  //% weight=100
  export function initializePIR(){
    if (pir_initiliazed) return
    // Disable LED Pin 6 to enable use for PIR sensor
    led.enable(false)
    pins.setEvents(pirPin, PinEventType.Edge)
    control.onEvent(
        DAL.MICROBIT_ID_IO_P6,
        DAL.MICROBIT_PIN_EVT_RISE,
        pirHandler
    )
    control.onEvent(
        DAL.MICROBIT_ID_IO_P6,
        DAL.MICROBIT_PIN_EVT_FALL,
        pirHandler
    )
    pir_initiliazed = true
  }

  /**
    * deinitialize PIR sensor
    */
  //% block="deinitialize PIR"
  //% subcategory="PIR Sensor"
  //% weight=95
  export function deinitializePIR(){
    if (!pir_initiliazed) return
    pins.setEvents(pirPin, PinEventType.None)
    pir_initiliazed = false
  }

  /**
   * Returns the current state of the PIR sensor. True means that a motion is detected. False means that no motion is detected.
   */
  //% block="PIR recognized movement"
  //% subcategory="PIR Sensor"
  //% weight=90
  export function pirCheckMotion(){
    if (!pir_initiliazed) initializePIR()
    // Check for pir_state
    return pir_movement_state
  }

  /**
   * Event that is executed as soon as the state of PIR changes
   */
  //% block="When PIR recognizes %mode"
  //% subcategory="PIR Sensor"
  //% weight=90
  export function pirMovementRecognized(mode: JoyPiAdvancedMovement, handler: () => void) {
    if (mode == JoyPiAdvancedMovement.movement) pir_movement_handler = handler
    else if (mode == JoyPiAdvancedMovement.no_movement) pir_no_movement_handler = handler
  }

}
