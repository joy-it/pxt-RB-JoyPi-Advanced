namespace JoyPiAdvanced {
    const i2c_address = 0x21;
    let Backlight: number;
    let RegisterSelect: number;

    function write(data: number) {
        let enabled_value = data | 0x04;
        let send = pins.createBuffer(4);

        send.setNumber(NumberFormat.Int8LE, 0, 0x09);
        send.setNumber(NumberFormat.Int8LE, 1, enabled_value);
        send.setNumber(NumberFormat.Int8LE, 2, data);
        pins.i2cWriteBuffer(i2c_address, send, false);
    }

    function set(data: number) {
        data = (data & 0xF0) >> 1;
        data = data | Backlight | RegisterSelect;
        write(data);
    }

    function command(data: number) {
        RegisterSelect = 0x00;
        set(data);
        set(data << 4);
    }

    function send_data(data: number) {
        RegisterSelect = 0x02;
        set(data);
        set(data << 4);
    }

    /**
     * Initializes the 16x2 LCD display
     */
    //% block="initialize 16x2LCD"
    //% subcategory="LCD16x2"
    //% weight=100
    export function lcd16x2Init() {
        Backlight = 0x80;
        RegisterSelect = 0x00;

        let buffer = pins.createBuffer(2);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xFF);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x06);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x00);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xFD);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xF9);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xF1);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xE1);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0xC1);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x81);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x00);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x01);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        buffer.setNumber(NumberFormat.Int8LE, 0, 0x09);
        buffer.setNumber(NumberFormat.Int8LE, 1, 0x00);
        pins.i2cWriteBuffer(i2c_address, buffer, false);
        basic.pause(1);

        command(0x33);
        command(0x32);
        command(0x0C);
        command(0x28);
        command(0x06);
        lcd16x2Clear();
    }


    /**
     * Shows a text on the 16x2 display
     * @param text The text that is supposed to be displayed
     * @param x The x position on the display from 0 (most left position) to 15 (most right position)
     * @param y The y position on the display from 0 (upper line) to 1 (lower line)
     */
    //% block="show String %s|at x %x|y %y on 16x2LCD"
    //% subcategory="LCD16x2"
    //% weight=90
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function lcd16x2ShowText(text: string, x: number, y: number): void {
        let a: number;

        if (y > 0) {
            pause(1)
            a = 0xC0;
        }
        else {
            pause(1)
            a = 0x80;
        }
        a += x;
        command(a);

        for (let i = 0; i < text.length; i++) {
            send_data(text.charCodeAt(i));
        }
    }

    /**
     * Clears all outputs on the 16x2 LCD display
     */
    //% block="clear 16x2LCD"
    //% subcategory="LCD16x2"
    //% weight=85
    export function lcd16x2Clear(): void {
        command(0x01);
    }

    /**
     * Shifts the current position to the left by 1 position
     */
    //% block="shift left on 16x2LCD"
    //% weight=61
    //% subcategory="LCD16x2"
    export function lcd16x2ShiftLeft(): void {
        command(0x18);
    }

    /**
     * Shifts the current position to the right by 1 position
     */
    //% block="shift right on 16x2LCD"
    //% weight=60
    //% subcategory="LCD16x2"
    export function lcd16x2ShiftRight(): void {
        command(0x1C);
    }

    /**
     * Shows the cursor on its current position
     */
    //% block="show cursor on 16x2LCD"
    //% weight=50
    //% subcategory="LCD16x2"
    export function lcd16x2ShowCursor(): void {
        command(0x0E);
    }

    /**
     * Activates the blinking cursor
     */
    //% block="blinking Cursor on 16x2LCD"
    //% weight=40
    //% subcategory="LCD16x2"
    export function lcd16x2BlinkingCursor(): void {
        command(0x0F);
    }

    /**
     * Hides the cursor on its current position
     */
    //% block="hide cursor on 16x2LCD"
    //% weight=30
    //% subcategory="LCD16x2"
    export function lcd16x2HideCursor(): void {
        command(0x0C);
    }

    /**
     * Resets the cursor to its default position
     */
    //% block="set cursor back on 16x2LCD"
    //% weight=20
    //% subcategory="LCD16x2"
    export function lcd16x2ReturnHome(): void {
        command(0x02);
    }

    /**
     * Turn the display off
     */
    //% block="turn off 16x2 LCD"
    //% weight=19
    //% subcategory="LCD16x2"
    export function lcd16x2TurnOff(): void {
        lcd16x2BacklightOff();
        command(0x00);
    }

    /**
 * Turn the display on
 */
    //% block="turn on 16x2 LCD"
    //% weight=19
    //% subcategory="LCD16x2"
    export function lcd16x2TurnOn(): void {
        lcd16x2BacklightOn();
        command(0x0C);
        command(0x06);
    }

    /**
 * Turn the display off
 */
    //% block="turn off 16x2 LCD backlight"
    //% weight=18
    //% subcategory="LCD16x2"
    export function lcd16x2BacklightOff(): void {
        Backlight = 0x00;
        set(0);
    }

    /**
 * Turn the backlight on
 */
    //% block="turn on 16x2 LCD backlight"
    //% weight=17
    //% subcategory="LCD16x2"
    export function lcd16x2BacklightOn(): void {
        Backlight = 0x80
        set(0);
    }
}