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

/* global $ */
/* global MATHMLJS: true */
/* global jQuery */
/* global mathmlDelete */
/* global mfracClick */
/* global miClick */
/* global moClick */
/* global mrootClick */
/* global msqrtClick */
/* global msupClick */
/* global setClick */
/* global setDND */
/* global setMouseover */

// Create basic node
function mathmlCreateNode(name, inner) {
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', name);
    new_elem.innerHTML = inner;
    mathmlSetupElement(new_elem);

    return new_elem;
}

// Create a undo "button"
function mathmlCreateDelete(visible) {
    var bdel = document.createElement('button');
    var style = 'float:right;width:auto;position:absolute;right:100px;';
    bdel.innerHTML = 'X';
    if (visible === false) {
        bdel.setAttribute('style', 'visibility:hidden;' + style);
    } else {
        bdel.setAttribute('style', style);
    }
    bdel.addEventListener('click', mathmlDelete, false);

    return bdel;
}

// Handle click
function mathmlHandleClick(elem) {
    var r;

    switch (elem.nodeName.toLowerCase()) {
        case 'mi':
            r = miClick(elem);
            break;
        case 'mo':
            r = moClick(elem);
            break;
        case 'mfrac':
            r = mfracClick(elem);
            break;
        case 'mroot':
            r = mrootClick(elem);
            break;
        case 'msqrt':
            r = msqrtClick(elem);
            break;
        case 'msup':
            r = msupClick(elem);
            break;
    }

    return r;
}

// Copy the equation and add it before if the operation success
function mathmlPreserve(ev) {
    // Get the math parent
    var jelem = $(this);
    var pmath = jelem.parents('math')[0];

    // This is a hack to avoid insert operation in the wrong location.
    //
    // Check if the nextElementSibling is a math element or a button what
    // indicate that some step have been done previously.
    if (pmath.nextSibling.nodeName.toLowerCase() === 'math' ||
        pmath.nextSibling.nodeName.toLowerCase() === 'button') {
        console.log('The next sibling is \'math\'. Not performing operation.');
        return null;
    }

    // Clone the element
    var cmath = pmath.cloneNode(true);
    // The cloneNode method won't clone the event handles
    $(cmath).find('*').each(mathmlSetup);

    var success = mathmlHandleClick(this);

    // Copy the math before if success
    if (!MATHMLJS.OVERWRITE && success) {
        pmath.parentNode.insertBefore(cmath, pmath);

        // Create delete buttom
        var bdel = mathmlCreateDelete(true);
        pmath.parentNode.insertBefore(bdel, pmath);
    }

    if (this.nodeName.toLowerCase() !== 'mn') {
        ev.stopPropagation();
        ev.preventDefault();
    }
}

// Check if a mrow element have only one element and in that case replace
// the mrow by it children.
function removeMrow(elem) {
    if (elem.nodeName.toLowerCase() === 'mrow' && elem.childElementCount === 1) {
        jQuery(elem).replaceWith(elem.firstElementChild);
    }
    // This is a hack since negative numbers MUST be represent as
    // <mrow> <mo>-</mo> <mn>...</mn> </mrow>
    else {
        // Check if it can be a negative number
        if (elem.nodeName.toLowerCase() === 'mrow' && elem.childElementCount === 2) {
            var f = elem.firstElementChild;
            var l = elem.lastElementChild;
            // Check if the first element is a minus sign and the last element
            // is a number.
            if (f.nodeName.toLowerCase() === 'mo' &&
                (f.innerHTML.trim().charCodeAt(0) === 8722 ||
                    f.innerHTML.trim().charCodeAt(0) === 45) &&
                l.nodeName.toLowerCase() === 'mn') {
                var new_elem = mathmlCreateNode('mn', -Number(l.innerHTML));
                jQuery(elem).replaceWith(new_elem);
            }
        }
    }
}

function removeGroup(elem) {
    removeMfenced(elem);
    removeDelimiters(elem);
}

// Check if a mfenced element has only one element and in that case replace the
// mfenced by it children.
function removeMfenced(elem) {
    if (elem &&
        elem.nodeName &&
        elem.nodeName.toLowerCase() === 'mfenced' &&
        elem.childElementCount === 1 &&
        elem.firstChild.nodeName.toLowerCase() !== 'mtable') {
        jQuery(elem).replaceWith(elem.firstElementChild);
    }
}

// Check if siblings are delimiters and remove it
function removeDelimiters(elem) {
    if (elem &&
        elem.previousSibling &&
        elem.previousSibling.nodeName.toLowerCase() === 'mo' &&
        elem.previousSibling.innerHTML === '(' &&
        elem.nextSibling &&
        elem.nextSibling.nodeName.toLowerCase() === 'mo' &&
        elem.nextSibling.innerHTML === ')') {
        elem.parentNode.removeChild(elem.previousSibling);
        elem.parentNode.removeChild(elem.nextSibling);
    }
}

// Since negative numbers MUST be represent as
// <mrow> <mo>-</mo> <mn>...</mn> </mrow>
// we will go to restore than.
function restoreNegativeMn(number) {
    var new_elem = mathmlCreateNode('mrow', '');

    var mo = mathmlCreateNode('mo', '-');
    new_elem.appendChild(mo);

    var mn = mathmlCreateNode('mn', Math.abs(Number(number)));
    new_elem.appendChild(mn);

    return new_elem;
}

// Return a hash based on the siblings of a element
function opSiblingHash(elem) {
    removeMrow(elem.previousElementSibling);
    var f = elem.previousElementSibling.nodeName.toLowerCase();
    removeMrow(elem.nextElementSibling);
    var l = elem.nextElementSibling.nodeName.toLowerCase();
    if (f === 'mi' && l === 'mi') {
        return 1;
    } else {
        if (f === 'mn' && l === 'mn') {
            return 2;
        } else {
            if (f === 'mrow' || l === 'mrow') {
                return 3;
            } else {
                return 0;
            }
        }
    }
}

// Return a hash based on the childrens of a element
function opChildHash(elem) {
    removeMrow(elem.firstElementChild);
    var f = elem.firstElementChild.nodeName.toLowerCase();
    removeMrow(elem.lastElementChild);
    var l = elem.lastElementChild.nodeName.toLowerCase();
    if (f === 'mi' && l === 'mi') {
        return 1;
    } else {
        if (f === 'mn' && l === 'mn') {
            return 2;
        } else {
            if (f === 'mrow' || l === 'mrow') {
                return 3;
            } else {
                return 0;
            }
        }
    }
}

// Setup for each child from math element
function mathmlSetupElement(elem) {
    setMouseover(elem);
    setClick(elem);
    setDND(elem);
}

// Setup for each child from math element
function mathmlSetup() {
    setMouseover(this);
    setClick(this);
    setDND(this);
}

// This fix some bad MathML that miss the multiplication symbol
function mathmlFix(elem) {
    switch (elem.nodeName) {
        case 'mn':
        case 'mi':
            switch (elem.parentNode.nodeName) {
                case 'math':
                case 'mrow':
                    if (elem.previousElementSibling && elem.previousElementSibling.nodeName !== 'mo') {
                        elem.parentNode.insertBefore(mathmlCreateNode('mo', '×'), elem);
                    }
                    break;

                default:
                    return;
            }
            break;

        default:
            return;
    }
}

// Entry point.
function mathmlStart() {
    var math, i;
    math = document.getElementsByTagName('mn');
    for (i = 0; i < math.length; i++) {
        mathmlFix(math[i]);
    }
    math = document.getElementsByTagName('mi');
    for (i = 0; i < math.length; i++) {
        mathmlFix(math[i]);
    }

    math = document.getElementsByTagName('math');
    for (i = 0; i < math.length; i++) {
        math[i].setAttribute('id', MATHMLJS.IDCOUNTER);
        MATHMLJS.IDCOUNTER += 1;

        if (math[i].getAttribute('display') === 'block') {
            var bdel = mathmlCreateDelete(false);
            math[i].parentNode.insertBefore(bdel, math[i]);
        }
    }

    if (MATHMLJS.ONLYDISPLAY) {
        $('math[display=\'block\']').find('*').each(mathmlSetup);
    } else {
        $('math').find('*').each(mathmlSetup);
    }
}

// Setup events after load the page
window.onload = mathmlStart;

// Global variable
MATHMLJS = {};
MATHMLJS.IDCOUNTER = 0;
MATHMLJS.COLOR = 'orange'; // The color of select element
MATHMLJS.ONLYDISPLAY = true; // Only interact with display
MATHMLJS.OVERWRITE = false; // Not overwrite equations
MATHMLJS.DECIMALS = 2; // Number of decimals
