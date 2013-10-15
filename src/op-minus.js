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

function opMinusMiMi(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
        setMouseover(new_elem);
        setDblclick(new_elem);
        new_elem.innerHTML = 0;

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opMinusMnMn(elem) {
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    // Create node to replace
    var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
    new_elem.innerHTML = Number(p.innerHTML) - Number(n.innerHTML);

    // Replace node and remove old ones
    setMouseover(new_elem);
    setDblclick(new_elem);
    jQuery(p).replaceWith(new_elem);
    n.remove();
    elem.remove();

    return 1;
}

function opMinusMrowMrow(elem) {
}

// Return a has based on the sibling of a plus sign
function opMinusSiblingHash(elem) {
    var p = elem.previousElementSibling.localName;
    var n = elem.nextElementSibling.localName;
    if (p === 'mi' && n === 'mi')
        return 1;
    else if (p == 'mn' && n === 'mn')
        return 2;
    else if (p == 'mrow' || n === 'mrow')
        return 3;
    else
        return 0;
}

// Handle the double click in a plus sign
function opMinus(elem) {
    var r;
    var h = opMinusSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opMinusMiMi(elem);
            break;
        case 2:
            r = opMinusMnMn(elem);
            break;
        case 3:
            r = opMinusMrowMrow(elem);
            break;
    }
    return r;
}

