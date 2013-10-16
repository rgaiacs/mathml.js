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

// Copy the equation and add it before if the operation success
function mathmlPreserve(ev) {
    // Get the math parent
    var jelem = $(this);
    var pmath = jelem.parents('math')[0];

    // Clone the element
    var cmath = pmath.cloneNode(true);

    var dbsuccess;
    // Handle double click
    switch (this.localName) {
        case 'mi':
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
    }

    // Copy the math before if success
    if (!MATHMLJS.OVERWRITE && dbsuccess) {
        pmath.parentNode.insertBefore(cmath, pmath);
    }

    if (this.localName != 'mn') {
        ev.stopPropagation();
        ev.preventDefault();
    }
}

// Return a hash based on the childrens of a element
function opSiblingHash(elem) {
    var f = elem.firstElementChild.localName;
    var l = elem.lastElementChild.localName;
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

