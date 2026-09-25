enum JoyPiAdvancedStepunit {
  //% block="steps"
  steps,
  //% block="rotations"
  rotations
}

enum JoypiAdvancedStepperDirection {
  //% block="Clockwise"
  clockwise,
  //% block="Counterclockwise"
  counterclockwise
}

namespace JoyPiAdvanced {
    const STEPPERPIN1 = DigitalPin.P4
    const STEPPERPIN2 = DigitalPin.P5
    const STEPPERPIN3 = DigitalPin.P6
    const STEPPERPIN4 = DigitalPin.P7
  
    let state = 0
  
    function moveStep(direction: number) {
      led.enable(false)
      if (state == 0) {
        pins.digitalWritePin(STEPPERPIN1, 0)
        pins.digitalWritePin(STEPPERPIN2, 0)
        pins.digitalWritePin(STEPPERPIN3, 0)
        pins.digitalWritePin(STEPPERPIN4, 0)
      }
      else if (state == 1) {
        pins.digitalWritePin(STEPPERPIN1, 1)
        pins.digitalWritePin(STEPPERPIN2, 0)
        pins.digitalWritePin(STEPPERPIN3, 0)
        pins.digitalWritePin(STEPPERPIN4, 1)
      }
      else if (state == 2) {
        pins.digitalWritePin(STEPPERPIN1, 0)
        pins.digitalWritePin(STEPPERPIN2, 0)
        pins.digitalWritePin(STEPPERPIN3, 1)
        pins.digitalWritePin(STEPPERPIN4, 1)
      }
      else if (state == 3) {
        pins.digitalWritePin(STEPPERPIN1, 0)
        pins.digitalWritePin(STEPPERPIN2, 1)
        pins.digitalWritePin(STEPPERPIN3, 1)
        pins.digitalWritePin(STEPPERPIN4, 0)
      }
      else if (state == 4) {
        pins.digitalWritePin(STEPPERPIN1, 1)
        pins.digitalWritePin(STEPPERPIN2, 1)
        pins.digitalWritePin(STEPPERPIN3, 0)
        pins.digitalWritePin(STEPPERPIN4, 0)
      }
  
      state = state + direction
      if (state < 1) {
        state = 4
      }
      else if (state > 4) {
        state = 1
      }
    }
  
    /**
     * Rotates the stepper motor by a specified amount of steps or rotations
     * @param direction The direction in which the motor should turn (clockwise or counterclockwise)
     * @param steps The amount the motor is supposed to turn
     * @param unit The unit the motor is suppoed to turn (steps or full rotations)
     */
    //% block="rotate stepper %JoypiAdvancedStepperDirection for %steps | %unit"
    //% subcategory="Stepper motor"
    //% weight=100
    export function stepperRotate(direction: JoypiAdvancedStepperDirection, steps: number, unit: JoyPiAdvancedStepunit): void {
      switch(unit) {
        case JoyPiAdvancedStepunit.rotations: steps = steps * 2056
        case JoyPiAdvancedStepunit.steps: steps = steps
      }
  
      for(let i = 0 ; i < steps ; i++) {
        if(direction == JoypiAdvancedStepperDirection.clockwise){
          moveStep(1)
          basic.pause(1)
        }
        else {
          moveStep(-1)
          basic.pause(1)
        }

      }
  
      state = 0
    }
  
}
  