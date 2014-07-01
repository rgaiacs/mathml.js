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

/* global MATHMLJS */
/* global jQuery */
/* global mathmlCreateNode */
/* global opChildHash */
/* global opSiblingHash */
/* global restoreNegativeMn */

function opPowMiMi(elem) {
    console.log('Can\'t compute the power of two variables.');
    return 0;
}

function opPowMnMn(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    // TODO Probably here there is a bug. We MUST check the values.
    var val = (Math.pow(Number(f.innerHTML), Number(l.innerHTML))).toFixed(MATHMLJS.DECIMALS);
    var new_elem;
    if (val >= 0) {
        // Create node to replace
        new_elem = mathmlCreateNode('mn', val);
    } else {
        new_elem = restoreNegativeMn(val);
    }

    // Replace node and remove old ones
    jQuery(elem).replaceWith(new_elem);

    return 1;
}

function opPowMrowMrow(elem) {
    return 0;
}

// Handle the click in a root element
function opPow(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opPowMiMi(elem);
            break;
        case 2:
            r = opPowMnMn(elem);
            break;
        case 3:
            r = opPowMrowMrow(elem);
            break;
    }
    return r;
}
