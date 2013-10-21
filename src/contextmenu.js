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

// Replace mi element by mn
function mi2mn(elem, number){
    var sym = jQuery.trim(elem.innerHTML);
    var mi = jQuery(elem).parents('math').find('mi');
    for (var i = 0; i < mi.length; i++) {
        if (jQuery.trim(mi[i].innerHTML) == sym) {
            // Check if is the case of
            // <mn>...</mn> <mo>&InvisibleTimes;</mo> <mi>...</mi>
            // or
            // <mi>...</mi> <mo>&InvisibleTimes;</mo> <mi>...</mi>
            var p = mi[i].previousElementSibling;
            // Avoid when p is null
            if (p != null) {
                var p2 = p.previousElementSibling;
                if (p.nodeName === 'mo' &&
                        p.innerHTML.trim().charCodeAt(0) === 8290 &&
                        (p2.nodeName === 'mn' || p2.nodeName === 'mi')) {
                    // Need to replace <mo>&InvisibleTimes;</mo>
                    replaceInvisibleTimes(p);
                }
            }
            replaceMiByMn(mi[i], number);
        }
    }
    return true;
}

// Handle "var" right click
function varContextmenu(elem) {
    var r;
    var sym = jQuery.trim(elem.innerHTML);
    switch (sym.charCodeAt(0)) {
        case 8520:  // double-struck italic small i
            console.log('The imaginary constant.')
            break;
        case 960:  // greek small letter pi
            var val = prompt('Replace ' + elem.innerHTML + ' by:', '3.14');
            if (val) {
                replaceMiByMn(elem, val);
            }
            else {
                console.log('Prompt have been cancel.');
            }
            r = true;
            break;
        case 8519:  // double-struck italic small e
            console.log('The Euler constant.')
            break;
        default:
            var val = prompt('Replace ' + elem.innerHTML + ' by:');
            if (val) {
                r =  mi2mn(elem, val);
            }
            else {
                console.log('Prompt have been cancel.');
            }
            break;
    }
    return r;
}

// Handle function double click
function funContextmenu(elem) {
    // TODO
    return 0;
}

// Handle invisible times double click
function invTimesContextmenu(elem) {
    // TODO
    return 0;
}

// Handle invisible separator double click
function invSepContextmenu(elem) {
    // TODO
    return 0;
}

// Handle for right click in mi element
function miContextmenu(elem) {
    var r;
    switch (assum_mi(elem)) {
        case 0:  // variable
        case 2:  // invisible times
            r = varContextmenu(elem);
            break;
        case 1:  // function
            r = funContextmenu(elem);
            break;
        case 3:  // invisible separator
            r = invSepContextmenu(elem);
            break;
    }
    return r;
}

// Setup all right click
function setContextMenu(elem) {
    if (elem.nodeName === 'mi') {
        elem.addEventListener('contextmenu', mathmlPreserve, false);
    }
}

