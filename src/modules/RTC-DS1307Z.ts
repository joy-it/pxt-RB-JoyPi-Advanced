namespace JoyPiAdvanced {
    const RTCADDR = 0x68
    const RTCSECOND = 0
    const RTCMINUTE = 1
    const RTCHOUR = 2
    const RTCWEEKDAY = 3
    const RTCDAY = 4
    const RTCMONTH = 5
    const RTCYEAR = 6
    const RTCCTRL = 7
    const RTCRAM = 8
  
    function setReg(reg: number, dat: number): void {
      let buffer = pins.createBuffer(2)
      buffer[0] = reg
      buffer[1] = dat
      pins.i2cWriteBuffer(RTCADDR, buffer)
    }
  
    function getReg(reg: number): number {
      pins.i2cWriteNumber(RTCADDR, reg, NumberFormat.UInt8BE)
      return pins.i2cReadNumber(RTCADDR, NumberFormat.UInt8BE)
    }
  
    function hexToDec(hex: number) {
      return (hex >> 4) * 10 + (hex % 16)
    }
  
    function decToHex(dec: number) {
      return Math.idiv(dec, 10) * 16 + (dec % 10)
    }
  
    // ----------------------------------------
    // TIME SETTER
    // ----------------------------------------
  
    /**
     * Sets all paramters to the RTC
     * @param year The current year
     * @param month The current month
     * @param day The current day 
     * @param weekday The current weekday
     * @param hour  The current hour
     * @param minute The current minute
     * @param second The current second
     */
    //% block="set RTC year %year | month %month | day %day | weekday %weekday | hour %hour | minute %minute | second %second"
    //% inlineInputMode=inline
    //% subcategory="RTC"
    //% weight=98
    export function rtcSetDateTime(year: number, month: number, day:number, weekday: number, hour: number, minute: number, second: number): void {
      let buffer = pins.createBuffer(8)
      buffer[0] = RTCSECOND
      buffer[1] = decToHex(second % 60)
      buffer[2] = decToHex(minute % 60)
      buffer[3] = decToHex(hour % 24)
      buffer[4] = decToHex(weekday % 8)
      buffer[5] = decToHex(day % 32)
      buffer[6] = decToHex(month % 13)
      buffer[7] = decToHex(year % 100)
      pins.i2cWriteBuffer(RTCADDR, buffer)
    }
  
    /**
     * Sets the year to the RTC
     * @param year The current year
     */
    //% block="set RTC year %year"
    //% subcategory="RTC"
    //% weight=97
    export function rtcSetYear(year: number): void {
      setReg(RTCYEAR, decToHex(year % 100))
    }
  
    /**
     * Sets the month to the RTC
     * @param month The current month
     */
    //% block="set RTC month %month"
    //% subcategory="RTC"
    //% weight=96
    export function rtcSetMonth(month: number): void {
      setReg(RTCMONTH, decToHex(month % 13))
    }
  
    /**
     * Sets the day to the RTC
     * @param day The current day
     */
    //% block="set RTC day %day"
    //% subcategory="RTC"
    //% weight=95
    export function rtcSetDay(day: number): void {
      setReg(RTCDAY, decToHex(day % 32))
    }
  
    /**
     * Sets the weekday to the RTC
     * @param weekday The current weekday
     */
    //% block="set RTC weekday %weekday"
    //% subcategory="RTC"
    //% weight=94
    export function rtcSetWeekday(weekday: number): void {
      setReg(RTCWEEKDAY, decToHex(weekday % 8))
    }
  
    /**
     * Sets the hour to the RTC
     * @param hour The current hour
     */
    //% block="set RTC hour %hour"
    //% subcategory="RTC"
    //% weight=93
    export function rtcSetHour(hour: number): void {
      setReg(RTCHOUR, decToHex(hour % 24))
    }
  
    /**
     * Sets the minute to the RTC
     * @param minute The current minute
     */
    //% block="set RTC minute %minute"
    //% subcategory="RTC"
    //% weight=92
    export function rtcSetMinute(minute: number): void {
      setReg(RTCHOUR, decToHex(minute % 60))
    }
  
    /**
     * Sets the second to the RTC
     * @param second The current second
     */
    //% block="set RTC second %second"
    //% subcategory="RTC"
    //% weight=91
    export function rtcSetSecond(second: number): void {
      setReg(RTCSECOND, decToHex(second % 60))
    }
  
    // ----------------------------------------
    // TIME GETTER
    // ----------------------------------------
  
    /**
     * Reads the current year from the RTC
     */
    //% block="get RTC year"
    //% subcategory="RTC"
    //% weight=90
    export function rtcGetYear(): number {
      return Math.min(hexToDec(getReg(RTCYEAR)), 99) + 2000
    }
  
    /**
     * Reads the current month from the RTC
     */
    //% block="get RTC month"
    //% subcategory="RTC"
    //% weight=89
    export function rtcGetMonth(): number {
      return Math.max(Math.min(hexToDec(getReg(RTCMONTH)), 12), 1)
    }
  
    /**
     * Reads the current day from the RTC
     */
    //% block="get RTC day"
    //% subcategory="RTC"
    //% weight=88
    export function rtcGetDay(): number {
      return Math.max(Math.min(hexToDec(getReg(RTCDAY)), 31), 1)
    }
  
    /**
     * Reads the current weekday from the RTC
     */
    //% block="get RTC weekday"
    //% subcategory="RTC"
    //% weight=87
    export function rtcGetWeekday(): number {
      return Math.max(Math.min(hexToDec(getReg(RTCWEEKDAY)), 7), 1)
    }
  
    /**
     * Reads the current hour from the RTC
     */
    //% block="get RTC hour"
    //% subcategory="RTC"
    //% weight=86
    export function rtcGetHour(): number {
      return Math.min(hexToDec(getReg(RTCHOUR)), 23)
    }
  
    /**
     * Reads the current minute from the RTC
     */
    //% block="get RTC minute"
    //% subcategory="RTC"
    //% weight=85
    export function rtcGetMinute(): number {
      return Math.min(hexToDec(getReg(RTCMINUTE)), 59)
    }
  
    /**
     * Reads the current second from the RTC
     */
    //% block="get RTC second"
    //% subcategory="RTC"
    //% weight=84
    export function rtcGetSecond(): number {
      return Math.min(hexToDec(getReg(RTCSECOND)), 59)
    }
  
  }
  