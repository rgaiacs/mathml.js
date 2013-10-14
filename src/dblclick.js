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

// Replace mi with mn
function replaceMiByMn(mi, mn_val) {
    var new_elem = document.createElement('mn');
    new_elem.innerHTML = mn_val;
    setMouseover(new_elem);
    jQuery(mi).replaceWith(new_elem);
}

// Handle "var" double click
function varDblclick(elem) {
    var r;
    var sym = jQuery.trim(elem.innerHTML);
    switch (jQuery.trim(sym.charCodeAt(0))) {
        case 2148:  // double-struck italic small i
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
        case 2147:  // double-struck italic small e
            console.log('The Euler constant.')
            break;
        default:
            var val = prompt('Replace ' + elem.innerHTML + ' by:');
            if (val) {
                var mi = jQuery(elem).parents('math').find('mi');
                for (var i = 0; i < mi.length; i++) {
                    if (jQuery.trim(mi[i].innerHTML) == sym) {
                        replaceMiByMn(mi[i], val);
                    }
                }
                r = true;
            }
            else {
                console.log('Prompt have been cancel.');
            }
            break;
    }
    return r;
}

// Handle function double click
function funDblclick(elem) {
    // TODO
}

// Handle invisible times double click
function invTimesDblclick(elem) {
    // TODO
}

// Handle invisible separator double click
function invSepDblclick(elem) {
    // TODO
}

// Handle for double click in mi element
function miDblclick(e) {
    switch (assum_mi(this)) {
        case 0:  // variable
            varDblclick(this);
            break;
        case 1:  // function
            funDblclick(this);
            break;
        case 2:  // invisible times
            invTimesDblclick(this);
            break;
        case 3:  // invisible separator
            invSepDblclick(this);
            break;
    }
    e.stopPropagation();
    e.preventDefault()
}

// Handle for double click in unsupport mo element
function moUnsuport(op) {
    var innerHTML = jQuery.trim(op.innerHTML);
    var charcode = innerHTML.charCodeAt(0);
    console.log('Operator with charcode ' + charcode + ' not support');
    return 0;
}

// Handle for double click in mo element
function moDblclick(e) {
    var r;
    var op = jQuery.trim(e.innerHTML);
    switch (op.charCodeAt(0)) {
        case 43:  // +
            r = opPlus(e);
            break;
        case 8722:  // minus sign
        case 45:  // "-" for nooby
            r = moUnsuport(e);
            break;
        case 215:  // multiplication sign
        case 183:  // middle dot
            r = moUnsuport(e);
            break;
        case 247:  // division sign
        case 8725:  // division slash
        case 47:  // "/" for nooby
            r = moUnsuport(e);
            break;
        default:
            r = moUnsuport(e);
            break;
    }
    return r;
}

// Setup all mouseover
function setDblclick(elem) {
    elem.addEventListener('dblclick', mathmlPreserve, false);
}

