namespace JoyPiAdvanced {
    let soundSensorPin = DigitalPin.P9
    let soundSensor_initialized = false
    let soundSensor_state = false
    let sound_recognized_handler: () => void = null
    let sound_last_recognized = input.runningTime()
  
    function soundSensorCheckRevision(){
        checkAdvancedRevision()
        if (getAdvancedRevision() == JoyPiAdvancedRevision.rev2_0) soundSensorPin = DigitalPin.P5
        else soundSensorPin = DigitalPin.P9
    }

    function soundSensorHandler() {
        if (!soundSensor_initialized) return
        let currentTime = input.runningTime()
        if (currentTime - sound_last_recognized >= 500) {
            sound_last_recognized = currentTime
            soundSensor_state = true
            if (sound_recognized_handler) sound_recognized_handler()
        }
        else soundSensor_state = false
    }

    /**
     * Initialize sound sensor
     */
    //% block="initialize sound sensor"
    //% subcategory="Sound sensor"
    //% weight=100
    export function initializeSoundSensor() {
        if (soundSensor_initialized) return
        led.enable(false)
        soundSensorCheckRevision()
        pins.setEvents(soundSensorPin, PinEventType.Edge)
        if (getAdvancedRevision() == JoyPiAdvancedRevision.rev2_0) {
            control.onEvent(
                DAL.MICROBIT_ID_IO_P5,
                DAL.MICROBIT_PIN_EVT_RISE,
                soundSensorHandler
            )
            control.onEvent(
                DAL.MICROBIT_ID_IO_P5,
                DAL.MICROBIT_PIN_EVT_FALL,
                soundSensorHandler
            )
        }
        else{
            control.onEvent(
                DAL.MICROBIT_ID_IO_P9,
                DAL.MICROBIT_PIN_EVT_RISE,
                soundSensorHandler
            )
            control.onEvent(
                DAL.MICROBIT_ID_IO_P9,
                DAL.MICROBIT_PIN_EVT_FALL,
                soundSensorHandler
            )
        }
        soundSensor_initialized = true
    }

    /**
     * Deinitialize sound sensor
     */
    //% block="deinitialize sound sensor"
    //% subcategory="Sound sensor"
    //% weight=10
    export function deinitializeSoundSensor() {
        if (!soundSensor_initialized) return
        pins.setEvents(soundSensorPin, PinEventType.None)
        soundSensor_initialized = false
    }

    /**
     * Checks the current state of the sound sensor. True means that a sound was detected. False means that no sound was detected.
     */
    //% block="sound recognized"
    //% subcategory="Sound sensor"
    //% weight=80
    export function soundSensorGetState(): boolean {
        return soundSensor_state
    }
    
    /**
     * Event that is executed as soon as a sound is recognized
     */
    //% block="When a sound was recognized"
    //% subcategory="Sound sensor"
    //% weight=90
    export function soundSensorWhenSound(handler: () => void) {
        sound_recognized_handler = handler
    }
  }