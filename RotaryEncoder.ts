enum JoyPiAdvancedDirection {
    //% block="Right"
    clockwise = 2,
    //% block="Left"
    counterclockwise = 4
}

namespace JoyPiAdvanced {
    const encoder_dt = DigitalPin.P2;
    const encoder_clk = DigitalPin.P3;
    const encoder_button = DigitalPin.P4;
    const rotaryEncoderID = 3100;
    const encoder_steps_per_detent = 4;
    let encoder_gray_code: { [key: number]: number } = {
        1: -1, // 0b0001: 00 -> 01
        7: -1, // 0b0111: 01 -> 11
        14: -1, // 0b1110: 11 -> 10
        8: -1, // 0b1000: 10 -> 00

        2: 1, // 0b0010: 00 -> 10
        11: 1, // 0b1011: 10 -> 11
        13: 1, // 0b1101: 11 -> 01
        4: 1, // 0b0100: 01 -> 00
    }
    let encoder_initialized = false
    let encoder_steps = 0;
    let encoder_last_state = (pins.digitalReadPin(encoder_clk) << 1) | pins.digitalReadPin(encoder_dt)
    let encoder_button_handler: () => void = null
    let encoder_button_last_press = 0

    // Function to decide the direction in which the Encoder is being turned
    // is executed if clk or dt change state
    function rotaryEncoderRotation() {
        if (!encoder_initialized) return
        let new_state = (pins.digitalReadPin(encoder_clk) << 1) | pins.digitalReadPin(encoder_dt)
        let key = (encoder_last_state << 2) | new_state
        let delta = encoder_gray_code[key] || 0
        if (delta != 0) encoder_steps += delta
        if (encoder_steps >= encoder_steps_per_detent || encoder_steps <= -encoder_steps_per_detent){
            if (encoder_steps >= encoder_steps_per_detent) control.raiseEvent(rotaryEncoderID + JoyPiAdvancedDirection.clockwise, JoyPiAdvancedDirection.clockwise);
            else if (encoder_steps <= -encoder_steps_per_detent) control.raiseEvent(rotaryEncoderID + JoyPiAdvancedDirection.counterclockwise, JoyPiAdvancedDirection.counterclockwise);
            encoder_steps = 0
        }
        encoder_last_state = new_state
    }

    // Function which is executed when button is pressed
    function rotaryEncoderPressed(){
        if (!encoder_initialized) return
        let currentTime = input.runningTime()
        if (currentTime - encoder_button_last_press >= 200){
            encoder_button_last_press = currentTime
            encoder_button_handler()
        }
    }

    /** 
      * Initializes the rotary encoder
      */
    //% block="initialize Rotary Encoder"
    //% subcategory="Rotary Encoder"
    //% weight=100
    export function initializeRotaryEncoder() {
        if (encoder_initialized) return;
        led.enable(false)
        pins.setPull(encoder_clk, PinPullMode.PullUp);
        pins.setPull(encoder_dt, PinPullMode.PullUp);
        pins.setPull(encoder_button, PinPullMode.PullUp);
        pins.setEvents(encoder_clk, PinEventType.Edge)
        pins.setEvents(encoder_dt, PinEventType.Edge)
        pins.setEvents(encoder_button,PinEventType.Edge)
        control.onEvent(
            DAL.MICROBIT_ID_IO_P3,
            DAL.MICROBIT_PIN_EVT_RISE,
            rotaryEncoderRotation
        )
        control.onEvent(
            DAL.MICROBIT_ID_IO_P3,
            DAL.MICROBIT_PIN_EVT_FALL,
            rotaryEncoderRotation
        )
        control.onEvent(
            DAL.MICROBIT_ID_IO_P2,
            DAL.MICROBIT_PIN_EVT_RISE,
            rotaryEncoderRotation
        )
        control.onEvent(
            DAL.MICROBIT_ID_IO_P2,
            DAL.MICROBIT_PIN_EVT_FALL,
            rotaryEncoderRotation
        )
        control.onEvent(
            DAL.MICROBIT_ID_IO_P4,
            DAL.MICROBIT_PIN_EVT_FALL,
            rotaryEncoderPressed
        )
        encoder_initialized = true
    }

    /**
      * Deinitializes the rotary encoder
      */
    //% block="deinitialize Rotary Encoder"
    //% subcategory="Rotary Encoder"
    //% weight=10
    export function deinitializeRotaryEncoder(){
        if (!encoder_initialized) return
        pins.setEvents(encoder_clk, PinEventType.None)
        pins.setEvents(encoder_dt, PinEventType.None)
        pins.setEvents(encoder_button, PinEventType.None)
        encoder_initialized = false
    }

     /**
      * Event that is executed as soon as the rotary encoder is turned in the corresponding direction
      * @param JoyPiAdvancedDirection  Direction to be listened to
      */
    //% block="When Rotary Encoder turned in %direction direction"
    //% subcategory="Rotary Encoder"
    //% weight=100
    export function rotaryEncoderWhenTurned(direction: JoyPiAdvancedDirection , handler: () => void) {
        control.onEvent(rotaryEncoderID + direction, direction, handler);
    }

    /**
     * Event that is executed as soon as the rotary encoder is pressed
     */
    //% block="When Rotary Encoder pressed"
    //% subcategory="Rotary Encoder"
    //% weight=90
    export function rotaryEncoderWhenPressed(handler: () => void) {
        encoder_button_handler = handler
    }
}