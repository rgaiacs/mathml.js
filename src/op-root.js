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
    return 0;
}

function opSqrtMi(elem) {
    console.log('Can\'t compute the sqrt of variable.');
    return 0;
}

function opRootMnMn(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    var val = (Math.pow(Number(f.innerHTML), 1 / Number(l.innerHTML))).toFixed(MATHMLJS.DECIMALS);
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

function opSqrtMn(elem) {
    var r;
    var f = elem.firstElementChild;

    var val = Math.sqrt(Number(f.innerHTML)).toFixed(MATHMLJS.DECIMALS);
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

function opRootMrowMrow(elem) {
    return 0;
}

function opSqrtMrow(elem) {
    return 0;
}

// Handle the click in a sqrt element
function opSqrt(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opSqrtMi(elem);
            break;
        case 2:
            r = opSqrtMn(elem);
            break;
        case 3:
            r = opSqrtMrow(elem);
            break;
    }
    return r;
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
