/**
* Enumeration for On/Off state
*/
enum JoyPiAdvancedColon {
    //% block="On"
    on,
    //% block="Off"
    off
}

namespace JoyPiAdvanced {
    const segmentADDR = 0x70
    const segmentBlinkADDR = 0x80
    const segmentBlinkDisplayOn = 0x01
    const segmentCMDBrightness = 0xE0
    const blinkNum = 0
    const maxBrightness = 15

    interface map {
        [key: string]: number;
    }
    const charBits: map = {
        "-": 0b0000000001000000,
        "0": 0b0000000000111111,
        "1": 0b0000000000000110,
        "2": 0b0000000001011011,
        "3": 0b0000000001001111,
        "4": 0b0000000001100110,
        "5": 0b0000000001101101,
        "6": 0b0000000001111101,
        "7": 0b0000000000000111,
        "8": 0b0000000001111111,
        "9": 0b0000000001101111
    }

    /**
    * Initialize the 7-segment display
    */
    //% block="initialize 7-segment display"
    //% subcategory="7-Segment Display"
    //% weight=100
    export function segmentInit(){
        pins.i2cWriteNumber(segmentADDR, 0x21, NumberFormat.UInt8BE);

        segmentClear();
        
        // write to display
        let buffer = pins.createBuffer(9);
        buffer[0] = 0x00;
        let displaybuffer: Array<NumberFormat.UInt16BE> = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let p = i ^ 2;  //new mapped position
            buffer[(p << 1) | 1] = displaybuffer[i] & 0xFF;
            buffer[(p << 1) + 2] = displaybuffer[i] >> 8;
        }
        pins.i2cWriteBuffer(segmentADDR, buffer);

        // Set blinkrate
        let blinkBuffer = segmentBlinkADDR | segmentBlinkDisplayOn | (blinkNum << 1);
        pins.i2cWriteNumber(segmentADDR, blinkBuffer, NumberFormat.UInt8BE);

        // Set brightness
        let brightnessBuffer = segmentCMDBrightness | maxBrightness;
        pins.i2cWriteNumber(segmentADDR, brightnessBuffer, NumberFormat.UInt8BE);
    }

    /**
     * Write a number to the 7-segment display
     * @param number the number which is supposed to be displayed. Maximum of 4 digits is possible
     * @param JoyPiAdvancedColon whether the colon in the center of the display should be displayed or not
     */
    //% block="write number %number on 7-segment display with colon %JoyPiAdvancedColon"
    //% subcategory="7-Segment Display"
    //% weight=90
    export function segmentWriteNumber(number: number, colon: JoyPiAdvancedColon){
        let bufferArray: Array<NumberFormat.UInt16BE> = [];
        let valueString = number.toString();

        // Cut length of string
        if(number < 0){
            valueString = valueString.substr(0, 5);
        }
        else if(valueString.includes('.')) {
            valueString = valueString.substr(0, 5);
        }
        else {
            valueString = valueString.substr(0, 4);
        }

        // Translate chars to bits
        for(let i = 0 ; i < valueString.length ; i++){
            // activate dot
            if(valueString[i] == "."){
                bufferArray[i-1] =  bufferArray[i-1] | 0b0000000010000000;
            }
            else {
                bufferArray.push(charBits[valueString[i]]);
            }
        }

        // Map number bits to corresponding buffer slots
        let displayBuffer = pins.createBuffer(10);
        displayBuffer[1] = bufferArray[0];
        displayBuffer[3] = bufferArray[1];
        if(colon == JoyPiAdvancedColon.on){
            displayBuffer[5] = 0xFF;
        }
        displayBuffer[7] = bufferArray[2];
        displayBuffer[9] = bufferArray[3];

        pins.i2cWriteBuffer(segmentADDR, displayBuffer);

    }

    /**
    * Clear all outputs on the 7-segment display
    */
    //% block="clear 7-segment display"
    //% subcategory="7-Segment Display"
    //% weight=50
    export function segmentClear() {
        // Create empty buffer to erase all contents
        let displayBuffer = pins.createBuffer(10);
        for (let i = 0; i < displayBuffer.length; i++) {
            displayBuffer[i] = 0x00
        }
        pins.i2cWriteBuffer(segmentADDR, displayBuffer);
    }

  
  }