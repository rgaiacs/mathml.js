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
            dbsuccess = miDblclick(this);
            break;
        case 'mo':
            dbsuccess = moDblclick(this);
            break;
    }

    // Copy the math before if success
    if (!MATHOVERWRITE && dbsuccess) {
        pmath.parentNode.insertBefore(cmath, pmath);
    }
    ev.stopPropagation();
    ev.preventDefault()
}

// Setup for each child from math element
function mathmlSetup() {
    console.log('Processing element ' + this.localName + ' withs id is ' + this.id);
    setMouseover(this);
    setDblclick(this);
}

// Entry point.
function mathmlStart() {
    if (ONLYDISPLAY) {
        $("math[display='block']").find('*').each(mathmlSetup);
    }
    else {
        $("math").find('*').each(mathmlSetup);
    }
}

// Setup events after load the page
window.onload = mathmlStart;

// Global variable
MATHCOLOR = 'blue';  // The color of select element
ONLYDISPLAY = true;  // Only interact with display
MATHOVERWRITE = false;  // Not overwrite equations

