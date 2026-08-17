namespace JoyPiAdvanced {

  const ADCPIN = DigitalPin.P16;
  const SYSTEM_STATUS = 0x00;
  const READ_CMD = 0x10;
  const WRITE_CMD = 0x8;
  const CHANNEL_SEL = 0x11;
  const PIN_CFG = 0x5;
  const SEQUENCE_CFG = 0x10;
  const DATA_CFG = 0x2;
  
  function setup(): void {
      pins.spiFrequency(100000);
      pins.spiFormat(8, 0);
      let data = readRegister(SEQUENCE_CFG);
      writeRegister(SEQUENCE_CFG, data & 0xFC);
      writeRegister(PIN_CFG, 0x00);
      writeRegister(SEQUENCE_CFG, 0x00);
  }
  
  function readRegister(reg: number): number {
      let writeBuffer = pins.createBuffer(3);
      let receiveBuffer = pins.createBuffer(1);
      writeBuffer[0] = READ_CMD;
      writeBuffer[1] = reg;
      writeBuffer[2] = 0x00;
      
      pins.digitalWritePin(ADCPIN, 0);
      pins.spiTransfer(writeBuffer, null);
  
      pins.digitalWritePin(ADCPIN, 1);
      control.waitMicros(40);
      pins.digitalWritePin(ADCPIN, 0);
  
      let returnValue = pins.spiWrite(0x00);
      pins.digitalWritePin(ADCPIN, 1);
      control.waitMicros(40);
      return returnValue;
  }
  
  function writeRegister(reg: number, data: number) {
      let writeBuffer = pins.createBuffer(3);
      writeBuffer[0] = WRITE_CMD;
      writeBuffer[1] = reg;
      writeBuffer[2] = data;
  
      pins.digitalWritePin(ADCPIN, 0);
      pins.spiTransfer(writeBuffer, null);
      pins.digitalWritePin(ADCPIN, 1);
      control.waitMicros(40);
  }
  
  function read(channel: number): number {
      // Select channel
      writeRegister(CHANNEL_SEL, channel);
  
      // write empty bytes
      let writeBuffer = pins.createBuffer(2);
      writeBuffer[0] = 0x00;
      writeBuffer[1] = 0x00;
      pins.digitalWritePin(ADCPIN, 0);
      pins.spiTransfer(writeBuffer, null);
      pins.digitalWritePin(ADCPIN, 1);
  
      // read by writing 2 empty bytes
      pins.digitalWritePin(ADCPIN, 0);
      let dataOne = pins.spiWrite(0x00);
      let dataTwo = pins.spiWrite(0x00);
      pins.digitalWritePin(ADCPIN, 1);
      let response = (((dataOne << 8) | dataTwo) >> 4);
      return response;
  }
    
  
    /**
     * Reads the value of the analog digital converter on a specified channel
     * @param channel specifies the channel which is supposed to be read
     */
    //% block="ADC value on channel %channel"
    //% subcategory="Analog-Digital Converter"
    //% channel.min=0 channel.max=7
    //% weight=100
    export function adcReadValue(channel: number): number {
      setup()
      return read(channel)
    }
  
    /**
     * Reads a channel on the analog digital converter and converts the value to a voltage number
     * @param channel specifies the channel which is supposed to be read
     */
    //% block="ADC voltage on channel %channel"
    //% subcategory="Analog-Digital Converter"
    //% channel.min=0 channel.max=7
    //% weight=90
    export function adcReadVoltage(channel: number, value?: number): number {
        if (value == undefined){
            value = adcReadValue(channel)
      }
        return (value * 5.00/4096.0)
    }
  
  }