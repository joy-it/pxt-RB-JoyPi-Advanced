namespace JoyPiAdvanced {
    const pinLightBarrier = DigitalPin.P0
    let lightBarrier_initiliazed = false
    let lastState = false
    let counter = 0
    let previousMillis = 0
    let lightBarrier_newRPM = false

    // 20 holes in encoder disc
    let wheel = 20
    let rpm = 0
  
    function getRPM(): boolean {
      if (!lightBarrier_initiliazed) lightBarrierInitiliaze()
      if (pins.digitalReadPin(pinLightBarrier) && !lastState) {
        lastState = true
        return true
      }
      else if (!pins.digitalReadPin(pinLightBarrier) && lastState){
        lastState = false
      }
      return false
    }

    //  calculate interval time in micro seconds
    function calculateTimeIntervalInUS(timeInterval: number){
      return timeInterval * 1000
    }
    // calculate interval for 1 minute
    function calculateTimeIntervalFactorInMin(timeInterval: number){
      return 60 / timeInterval
    }

    /**
     * initialize light barrier
     */
    //% block="initialize light barrier"
    //% subcategory="Light barrier"
    //% weight=100
    export function lightBarrierInitiliaze(){
      // set pullup for speed sensor
      pins.setPull(pinLightBarrier, PinPullMode.PullUp)
      lightBarrier_initiliazed = true
    }
  
    /**
     * Checks the current state of the light barrier. True means that the light barrier is triggered. False means that its not triggered.
     */
    //% block="check light barrier"
    //% subcategory="Light barrier"
    //% weight=80
    export function lightBarrierIsTriggered(): boolean {
      if (!lightBarrier_initiliazed) lightBarrierInitiliaze()
      if (pins.digitalReadPin(pinLightBarrier)) {
        return true
      }
      else {
        return false
      }
    }
  
    /**
     * Calculates the current RPM at the light barrier. This is usally combined with the stepper motor.
     */
    //% block="light barrier calculated RPM in %timeInterval second interval"
    //% subcategory="Light barrier"
    //% weight=90
    //% timeInterval.defl=5 timeInterval.min=0 timeInterval.max=60
    export function lightBarrierRPM(timeInterval : number): number {
      if(getRPM()) counter++
      if ((input.runningTime() - previousMillis) > calculateTimeIntervalInUS(timeInterval)) {
        previousMillis = input.runningTime()
        rpm = ((counter * calculateTimeIntervalFactorInMin(timeInterval))) / wheel
        counter = 0
        lightBarrier_newRPM = true
      }
      return rpm
    }

    /**
     * Check if a new RPM calculation is finished
     */
    //% block="new RPM calculation is finished"
    //% subcategory="Light barrier"
    //% weight=85
    export function lightBarrierRPMInterval (){
      if (lightBarrier_newRPM) {
        lightBarrier_newRPM = false
        return true
      }
      else return false
    }
  }