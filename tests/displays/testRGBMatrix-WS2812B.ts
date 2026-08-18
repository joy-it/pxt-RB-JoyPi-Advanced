JoyPiAdvanced.initializeAdvanced()
JoyPiAdvanced.initializeRGBMatrix()

function testRGBMatrixRainbow() {
    JoyPiAdvanced.rgbMatrixRainbow()
}

JoyPiAdvanced.rgbMatrixSetBrightness(50)
JoyPiAdvanced.rgbMatrixShowColor(255, 255, 255)
basic.pause(1000)
JoyPiAdvanced.rgbMatrixSetBrightness(255)

JoyPiAdvanced.rgbMatrixSetPixel(1, 1, 255, 0, 0)
basic.pause(1000)

JoyPiAdvanced.rgbMatrixClear()
basic.pause(1000)

// method should be executed here 

JoyPiAdvanced.rgbMatrixClear()