// MathML.js
// Copyright (C) 2013  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Replace InvisibleTimes
function replaceInvisibleTimes(mo) {
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mo');
    new_elem.innerHTML = '\u00D7';
    mathmlSetupElement(new_elem);
    jQuery(mo).replaceWith(new_elem);
}

// Replace mi with mn
function replaceMiByMn(mi, mn_val) {
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
    new_elem.innerHTML = mn_val;
    mathmlSetupElement(new_elem);
    jQuery(mi).replaceWith(new_elem);
}

// Handle for double click in unsupport mo element
function moUnsuport(op) {
    var innerHTML = jQuery.trim(op.innerHTML);
    var charcode = innerHTML.charCodeAt(0);
    console.log('Operator with charcode ' + charcode + ' not support');
    return 0;
}

// Handle for double click in mo element
function moDblclick(e) {
    var r;
    var op = jQuery.trim(e.innerHTML);
    switch (op.charCodeAt(0)) {
        case 43:  // +
            r = opPlus(e);
            break;
        case 8722:  // minus sign
        case 45:  // "-" for nooby
            r = opMinus(e);
            break;
        case 215:  // multiplication sign
        case 183:  // middle dot
            r = opTimes(e);
            break;
        case 247:  // division sign
        case 8725:  // division slash
        case 47:  // "/" for nooby
            r = opDiv(e);
            break;
        default:
            r = moUnsuport(e);
            break;
    }
    return r;
}

// Handle for double click in mfrac element
function mfracDblclick(elem) {
    return opFrac(elem);
}

// Handle for double click in mroot element
function mrootDblclick(elem) {
    return opRoot(elem);
}

// Handle for double click in msqrt element
function msqrtDblclick(elem) {
    return opSqrt(elem);
}

// Handle for double click in msup element
function msupDblclick(elem) {
    return opPow(elem);
}

// Handle for double click in unsupport mi element
function miUnsuport(elem) {
    console.log('Function ' + elem.innerHTML.trim() + ' not support');
    return 0;
}

// Handle for double click in mi element
function miDblclick(elem) {
    var r;
    // Check if the mi element are a function.
    if (assum_mi(elem) === 1) {
        var fun = elem.innerHTML.trim();
        switch (fun) {
            case 'sin':
                trigSin(elem);
                break;
            case 'cos':
                trigCos(elem);
                break;
            case 'tan':
                trigTan(elem);
                break;
            default:
                r = miUnsuport(elem);
                break;
        }
    }
    else {
        r = 0;
    }
    return r;
}

// Setup all mouseover
function setDblclick(elem) {
    elem.addEventListener('dblclick', mathmlPreserve, false);
}

