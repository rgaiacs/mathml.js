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

// Create basic node
function mathmlCreateNode(name, inner) {
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', name);
    new_elem.innerHTML = inner;
    mathmlSetupElement(new_elem);

    return new_elem;
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

    var dbsuccess;
    // Handle double click
    switch (this.nodeName.toLowerCase()) {
        case 'mi':
            if (ev.type == 'dblclick')
                dbsuccess = miDblclick(this);
            else if (ev.type == 'contextmenu')
                dbsuccess = miContextmenu(this);
            break;
        case 'mo':
            dbsuccess = moDblclick(this);
            break;
        case 'mfrac':
            dbsuccess = mfracDblclick(this);
            break;
        case 'mroot':
            dbsuccess = mrootDblclick(this);
            break;
        case 'msqrt':
            dbsuccess = msqrtDblclick(this);
            break;
        case 'msup':
            dbsuccess = msupDblclick(this);
            break;
    }

    // Copy the math before if success
    if (!MATHMLJS.OVERWRITE && dbsuccess) {
        pmath.parentNode.insertBefore(cmath, pmath);

        // Create delete buttom
        var bdel = document.createElement('button');
        bdel.innerHTML = 'Delete from this line';
        bdel.setAttribute('style', 'float:right;');
        bdel.addEventListener('click', mathmlDelete, false);
        pmath.parentNode.insertBefore(bdel, pmath);
    }

    if (this.nodeName.toLowerCase() != 'mn') {
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
            f = elem.firstElementChild;
            l = elem.lastElementChild;
            // Check if the first element is a minus sign and the last element
            // is a number.
            if (f.nodeName.toLowerCase() === 'mo' &&
                (f.innerHTML.trim().charCodeAt(0) === 8722 ||
                 f.innerHTML.trim().charCodeAt(0) === 45) &&
                l.nodeName.toLowerCase() === 'mn') {
                var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
                mathmlSetupElement(elem);
                new_elem.innerHTML = -Number(l.innerHTML);
                jQuery(elem).replaceWith(new_elem);
            }
        }
    }
}

// Since negative numbers MUST be represent as
// <mrow> <mo>-</mo> <mn>...</mn> </mrow>
// we will go to restore than.
function restoreNegativeMn(number) {
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mrow');
    mathmlSetupElement(new_elem);

    var mo = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mo');
    mo.innerHTML = '-';
    mathmlSetupElement(mo);
    new_elem.appendChild(mo);

    var mn = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
    mn.innerHTML = Math.abs(Number(number));
    mathmlSetupElement(mn);
    new_elem.appendChild(mn);

    return new_elem;
}

// Return a hash based on the childrens of a element
function opSiblingHash(elem) {
    removeMrow(elem.previousElementSibling);
    var f = elem.previousElementSibling.nodeName.toLowerCase();
    removeMrow(elem.nextElementSibling);
    var l = elem.nextElementSibling.nodeName.toLowerCase();
    if (f === 'mi' && l === 'mi')
        return 1;
    else if (f == 'mn' && l === 'mn')
        return 2;
    else if (f == 'mrow' || l === 'mrow')
        return 3;
    else
        return 0;
}

// Return a hash based on the childrens of a element
function opChildHash(elem) {
    removeMrow(elem.firstElementChild);
    var f = elem.firstElementChild.nodeName.toLowerCase();
    removeMrow(elem.lastElementChild);
    var l = elem.lastElementChild.nodeName.toLowerCase();
    if (f === 'mi' && l === 'mi')
        return 1;
    else if (f == 'mn' && l === 'mn')
        return 2;
    else if (f == 'mrow' || l === 'mrow')
        return 3;
    else
        return 0;
}

// Setup for each child from math element
function mathmlSetupElement(elem) {
    setMouseover(elem);
    setDblclick(elem);
    setContextMenu(elem);
}

// Setup for each child from math element
function mathmlSetup() {
    setMouseover(this);
    setDblclick(this);
    setContextMenu(this);
}

// Entry point.
function mathmlStart() {
    if (MATHMLJS.ONLYDISPLAY) {
        $("math[display='block']").find('*').each(mathmlSetup);
    }
    else {
        $("math").find('*').each(mathmlSetup);
    }
}

// Setup events after load the page
window.onload = mathmlStart;

// Global variable
MATHMLJS = new Object();
MATHMLJS.COLOR = 'blue';  // The color of select element
MATHMLJS.ONLYDISPLAY = true;  // Only interact with display
MATHMLJS.OVERWRITE = false;  // Not overwrite equations
MATHMLJS.DECIMALS = 2;  // Number of decimals

