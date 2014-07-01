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

function opRootMiMi(elem) {
    console.log('Can\'t compute the root of two variables.');
}

function opSqrtMi(elem) {
    console.log('Can\'t compute the sqrt of variable.');
}

function opRootMnMn(elem) {
    var new_elem;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    var val = (Math.pow(Number(f.innerHTML), 1 / Number(l.innerHTML))).toFixed(MATHMLJS.DECIMALS);
    if (val >= 0) {
        // Create node to replace
        new_elem = mathmlCreateNode('mn', val);
    } else {
        new_elem = restoreNegativeMn(val);
    }

    // Replace node and remove old ones
    jQuery(elem).replaceWith(new_elem);

    return new_elem;
}

function opSqrtMn(elem) {
    var new_elem;
    var f = elem.firstElementChild;

    var val = Math.sqrt(Number(f.innerHTML)).toFixed(MATHMLJS.DECIMALS);
    if (val >= 0) {
        // Create node to replace
        new_elem = mathmlCreateNode('mn', val);
    } else {
        new_elem = restoreNegativeMn(val);
    }

    // Replace node and remove old ones
    jQuery(elem).replaceWith(new_elem);

    return new_elem;
}

function opRootMrowMrow(elem) {}

function opSqrtMrow(elem) {}

// Handle the click in a sqrt element
function opSqrt(elem) {
    var new_elem;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            new_elem = opSqrtMi(elem);
            break;
        case 2:
            new_elem = opSqrtMn(elem);
            break;
        case 3:
            new_elem = opSqrtMrow(elem);
            break;
    }
    return new_elem;
}

// Handle the click in a root element
function opRoot(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opRootMiMi(elem);
            break;
        case 2:
            r = opRootMnMn(elem);
            break;
        case 3:
            r = opRootMrowMrow(elem);
            break;
    }
    return r;
}
