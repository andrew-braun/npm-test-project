
/* Declare variables for the two main linear-gradient colors, targeting input fields */
let color1 = document.querySelector("#color-1");
let color2 = document.querySelector("#color-2");

const codeBox = document.querySelectorAll("code");

// COLOR CODE CONVERSION FUNCTIONS
    // HEX -> RGB
    // HEX -> HSLA

    /* hex to rgb */
const hexToRGBA = (hexInput) => {
    let r = 0, g = 0, b = 0, a = 0;

    let hex = hexInput.replace("#", "");

    if (hex.length == 3) {
        r = "0x" + hex[0] + hex[0];
        g = "0x" + hex[1] + hex[1];
        b = "0x" + hex[2] + hex[2]; 
        a = "0x" + "ff";
    }
    else if (hex.length == 4) {
        r = "0x" + hex[0] + hex[0];
        g = "0x" + hex[1] + hex[1];
        b = "0x" + hex[2] + hex[2];
        a = "0x" + hex[3] + hex[3];
    }
    else if (hex.length == 6) {
        r = "0x" + hex[0] + hex[1];
        g = "0x" + hex[2] + hex[3];
        b = "0x" + hex[4] + hex[5];
        a = "0x" + "ff";
    }
    else if (hex.length == 8) {
        r = "0x" + hex[0] + hex[1];
        g = "0x" + hex[2] + hex[3];
        b = "0x" + hex[4] + hex[5];
        a = "0x" + hex[6] + hex[7];
    }

    a = +(a/255).toFixed(3);

    return(`rgba(${+r}, ${+g}, ${+b}, ${a})`);
}
    
    /* hex to hsla */
const hexToHSLA = (hex) => {
    /* Convert hex to RGBA */
    let rgba = hexToRGBA(hex);
    let rgbaValues = rgba.replace("rgba", "").replace("(", "").replace(")", "");
    let rgbaSplit = rgbaValues.split(",");
    let r = rgbaSplit[0], g = rgbaSplit[1], b = rgbaSplit[2], a = rgbaSplit[3];
    
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0, s = 0, l = 0;
    
    if (delta == 0) {
        h = 0;        
    } 
    else if (cmax == r) {
        h = ((g - b) / delta % 6);
    }
    else if (cmax == g) {
        h = (b - r) / delta + 2;
    }
    else if (cmax = b) {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);    

    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;
    
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = Math.round(+(s * 100).toFixed(1));
    l = Math.round(+(l * 100).toFixed(1));

    return(`hsla(${h}, ${s}%, ${l}%, ${a})`);

}


// CHANGE GRADIENT DIRECTION

/* Declare gradient direction selectors, targeting buttons and degree input box */
const buttonTop = document.querySelector("#button-top");
const buttonRight = document.querySelector("#button-right");
const buttonBottom = document.querySelector("#button-bottom");
const buttonLeft = document.querySelector("#button-left");
const buttonCycle = document.querySelector("#button-cycle");
const degreeBox = document.querySelector("#direction-degrees");
    
/* Set initial gradient direction */
let gradientDirection = "to right";

/* Changes gradient direction using buttons and number inputs */
const directionShift = () => {
    if (event.target == buttonTop) {
        gradientDirection = "to top";
    }
    else if (event.target == buttonRight) {
        gradientDirection = "to right";
    }
    else if (event.target == buttonBottom) {
        gradientDirection = "to bottom";
    }
    else if (event.target == buttonLeft) {
        gradientDirection = "to left";
    }
    else if (event.target == degreeBox) {
        gradientDirection = degreeBox.value + "deg";
    } 
    gradientShift();
}

// CHANGE ELEMENT COLORS
    /* Main color/text change function */
const gradientShift = () => {
    /* Create variable for current gradient */
    let currentDirection = gradientDirection;
   
    let currentGradient = `linear-gradient(${currentDirection}, ${color1.value}, ${color2.value})`;

    changeBackgroundGradient(currentGradient); // changes the body background
    changeCodeTextGradient(currentGradient); // changes the color of the CSS code output
    changeCodeBoxBorder(currentGradient); // changes the border of code CSS code box

    changeCodeText(currentGradient); // changes the CSS code output

    changeColorText();
}

    /* Change background gradient */
const body = document.querySelector("#body-gradient");

const changeBackgroundGradient = (gradientValue) => {
    body.style.backgroundImage = gradientValue;    
}

    /* Change gradient of CSS code text output */
const changeCodeTextGradient = (gradientValue) => {
    /* Change every code text field color to current gradient background */
    for (line of gradientText) {
        line.style.backgroundImage = gradientValue;
    }
}

    /* Change code output box borders */
const changeCodeBoxBorder = (gradientValue) => {
    for (box of codeBox) {
        box.style.borderImage = `linear-gradient(to left, ${color1.value}, ${color2.value}) 1 / 1 / 0 stretch`;
    }
}

// CSS CODE TEXT OUTPUT

/* Declare variables for CSS gradient code output*/
const gradientText = document.querySelectorAll(".gradient-css span");
const hslaText = document.querySelector("#hsla-value span");
const rgbaText = document.querySelector("#rgba-value span");
const hexText = document.querySelector("#hex-value span");

/* Set initial gradient value in codeboxes */
hslaText.textContent = `linear-gradient(${gradientDirection}, ${hexToHSLA(color1.value)}, ${hexToHSLA(color2.value)})`;
rgbaText.textContent = `linear-gradient(${gradientDirection}, ${hexToRGBA(color1.value)}, ${hexToRGBA(color2.value)})`;
hexText.textContent = `linear-gradient(${gradientDirection}, ${color1.value}, ${color2.value})`;

    /* Change code text to current gradient */
const changeCodeText = (gradientValue) => {
    hslaText.textContent = `linear-gradient(${gradientDirection}, ${hexToHSLA(color1.value)}, ${hexToHSLA(color2.value)})`;
    rgbaText.textContent = `linear-gradient(${gradientDirection}, ${hexToRGBA(color1.value)}, ${hexToRGBA(color2.value)})`;
    hexText.textContent = gradientValue;
    
}

// COLOR CODE INPUT BOXES

let color1Text = document.querySelector("#color-1-text");
let color2Text = document.querySelector("#color-2-text");
    
const changeColorText = () => {
    color1Text.value = color1.value;
    color2Text.value = color2.value;
}

const inputColorChange = () => {

    color1.value = color1Text.value;
    color2.value = color2Text.value;
    gradientShift();
}



// TOGGLE BEWEEN HEX/RGBA/HSLA

const buttonHex = document.querySelector("#hex-switch-button");
const buttonRGBA = document.querySelector("#RGBA-switch-button");
const buttonHSLA = document.querySelector("#HSLA-switch-button");

const convertColorText = () => {
    switch (event.target.id) {
        case "hex-switch-button": 
            color1Text.value = color1.value;
            color2Text.value = color2.value;
            break;
        case "RGBA-switch-button": 
            color1Text.value = hexToRGBA(color1.value);
            color2Text.value = hexToRGBA(color2.value);
            break;
        case "HSLA-switch-button": 
            color1Text.value = hexToHSLA(color1.value);
            color2Text.value = hexToHSLA(color2.value);
            break;
    }
    console.log(event.target.id);
}



/*Custom picker*/
// Simple example, see optional options for more configuration.
// from https://github.com/Simonwep/pickr

/* Event listeners */

color1.addEventListener("input", gradientShift);
color2.addEventListener("input", gradientShift);
buttonTop.addEventListener("click", directionShift);
buttonRight.addEventListener("click", directionShift);
buttonBottom.addEventListener("click", directionShift);
buttonLeft.addEventListener("click", directionShift);
// buttonCycle.addEventListener("click", directionShift);
degreeBox.addEventListener("input", directionShift);
buttonHex.addEventListener("click", convertColorText);
buttonRGBA.addEventListener("click", convertColorText);
buttonHSLA.addEventListener("click", convertColorText);
color1Text.addEventListener("change", inputColorChange);
color2Text.addEventListener("change", inputColorChange);

// /* experimenting with changing CSS variables */
// potentially an easier way to change the color for every element on the page,
// but less-compatible atm
// let root = document.documentElement;

// const cycle = () => {
//     root.style.setProperty("--color-1", "black");
// }



/* Design 

1. A function that changes the main color values on:
    - Color input change
    - Text input change

2. A function that uses the main color values to:
    - change color elements (body, text,boxes, etc.)
    - Change text/buttons to light color if background is dark, vice versa

3. A function that uses the main color values to: 
    - change the printed CSS code text
    - convert CSS code text to RGBA + HSLA

4. A function that changes the main direction value on:
    - Button input
    - Degree input

1. On input, trigger a function that stores the two colors in variables
    1.1. Color input - easy
    1.2. Text input
        1.2.1. Whenever a change is finished, run a function to check the input
            1.2.1.0. Validate code
                1.2.1.0.1. If it's not a valid color input, abort; don't change variables
            1.2.1.1. Detect hex, HSL/HSLA, RGB/RGBA
            1.2.1.2. Convert to hex for machine
            1.2.1.2. Store the color in the variable 
2. Use those two colors to create a CSS linear gradient that can be used to change elements
3. In the main function, call helper functions using the two colors and linear-gradient as inputs
    3.1. Change element colors
        3.1.1. If background is too dark, switch text and other elements to white
    3.2. Change CSS code
        3.2.1. Output hex, RGBA, and HSLA
    3.

*/