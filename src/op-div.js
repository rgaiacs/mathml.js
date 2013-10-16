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

function opDivMiMi(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    if (p.innerHTML.trim() === n.innerHTML.trim()) {
        // Create node to replace
        var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
        mathmlSetupElement(new_elem);
        new_elem.innerHTML = 1;

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

function opDivMnMn(elem) {
    var r;
    var p = elem.previousElementSibling;
    var n = elem.nextElementSibling;

    // We can't divide by 0
    if (Number(n.innerHTML) === 0) {
        console.log('Can\'t divide by zero.');
        r = 0;
    }
    else {
        var val = (Number(p.innerHTML) / Number(n.innerHTML)).toFixed(MATHMLJS.DECIMALS);
        if (val >= 0) {
            // Create node to replace
            var new_elem = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'mn');
            new_elem.innerHTML = val;
            mathmlSetupElement(new_elem);
        }
        else
            var new_elem = restoreNegativeMn(val);

        // Replace node and remove old ones
        jQuery(p).replaceWith(new_elem);
        n.remove();
        elem.remove();

        r = 1;
    }

    return r;
}

function opDivMrowMrow(elem) {
}

// Handle the double click in a plus sign
function opDiv(elem) {
    var r;
    var h = opSiblingHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opDivMiMi(elem);
            break;
        case 2:
            r = opDivMnMn(elem);
            break;
        case 3:
            r = opDivMrowMrow(elem);
            break;
    }
    return r;
}

