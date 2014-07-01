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

function opFracMiMi(elem) {
    var new_elem;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    if (f.innerHTML.trim() === l.innerHTML.trim()) {
        // Create node to replace
        new_elem = mathmlCreateNode('mn', 1);

        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
    }

    return new_elem;
}

function opFracMnMn(elem) {
    var new_elem;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    // We can't divide by 0
    if (Number(l.innerHTML) === 0) {
        console.log('Can\'t divide by zero.');
    } else {
        var val = (Number(f.innerHTML) / Number(l.innerHTML)).toFixed(MATHMLJS.DECIMALS);
        if (val >= 0) {
            // Create node to replace
            new_elem = mathmlCreateNode('mn', val);
        } else {
            new_elem = restoreNegativeMn(val);
        }

        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
    }

    return new_elem;
}

function opFracMrowMrow(elem) {
    return 0;
}

// Handle the click in a frac element
function opFrac(elem) {
    var new_elem;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            new_elem = opFracMiMi(elem);
            break;
        case 2:
            new_elem = opFracMnMn(elem);
            break;
        case 3:
            new_elem = opFracMrowMrow(elem);
            break;
    }
    return new_elem;
}
