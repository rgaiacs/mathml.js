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
    var new_elem = mathmlCreateNode('mo', '\u00D7');
    jQuery(mo).replaceWith(new_elem);
}

// Replace mi element by mn
function replaceMiByMn(elem, number) {
    var sym = elem.innerHTML.trim();
    var mi = jQuery(elem).parents('math').find('mi');
    for (var i = 0; i < mi.length; i++) {
        if (mi[i].innerHTML.trim() === sym) {
            // Check if is the case of
            // <mn>...</mn> <mo>&InvisibleTimes;</mo> <mi>...</mi>
            // or
            // <mi>...</mi> <mo>&InvisibleTimes;</mo> <mi>...</mi>
            var p = mi[i].previousElementSibling;
            // Avoid when p is null
            if (p != null) {
                var p2 = p.previousElementSibling;
                if (p.nodeName.toLowerCase() === 'mo' &&
                        p.innerHTML.trim().charCodeAt(0) === 8290 &&
                        (p2.nodeName.toLowerCase() === 'mn' || p2.nodeName.toLowerCase() === 'mi')) {
                            // Need to replace <mo>&InvisibleTimes;</mo>
                            replaceInvisibleTimes(p);
                }
            }
            jQuery(mi[i]).replaceWith(mathmlCreateNode('mn', number));
        }
    }
    return true;
}

// Handle click for variables
function varClick(elem) {
    var r;
    var sym = elem.innerHTML.trim();
    switch (sym.charCodeAt(0)) {
        case 8520:  // double-struck italic small i
            console.log('The imaginary constant.')
            break;
        case 960:  // greek small letter pi
            var val = prompt('Replace ' + elem.innerHTML + ' by:', '3.14');
            if (val) {
                replaceMiByMn(elem, val);
            }
            else {
                console.log('Prompt have been cancel.');
            }
            r = true;
            break;
        case 8519:  // double-struck italic small e
            console.log('The Euler constant.')
            break;
        default:
            var val = prompt('Replace ' + elem.innerHTML + ' by:');
            if (val) {
                r =  replaceMiByMn(elem, val);
            }
            else {
                console.log('Prompt have been cancel.');
            }
            break;
    }
    return r;
}

// Handle for click in unsupport mi element
function miUnsuport(elem) {
    console.log('Function ' + elem.innerHTML.trim() + ' not support');
    return 0;
}

// Handle invisible separator click
function invSepClick(elem) {
    // TODO
    return 0;
}

// Handle click in mi element
function miClick(elem) {
    var r;
    switch (assum_mi(elem)) {
        case 0:  // variable
        case 2:  // invisible times
            r = varClick(elem);
            break;
        case 1:  // function
            switch (elem.innerHTML.trim()) {
                case 'sin':
                    r = trigSin(elem);
                    break;
                case 'cos':
                    r = trigCos(elem);
                    break;
                case 'tan':
                    r = trigTan(elem);
                    break;
                default:
                    r = miUnsuport(elem);
                    break;
            }
            break;
        case 3:  // invisible separator
            r = invSepClick(elem);
            break;
    }
    return r;
}

// Handle for click in unsupport mo element
function moUnsuport(elem) {
    console.log('Operator with charcode ' + elem.innerHTML.trim().charCodeAt(0) + ' not support');
    return 0;
}

// Handle for click in mo element
function moClick(e) {
    var r;
    var op = e.innerHTML.trim();
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

// Handle for click in mfrac element
function mfracClick(elem) {
    return opFrac(elem);
}

// Handle for click in mroot element
function mrootClick(elem) {
    return opRoot(elem);
}

// Handle for click in msqrt element
function msqrtClick(elem) {
    return opSqrt(elem);
}

// Handle for click in msup element
function msupClick(elem) {
    return opPow(elem);
}

// Setup click event
function setClick(elem) {
    elem.addEventListener('click', mathmlPreserve, false);
}

