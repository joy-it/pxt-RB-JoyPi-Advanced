namespace JoyPiAdvanced {
    const touchSensorAddr = 0x5A
  
    function convertToBinary(decimal: number) {
      let binary: number[] = []
  
      let num = decimal;
      let binaryString = (num % 2).toString();
      for (; num > 1; ) {
          num = parseInt((num / 2).toString());
          binaryString =  (num % 2) + (binaryString);
      }
  
      // Convert string to binary array
      for(let i = (binaryString.length - 1) ; i >= 0; i--) {
        let integer = parseInt(binaryString.charAt(i))
        binary.unshift(integer)
      }
  
      // Fill remaining array space with 0
      let loops = (6 - binary.length)
      for(let i = 0 ; i < loops ; i++){
        binary.unshift(0)
      }
  
      return binary
  
    }
  
  
    /**
     * Initializes the touch sensor
     */
    //% block="initialize touch sensor"
    //% subcategory="Touch sensor"
    //% weight=100
    export function touchsensorInit(): void {
      pins.i2cWriteNumber(touchSensorAddr, 0x8063, NumberFormat.UInt16BE)
      basic.pause(1)
      pins.i2cWriteNumber(touchSensorAddr, 0x5E00, NumberFormat.UInt16BE)
      let regval: number[] = [0x4106, 0x420C, 0x4306, 0x440C, 0x4506, 0x460C, 0x4706, 0x480C,
      0x4906, 0x4A0C, 0x4B06, 0x4C0C, 0x4D06, 0x4E0C, 0x4F06, 0x500C, 0x5106, 0x520C, 0x5306,
      0x540C, 0x5506, 0x560C, 0x5706, 0x580C, 0x2B01, 0x2C01, 0x2D0E, 0x2E00, 0x2F01, 0x3005,
      0x3101, 0x3200, 0x3300, 0x3400, 0x3500, 0x5B00, 0x5C10, 0x5D20, 0x5E8F]
  
      for (let i = 0 ; i < regval.length ; i++) {
        pins.i2cWriteNumber(touchSensorAddr, regval[i], NumberFormat.UInt16BE)
      }
    }
  
    /**
     * Checks the current state of the touch sensor. True means that the touch sensor is triggered. False means that the touch sensor is not triggered.
     * @param sensorSelection The sensor that is supposed to be checked from 1 (upper sensor) to 6 (lower sensor)
     */
    //% block="check touch sensor %sensorSelection"
    //% subcategory="Touch sensor"
    //% sensorSelection.min=1 sensorSelection.max=6
    //% weight=90
    export function touchSensorCheck(sensorSelection: number) {
      pins.i2cWriteNumber(touchSensorAddr, 0x0000, NumberFormat.UInt8BE)
      let sensorStates = convertToBinary(pins.i2cReadNumber(touchSensorAddr, NumberFormat.UInt8BE))
      if(sensorStates[6 - sensorSelection]){
          return true
      }
      else {
          return false
      }
    }
  
  
  }
  