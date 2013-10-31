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

function opFracMiMi(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    if (f.innerHTML.trim() === l.innerHTML.trim()) {
        // Create node to replace
        var new_elem = mathmlCreateNode('mn', 1);

        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);

        r = 1;
    }
    else {
        r = 0;
    }

    return r;
}

function opFracMnMn(elem) {
    var r;
    var f = elem.firstElementChild;
    var l = elem.lastElementChild;

    // We can't divide by 0
    if (Number(l.innerHTML) === 0) {
        console.log('Can\'t divide by zero.');
        r = 0;
    }
    else {
        var val = (Number(f.innerHTML) / Number(l.innerHTML)).toFixed(MATHMLJS.DECIMALS);
        if (val >= 0) {
            // Create node to replace
            var new_elem = mathmlCreateNode('mn', val);
        }
        else
            var new_elem = restoreNegativeMn(val);

        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);

        r = 1;
    }

    return r;
}

function opFracMrowMrow(elem) {
    return 0;
}

// Handle the double click in a frac element
function opFrac(elem) {
    var r;
    var h = opChildHash(elem);
    switch (h) {
        case 0:
            break;
        case 1:
            r = opFracMiMi(elem);
            break;
        case 2:
            r = opFracMnMn(elem);
            break;
        case 3:
            r = opFracMrowMrow(elem);
            break;
    }
    return r;
}

