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

/* global jQuery */
/* global mathmlCreateNode */
/* global opSiblingHash */
/* global restoreNegativeMn */

function opMinusMiMi(elem) {
    var new_elem;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        new_elem = mathmlCreateNode('mn', 0);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();
    }

    return new_elem;
}

function opMinusMnMn(elem) {
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    var val = Number(p.innerHTML) - Number(n.innerHTML);
    var new_elem;
    if (val >= 0) {
        // Create node to replace
        new_elem = mathmlCreateNode('mn', val);
    } else {
        new_elem = restoreNegativeMn(val);
    }

    // Replace node and remove old ones
    jQuery(p).replaceWith(new_elem);
    n.remove();
    elem.remove();

    return new_elem;
}

function opMinusMrowMrow(elem) {}

// Handle the click in a plus sign
function opMinus(elem) {
    var new_elem;
    var h = opSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            new_elem = opMinusMiMi(elem);
            break;
        case 2:
            new_elem = opMinusMnMn(elem);
            break;
        case 3:
            new_elem = opMinusMrowMrow(elem);
            break;
    }
    return new_elem;
}
