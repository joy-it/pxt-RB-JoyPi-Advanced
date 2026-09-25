namespace JoyPiAdvanced {
    const pwmfanPin = AnalogPin.P7
    let fan_initialized = false

    /**
     * initialize PWM fan
     */
    //% block="initialize pwm fan"
    //% subcategory="PWM Fan"
    //% weight=100
    export function initializePWMFan(){
        if (fan_initialized) return
        led.enable(false)
        fan_initialized = true
    }
    /**
     * Sets the speed of the PWM fan. Please note that the PWM fan needs to be in PWM mode.
     * @param speed The speed in percentage from 0 (off) to 100 (full speed)
     */
    //% block="set fan speed to %speed"
    //% subcategory="PWM Fan"
    //% weight=90
    //% speed.min=0 speed.max=100
    export function pwmFanSetSpeed(speed: number): void {
        if (!fan_initialized) initializePWMFan()
        // Map speed from percentage range to pwm range
        let output = pins.map(speed, 0, 100, 0, 1023)
        pins.analogWritePin(pwmfanPin, output)
    }
  }