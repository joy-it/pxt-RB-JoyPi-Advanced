namespace JoyPiAdvanced {
    const shockSensorPin = DigitalPin.P10
    let shockSensor_initialized = false
    let shockSensor_state = false
    let shock_recognized_handler: () => void = null
    let shock_last_recognized = input.runningTime()
  
    function shockSensorHandler(){
        if (!shockSensor_initialized) return
        let currentTime = input.runningTime()
        if (currentTime - shock_last_recognized >= 500) {
            shock_last_recognized = currentTime
            shockSensor_state = true
            if (shock_recognized_handler) shock_recognized_handler()
        }
        else shockSensor_state = false
    }

    /**
     * Initialize shock sensor
     */
    //% block="initialize shock sensor"
    //% subcategory="Shock sensor"
    //% weight=100
    export function initializeShockSensor(){
        if (shockSensor_initialized) return
        led.enable(false)
        pins.setEvents(shockSensorPin, PinEventType.Edge)
        control.onEvent(
            DAL.MICROBIT_ID_IO_P10,
            DAL.MICROBIT_PIN_EVT_RISE,
            shockSensorHandler
        )
        control.onEvent(
            DAL.MICROBIT_ID_IO_P10,
            DAL.MICROBIT_PIN_EVT_FALL,
            shockSensorHandler
        )
        shockSensor_initialized = true
    }

    /**
     * Deinitialize shock sensor
     */
    //% block="deinitialize shock sensor"
    //% subcategory="Shock sensor"
    //% weight=10
    export function deinitializeShockSensor(){
        if (!shockSensor_initialized) return
        pins.setEvents(shockSensorPin, PinEventType.None)
        shockSensor_initialized = false
    }

    /**
     * Reads the current state of the shock sensor. True means that a shock was recognized. False means that no shock was recognized.
     */
    //% block="shock recognized"
    //% subcategory="Shock sensor"
    //% weight=80
    export function shockSensorGetState(): boolean {
      return shockSensor_state
    }

    /**
     * Event that is executed as soon as a shock is recognized
     */
    //% block="When a shock was recognized"
    //% subcategory="Shock sensor"
    //% weight=90
    export function shockSensorWhenShock(handler: () => void){
        shock_recognized_handler = handler
    }
  }