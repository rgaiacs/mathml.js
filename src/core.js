// Copy the equation and add it before
function mathmlPreserve(elem) {
    // Get the math parent

    // Copy the math before
}

// Setup for each child from math element
function mathmlSetup() {
    console.log('Processing element ' + this.localName + ' withs id is ' + this.id);
    setMouseover(this);
    setDblclick(this);
}

// Entry point.
function mathmlStart() {
    $("math").find('*').each(mathmlSetup);
}

// Setup events after load the page
window.onload = mathmlStart;

// Global variable
MATHCOLOR = 'blue';  // The color of select element
ONLYDISPLAY = true;  // Only interact with display
MATHOVERWRITE = false;  // Not overwrite equations

