namespace JoyPiAdvanced {
    const RFIDPIN = DigitalPin.P16
    const TReloadRegL = 0x2D
    const TReloadRegH = 0x2E
    const TPrescalerReg = 0x2B
    const TModeReg = 0x2A
    const TxASKReg = 0x15
    const TxControlReg = 0x14
    const ModeReg = 0x11
    const PICC_READ = 0x30
    const PICC_ANTICOLL = 0x93
    const PCD_RESETPHASE = 0x0F
    const BLOCK_ADDRS: number[] = [8, 9, 10]
    const Status2Reg = 0x08
    const CommandReg = 0x01
    const BitFramingReg = 0x0D
    const PCD_AUTHENT = 0x0E
    const PCD_RECEIVE = 0x08
    const PCD_TRANSMIT = 0x04
    const PCD_TRANSCEIVE = 0x0C
    const PCD_CALCCRC = 0x03
    const PICC_REQIDL = 0x26
    const PICC_REQALL = 0x52
    const PICC_SELECTTAG = 0x93
    const PICC_AUTHENT1A = 0x60
    const PICC_AUTHENT1B = 0x61
    const PICC_WRITE = 0xA0
    const PICC_DECREMENT = 0xC0
    const PICC_INCREMENT = 0xC1
    const PICC_RESTORE = 0xC2
    const PICC_TRANSFER = 0xB0
    const PICC_HALT = 0x50
    const ComIEnReg = 0x02
    const DivlEnReg = 0x03
    const ComIrqReg = 0x04
    const DivIrqReg = 0x05
    const ErrorReg = 0x06
    const Status1Reg = 0x07
    const FIFODataReg = 0x09
    const FIFOLevelReg = 0x0A
    const WaterLevelReg = 0x0B
    const ControlReg = 0x0C
    const CollReg = 0x0E
    const Reserved01 = 0x0F
    const Reserved10 = 0x10
    const TxModeReg = 0x12
    const RxModeReg = 0x13
    const TxSelReg = 0x16
    const RxSelReg = 0x17
    const RxThresholdReg = 0x18
    const DemodReg = 0x19
    const Reserved11 = 0x1A
    const Reserved12 = 0x1B
    const MifareReg = 0x1C
    const Reserved13 = 0x1D
    const Reserved14 = 0x1E
    const SerialSpeedReg = 0x1F
    const Reserved20 = 0x20
    const CRCResultRegM = 0x21
    const CRCResultRegL = 0x22
    const Reserved21 = 0x23
    const ModWidthReg = 0x24
    const Reserved22 = 0x25
    const RFCfgReg = 0x26
    const GsNReg = 0x27
    const CWGsPReg = 0x28
    const ModGsPReg = 0x29
    const TCounterValueRegH = 0x2E
    const TCounterValueRegL = 0x2F
    const Reserved30 = 0x30
    const TestSel1Reg = 0x31
    const TestSel2Reg = 0x32
    const TestPinEnReg = 0x33
    const TestPinValueReg = 0x34
    const TestBusReg = 0x35
    const AutoTestReg = 0x36
    const VersionReg = 0x37
    const AnalogTestReg = 0x38
    const TestDAC1Reg = 0x39
    const TestDAC2Reg = 0x3A
    const TestADCReg = 0x3B
    const Reserved31 = 0x3C
    const Reserved32 = 0x3D
    const Reserved33 = 0x3E
    const Reserved34 = 0x3F
  
    let TagType2=0
    let block: number[] = []
    let temp = 0
    let tmp = 0
    let val = 0
    let uid: number[] = []
    let crc: number[] = []
    let buff: number[] = []
    let buf: number[] = []
    let serNum = []
    let MI_OK = 0
    let backLen = 0
    let backData:number[] = []
    let status = 0
    let u = 0
    let serNumCheck = 0
    let backBits:any = null
    let recvData : number[]= []
    let PCD_IDLE = 0
    let Reserved00 = 0
    let b=0
    let data:NumberFormat.UInt8LE []= []
    let TagType:number[] = []
    let MI_ERR = 2
    let MAX_LEN = 16
    let MI_NOTAGERR = 1
    let KEY = [255, 255, 255, 255, 255, 255]
    let ChSel:number
  
    function SetBitMask (reg: number, mask: number) {
        tmp = Read_MFRC522(reg)
        Write_MFRC522(reg, (tmp|mask))
    }
    function read_id () {
        let id = read_id_no_block()
        while (!(id)) {
  
            id = read_id_no_block()
            if (id!=undefined){
                return id
            }
        }
        return id
    }
  
    function Write_MFRC522(addr: number, val: number) {
        pins.digitalWritePin(RFIDPIN, 0)
        pins.spiWrite((addr << 1) & 0x7E)
        pins.spiWrite(val)
        pins.digitalWritePin(RFIDPIN, 1)
    }
  
    function readID():number {
        let [status, TagType2] = MFRC522_Request(PICC_REQIDL)
        if (status != MI_OK) {
            return 0
        }
  
        [status, uid] = MFRC522_Anticoll()
        if (status != MI_OK) {
            return 0
        }
  
        let id = uid_to_num(uid)
        MFRC522_StopCrypto1()
        return id
    }
  
    function readText():string {
        let [status, TagType2] = MFRC522_Request(PICC_REQIDL)
        if (status != MI_OK) {
            return null, null
        }
  
        [status, uid] = MFRC522_Anticoll()
        if (status != MI_OK) {
            return null, null
        }
        MFRC522_SelectTag(uid)
        status = MFRC522_Auth(PICC_AUTHENT1A, 11, KEY, uid)
        data=[]
        let text_read=''
        if (status == MI_OK) {
            for (let block_num of BLOCK_ADDRS) {
                block = MFRC522_Read(block_num)
                if (block) {
                    data = data.concat(block)
                }
            }
            if (data) {
                for (let c of data) {
                    text_read=text_read.concat(String.fromCharCode(c))
                }
            }
  
        }
        MFRC522_StopCrypto1()
        return text_read
  
    }
  
    function Read_MFRC522 (addr: number) {
        pins.digitalWritePin(RFIDPIN, 0)
        pins.spiWrite(((addr<<1)& 0x7E)|0x80)
        val = pins.spiWrite(0)
        pins.digitalWritePin(RFIDPIN, 1)
        return val
    }
  
    function write_no_block(txt: string): boolean {
        [status, TagType2] = MFRC522_Request(PICC_REQIDL)
  
        if (status != MI_OK) {
            return false
        }
        [status, uid] = MFRC522_Anticoll()
  
        if (status != MI_OK) {
            return false
        }
        let id=uid_to_num(uid)
        MFRC522_SelectTag(uid)
        status=MFRC522_Auth(PICC_AUTHENT1A, 11, KEY, uid)
        MFRC522_Read(11)
  
        if (status == MI_OK) {
            data = []
            for (let i = 0; i < txt.length; i++){
                data.push(txt.charCodeAt(i))
            }
  
            for (let i = txt.length; i<48;i++){
                data.push(32)
            }
  
            let b = 0
            for (let block_num of BLOCK_ADDRS) {
                MFRC522_Write(block_num, data.slice((b*16), ((b+1)*16)))
                b++
            }
  
        }
        MFRC522_StopCrypto1()
        return true
    }
  
    function AntennaOff () {
        ClearBitMask(TxControlReg, 0x03)
    }
  
    function MFRC522_Read (blockAddr: number) {
        recvData = []
        recvData.push(PICC_READ)
        recvData.push(blockAddr)
        let pOut2=[]
        pOut2= CalculateCRC(recvData)
        recvData.push(pOut2[0])
        recvData.push(pOut2[1])
        let [status, backData, backLen] = MFRC522_ToCard(PCD_TRANSCEIVE, recvData)
  
        if (status != MI_OK) {
            serial.writeLine("Error while reading!")
        }
        if (backData.length == 16) {
            return backData
        } else {
            return null
        }
    }
  
    function ClearBitMask (reg: number, mask: number) {
        tmp = Read_MFRC522(reg)
        Write_MFRC522(reg, tmp & (~mask))
    }
  
    function read_id_no_block () {
        [status, TagType2] = MFRC522_Request(PICC_REQIDL)
        if (status != MI_OK) {
            return null
        }
        [status, uid] = MFRC522_Anticoll()
        if (status != MI_OK) {
            return null
        }
        return uid_to_num(uid)
    }
  
    function MFRC522_Reset () {
        Write_MFRC522(CommandReg, PCD_RESETPHASE)
    }
  
    function MFRC522_Request (reqMode: number):[number, any] {
        TagType = []
        Write_MFRC522(BitFramingReg, 0x07)
        TagType.push(reqMode)
        let [status, backData, backBits] = MFRC522_ToCard(PCD_TRANSCEIVE, TagType)
  
        if ((status != MI_OK) || (backBits != 16)) {
            status = MI_ERR
        }
        return [status, backBits]
    }
  
    function AntennaON () {
        temp = Read_MFRC522(TxControlReg)
        if (~(temp & 0x03)) {
            SetBitMask(TxControlReg, 0x03)
        }
    }
  
    function MFRC522_Anticoll ():[number,number[] ] {
        serNumCheck = 0
        serNum = []
        Write_MFRC522(BitFramingReg, 0)
        serNum.push(PICC_ANTICOLL)
        serNum.push(0x20)
        let [status, backData, backBits] = MFRC522_ToCard(PCD_TRANSCEIVE, serNum)
        if (status == MI_OK) {
            if (backData.length == 5) {
                for (let i = 0; i <= 3; i++) {
                    serNumCheck = serNumCheck ^ backData[i]
                }
                if (serNumCheck != backData[4]) {
                    status = MI_ERR
                }
            }
            else {
                status = MI_ERR
            }
        }
        return [status, backData]
    }
  
    function MFRC522_StopCrypto1 () {
        ClearBitMask(Status2Reg, 0x08)
    }
  
    function MFRC522_Auth (authMode: number, BlockAddr: number, Sectorkey: number[], serNum: number[]) {
        buff = []
        buff.push(authMode)
        buff.push(BlockAddr)
        for (let j=0; j <(Sectorkey.length);j++){
            buff.push(Sectorkey[j])
        }
        for (let k=0;k<4;k++){
            buff.push(serNum[k])
        }
        [status, backData, backLen] = MFRC522_ToCard(PCD_AUTHENT, buff)
  
        if (status != MI_OK){
            serial.writeLine("AUTH ERROR!")
        }
        if ((Read_MFRC522(Status2Reg) & 0x08)==0){
            serial.writeLine("AUTH ERROR2!")
        }
        return status
    }
  
    function MFRC522_ToCard (command: number, sendData: number[]):[number, number[],number] {
        backData = []
        backLen = 0
        status = MI_ERR
        let irqEN = 0x00
        let waitIRQ = 0x00
        let lastBits = null
        let n = 0
  
        if (command == PCD_AUTHENT){
            irqEN = 0x12
            waitIRQ = 0x10
        }
        if (command == PCD_TRANSCEIVE){
            irqEN = 0x77
            waitIRQ = 0x30
        }
        Write_MFRC522(ComIEnReg, irqEN | 0x80)
        ClearBitMask(ComIrqReg, 0x80)
        SetBitMask(FIFOLevelReg, 0x80)
        Write_MFRC522(CommandReg, PCD_IDLE)
  
        for (let l=0;l<(sendData.length);l++){
            Write_MFRC522(FIFODataReg, sendData[l])
        }
        Write_MFRC522(CommandReg, command)
  
        if (command == PCD_TRANSCEIVE){
            SetBitMask(BitFramingReg, 0x80)
        }
  
        let i = 2000
        while (true){
            n = Read_MFRC522(ComIrqReg)
            i --
            if (~(i != 0 && ~(n & 0x01) && ~(n & waitIRQ))) {
                break
            }
        }
        ClearBitMask(BitFramingReg, 0x80)
  
        if (i != 0){
            if ((Read_MFRC522(ErrorReg) & 0x1B) == 0x00){
                status = MI_OK
  
                if (n & irqEN & 0x01){
                    status = MI_NOTAGERR
                }
                if (command == PCD_TRANSCEIVE){
                    n = Read_MFRC522(FIFOLevelReg)
                    lastBits = Read_MFRC522(ControlReg) & 0x07
                    if (lastBits != 0){
                        backLen = (n -1)*8+lastBits
                    }
                    else{
                        backLen = n * 8
                    }
                    if (n == 0){
                        n = 1
                    }
                    if (n > MAX_LEN){
                        n = MAX_LEN
                    }
                    for (let o=0;o<n;o++){
                        backData.push(Read_MFRC522(FIFODataReg))
                    }
                }
            }
            else{
                status = MI_ERR
            }
        }
  
        return [status, backData, backLen]
    }
  
    function MFRC522_SelectTag (serNum: number[]) {
        buf = []
        buf.push(PICC_SELECTTAG)
        buf.push(0x70)
        for (let i=0;i<5;i++){
            buf.push(serNum[i])
        }
  
        let pOut = CalculateCRC(buf)
        buf.push(pOut[0])
        buf.push(pOut[1])
        let [status, backData, backLen] = MFRC522_ToCard(PCD_TRANSCEIVE, buf)
        if ((status == MI_OK) && (backLen == 0x18)){
            return backData[0]
        }
        else{
            return 0
        }
    }
  
    function CalculateCRC (pIndata: number[]) {
        ClearBitMask(DivIrqReg, 0x04)
        SetBitMask(FIFOLevelReg, 0x80)
        for ( let i=0;i<(pIndata.length);i++){
            Write_MFRC522(FIFODataReg, pIndata[i])
        }
        Write_MFRC522(CommandReg, PCD_CALCCRC)
        let i = 0xFF
  
        while (true){
            let s = Read_MFRC522(DivIrqReg)
            i--
            if (!(i != 0 && !(s & 0x04))){
                break
            }
        }
  
        let pOutData: number[] = []
        pOutData.push(Read_MFRC522(CRCResultRegL))
        pOutData.push(Read_MFRC522(CRCResultRegM))
        return pOutData
    }
  
    function MFRC522_DumpClassic1K (key: number[], uid: number[]) {
      for (let i=0;i<64;i++){
          status =MFRC522_Auth(PICC_AUTHENT1A, i, key, uid)
  
          if (status == MI_OK){
              MFRC522_Read(i)
          }
          else{
              serial.writeLine("Authentication Error")
          }
      }
    }
  
    function MFRC522_Write (blockAddr: number, writeData: number[]) {
        buff = []
        buff.push(PICC_WRITE)
        buff.push(blockAddr)
        crc = CalculateCRC(buff)
        buff.push(crc[0])
        buff.push(crc[1])
        let [status, backData, backLen] = MFRC522_ToCard(PCD_TRANSCEIVE, buff)
        if ((status != MI_OK) || (backLen!=4) || ((backData[0]&0x0F) != 0x0A)){
            status = MI_ERR
            serial.writeLine("ERROR")
        }
  
        if (status == MI_OK){
           let buf2 : number []= []
            for (let i=0;i<16;i++){
                buf2.push(writeData[i])
            }
            crc = CalculateCRC(buf2)
            buf2.push(crc[0])
            buf2.push(crc[1])
            let [status, backData, backLen] = MFRC522_ToCard(PCD_TRANSCEIVE, buf2)
            if ((status!=MI_OK)||(backLen!=4)||((backData[0]&0x0F)!=0x0A)){
                serial.writeLine("Error while writing")
            }
            else{
                //serial.writeLine("Data written")
            }
        }
    }
  
    function uid_to_num(uid: number[]){
        let n= 0
        for (let i=0;i<5;i++){
            n = n*256+uid[i]
        }
        return n
    }
  
    /**
     * Initialize RFID module
     */
    //% block="initialize RFID module"
    //% subcategory="MFRC522 RFID"
    //% weight=100
    export function rfidInit() {
        pins.spiFormat(8, 0)
        pins.digitalWritePin(RFIDPIN, 1)
        MFRC522_Reset()
        Write_MFRC522(TModeReg, 0x8D)
        Write_MFRC522(TPrescalerReg, 0x3E)
        Write_MFRC522(TReloadRegL, 30)
        Write_MFRC522(TReloadRegH, 0)
        Write_MFRC522(TxASKReg, 0x40)
        Write_MFRC522(ModeReg, 0x3D)
        AntennaON()
    }
  
    /**
     * Read ID from device
     */
    //% block="read ID from RFID device"
    //% subcategory="MFRC522 RFID"
    //% weight=95
    export function rfidReadId(): number {
        let id = readID()
        while (!id) {
            let id = readID()
            if (id!=undefined){
                return id
            }
        }
        return id
    }
  
    /**
     * Read content from RFID device
     */
    //% block="read data from RFID device"
    //% subcategory="MFRC522 RFID"
    //% weight=90
    export function rfidReadText(): string {
        let text = readText()
        while (!text) {
            text = readText()
            if (text!=undefined){
                return text
            }
        }
        return text
    }
  
    /**
     * Write to RFID device
     * @param text A string that is supposed to be written to the RFID device
     */
    //% block="write %text to RFID device"
    //% subcategory="MFRC522 RFID"
    //% weight=85
    export function rfidWriteText(text: string): void {
        while(!write_no_block(text)) {
            if (write_no_block(text) != undefined) {
                return
            }
        }
        return
    }
  
  }
  