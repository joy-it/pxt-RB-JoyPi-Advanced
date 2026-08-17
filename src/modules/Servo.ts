  namespace JoyPiAdvanced {
    const pinServo = AnalogPin.P8
  
    function scale (num: number, in_min: number, in_max: number, out_min: number, out_max: number) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
  
  
    /**
     * Rotates the servo motor to a specified angle
     * @param degrees The angle position which is supposed to be driven from 0 (most left) to 180 (most right)
     */
    //% block="turn servo motor to %degrees degree"
    //% degrees.min=0 degrees.max=180 degrees.defl=90
    //% subcategory="Servo motor"
    //% weight=100
    export function turnMotor(degrees: number) {
        pins.servoWritePin(pinServo, degrees)  
    }  
  }
  