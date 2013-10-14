// mouseover
function mathmlMouseover(e) {
    this.setAttribute('mathcolor', MATHCOLOR);
    console.log('Change color of ' + this.innerHTML);
    e.stopPropagation();
    e.preventDefault()
}

// mouseout
function mathmlMouseout(e) {
    this.removeAttribute('mathcolor');
}

// Setup all mouseover
function setMouseover(elem) {
    elem.addEventListener('mouseover', mathmlMouseover, false);
    elem.addEventListener('mouseout', mathmlMouseout, false);
}

