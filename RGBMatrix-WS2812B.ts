namespace JoyPiAdvanced {
    const RGBMATRIX_PIN= DigitalPin.P8
    const RGBMATRIX_ADDRESS = 0x66

    const RGBMATRIX_COUNT = 64
    const RGBMATRIX_WIDTH = 8
    const RGBMATRIX_HEIGHT = 8

    enum RGBMatrixCommunicationSelect { 
        pin, 
        i2c 
    }
    enum RGBMatrixFunction {
        SHOW = 0,
        SET_PIXEL_COLOR = 1,
        FILL = 2,
        SET_BRIGHTNESS = 3,
        GAMMA8 = 4,
        GAMMA32 = 5,
        NUM_PIXEL = 6,
        COLOR_HSV = 7,
        CLEAR = 8,
        SEND_DATA_TO_SHOW = 9,
        SEND_ALL_PIXEL_RGB_0 = 10,
        SEND_ALL_PIXEL_RGB_1 = 11,
        SEND_ALL_PIXEL_RGB_2 = 12,
        SEND_ALL_PIXEL_RGB_3 = 13,
        SEND_ALL_PIXEL_RGB_4 = 14,
        SEND_ALL_PIXEL_RGB_5 = 15
    }

    let rgbMatrixCommunication = RGBMatrixCommunicationSelect.pin
    let rgbMatrixBrightness = 128
    let rgbmatrix_initiliazed = false
    let rgbMatrixBuffer: Buffer = pins.createBuffer(3 * RGBMATRIX_COUNT)

    // Returns the physical pixel position
    // Pixels are mapped row by row
    function rgbMatrixGetPosition(x: number, y: number){
        return y * RGBMATRIX_WIDTH + x
    }

    // writes one RGB value into local buffer, uses GRB-order
    function rgbMatrixWriteBuffer(position: number, red: number, green: number, blue: number){
        const offset = position * 3
        rgbMatrixBuffer[offset] = green
        rgbMatrixBuffer[offset + 1] = red
        rgbMatrixBuffer[offset + 2] = blue
    }

    // Applies the software brightness used in direct-pin mode
    function rgbMatrixSetBrightnessPin(value: number){
        return (value * rgbMatrixBrightness) >> 8
    }

    /**
    * Sends a command packet to the RGB matrix controller via I2C
    *  0: command
    *  1: payload length = 0x0C
    *  2: function
    *  3: position
    *  4: red
    *  5: green
    *  6: blue
    *  7: white
    *  8: additional control value
    *  9: brightness
    * 10: first pixel
    * 11: pixel count
    * 12: data0 block
    * 13: data1 block
    */
    function rgbMatrixI2CSend(func: RGBMatrixFunction, position: number = 0, red: number = 0, green: number = 0, blue: number = 0, 
    white: number = 0, control: number = 0, brightness: number = 0, first: number = 0, count: number = 0, data0: number = 0, data1: number = 0){
        const command = pins.createBuffer(14)
        command[0] = 0x00
        command[1] = 0x0C
        command[2] = func
        command[3] = position
        command[4] = red
        command[5] = green
        command[6] = blue
        command[7] = white
        command[8] = control
        command[9] = brightness
        command[10] = first
        command[11] = count
        command[12] = data0
        command[13] = data1
        pins.i2cWriteBuffer(RGBMATRIX_ADDRESS, command, false)
        basic.pause(3)
    }

    // Transfers the current image to the matrix
    function rgbMatrixShow() {
        if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) rgbMatrixI2CSend(RGBMatrixFunction.SHOW)
        else ws2812b.sendBuffer(rgbMatrixBuffer, RGBMATRIX_PIN)
    }

    // check which kind of communication is necessary for RGB matrix
    function rgbMatrixCheckCommunication() {
        checkAdvancedRevision()
        if (getAdvancedRevision() == JoyPiAdvancedRevision.rev2_0) rgbMatrixCommunication = RGBMatrixCommunicationSelect.i2c
        else rgbMatrixCommunication = RGBMatrixCommunicationSelect.pin
    }
   

    /**
     * Initialize RGB matrix
     */
    //% block="initialize RGB matrix"
    //% subcategory="RGB Matrix"
    //% weight=100
    //% brightness.min=0 brightness.max=255
    export function initializeRGBMatrix(){
        if (rgbmatrix_initiliazed) return
        rgbMatrixCheckCommunication()
        if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) rgbMatrixI2CSend(RGBMatrixFunction.SET_BRIGHTNESS, 0, 0, 0, 0, 0, 0, rgbMatrixBrightness)
        else {
            pins.digitalWritePin(RGBMATRIX_PIN, 0)
            rgbMatrixBuffer.fill(0)
            rgbMatrixShow()
        }
        rgbmatrix_initiliazed = true
    }

    /**
     * Set brightness of RGB Matrix
     * @param brightness value from 0 (no brightness) to 255 (full brightness)
     */
    //% block="set brightness of RGB Matrix to %brightness"
    //% subcategory="RGB Matrix"
    //% weight = 95
    //% brightness.min=0 brightness.max=255
    export function rgbMatrixSetBrightness(brightness: number){
        if (!rgbmatrix_initiliazed) initializeRGBMatrix()
        rgbMatrixBrightness = brightness
        if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) {
            rgbMatrixI2CSend(RGBMatrixFunction.SET_BRIGHTNESS, 0, 0, 0, 0, 0, 0, rgbMatrixBrightness)
        }
        rgbMatrixShow()
    }
    /**
     * Sets the whole RGB matrix to a specific color
     * @param red Red value from 0 (no brightness of the red base color) to 255 (full brightness of the red base color)
     * @param green Green value from 0 (no brightness of the green base color) to 255 (full brightness of the green base color)
     * @param blue Blue value from 0 (no brightness of the blue base color) to 255 (full brightness of the blue base color)
     */
    //% block="fill RGB Matrix with color Red: %red Green: %green Blue: %blue"
    //% subcategory="RGB Matrix"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% weight=85
    export function rgbMatrixShowColor(red: number, green: number, blue: number) {
        if (!rgbmatrix_initiliazed) initializeRGBMatrix()
        if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) rgbMatrixI2CSend(RGBMatrixFunction.FILL, 0, red, green, blue, 0, 0, 0, 0, RGBMATRIX_COUNT)
        else{
            red = rgbMatrixSetBrightnessPin(red)
            green = rgbMatrixSetBrightnessPin(green)
            blue = rgbMatrixSetBrightnessPin(blue)
            for (let position = 0; position < RGBMATRIX_COUNT; position++) {
                rgbMatrixWriteBuffer(position, red, green, blue)
            }
        }
        rgbMatrixShow()
    }

    /**
     * Sets a single pixel to a specific color
     * @param x X position on the matrix
     * @param y Y position on the matrix
     * @param red Red value from 0 (no brightness of the red base color) to 255 (full brightness of the red base color)
     * @param green Green value from 0 (no brightness of the green base color) to 255 (full brightness of the green base color)
     * @param blue Blue value from 0 (no brightness of the blue base color) to 255 (full brightness of the blue base color)
     */
    //% block="set single pixel on RGB matrix on position x: %x y: %y to color: Red: %red Green: %green Blue: %blue"
    //% subcategory="RGB Matrix"
    //% weight=80
    //% x.min=0 x.max=7
    //% y.min=0 y.max=7
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function rgbMatrixSetPixel(x: number, y: number, red: number, green: number, blue: number) {
        if (!rgbmatrix_initiliazed) initializeRGBMatrix()
        const position = rgbMatrixGetPosition(x, y)
        if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) rgbMatrixI2CSend(RGBMatrixFunction.SET_PIXEL_COLOR, position, red, green, blue)
        else{
            red = rgbMatrixSetBrightnessPin(red)
            green = rgbMatrixSetBrightnessPin(green)
            blue = rgbMatrixSetBrightnessPin(blue)
            rgbMatrixWriteBuffer(position, red, green, blue)
        }
        rgbMatrixShow()
    }

    /**
     * Clears all outputs on the RGB martrix
     */
    //% block="clear RGB matrix"
    //% subcategory="RGB Matrix"
    //% weight=90
    export function rgbMatrixClear() {
        if (!rgbmatrix_initiliazed) initializeRGBMatrix()
        if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) rgbMatrixI2CSend(RGBMatrixFunction.CLEAR)
        else rgbMatrixBuffer.fill(0)
        rgbMatrixShow()
    }

    // converts a wheel position from 0 to 255 into RGB values
    function rgbMatrixWheel(position: number){
        position = 255 - (position & 255)
        if (position < 85) return [255 - position * 3, 0, position * 3]
        if (position < 170){
            position -= 85
            return [0, position * 3, 255 - position * 3]
        }
        position -= 170
        return [position * 3, 255 - position * 3, 0]
    }

    /**
    * Activates a rainbow cycle on the RGB matrix
    */
    //% block="activate RGB matrix rainbow mode"
    //% subcategory="RGB Matrix"
    //% weight=60
    export function rgbMatrixRainbow(): void {
        if (!rgbmatrix_initiliazed) initializeRGBMatrix()
        for (let offset = 0; offset < 256; offset += 4){
            if (rgbMatrixCommunication == RGBMatrixCommunicationSelect.i2c) {
                for (let position = 0; position < RGBMATRIX_COUNT; position++){
                    const colour = rgbMatrixWheel(position * 4 + offset)
                    rgbMatrixI2CSend(RGBMatrixFunction.SET_PIXEL_COLOR, position, colour[0], colour[1], colour[2])
                }
            }
            else{
                for (let position = 0; position < RGBMATRIX_COUNT; position++) {
                    const colour = rgbMatrixWheel(position * 4 + offset)
                    rgbMatrixWriteBuffer(position, rgbMatrixSetBrightnessPin(colour[0]), rgbMatrixSetBrightnessPin(colour[1]), rgbMatrixSetBrightnessPin(colour[2]))
                }
            }
            rgbMatrixShow()
            basic.pause(20)
        }
    }
}