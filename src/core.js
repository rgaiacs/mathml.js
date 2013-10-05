function mathmlSetup() {
    console.log('Processing element ' + this.localName + ' withs id is ' + this.id);
    setMouseover(this);
    setDblclick(this);
}

// Entry point.
function mathmlStart() {
    $("math").find('*').each(mathmlSetup);
}

window.onload = mathmlStart;

