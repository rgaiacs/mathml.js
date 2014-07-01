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
/* global opSiblingHash */
/* global restoreNegativeMn */

// Function to create trigonometric node
function trigCreate(fun, arg) {
    // Create node to replace
    var new_elem = mathmlCreateNode('mrow', '');

    var elem_fun = mathmlCreateNode('mi', fun);
    new_elem.appendChild(elem_fun);

    var elem_op = mathmlCreateNode('mo', '\u2061');
    new_elem.appendChild(elem_op);

    var elem_arg = mathmlCreateNode('mi', arg);
    new_elem.appendChild(elem_arg);

    return new_elem;
}

// Function to Filter trigonometric functions
function trigFilter(elem) {
    var r = {};
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var row;

    // sin 1
    if (n2.nodeName.toLowerCase() === 'mn') {
        r.code = 1;
        r.n2 = [n2];
    }
    // sin \pi
    else if (n2.nodeName.toLowerCase() === 'mi') {
        r.code = 2;
        r.n2 = [n2];
    } else {
        if (n2.nodeName.toLowerCase() === 'mfenced') {
            row = n2.firstElementChild;
        } else {
            row = n2;
        }

        // sin (2 \pi)
        // sin (x + y)
        if (row && row.childElementCount === 3) {
            r.code = 3;
            r.n2 = row.children;
        } else {
            r.code = -1;
        }
    }

    return r;
}

// Compute the sin in radians.
function trigSin(elem) {
    var r;
    var f = trigFilter(elem);
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var new_elem;
    var temp;

    switch (f.code) {
        // sin 1
        case 1:
            new_elem = mathmlCreateNode('mn', Math.sin(Number(f.n2[0].innerHTML)).toFixed(MATHMLJS.DECIMALS));
            r = 1;
            break;
            // sin \pi
        case 2:
            if (f.n2[0].innerHTML.trim().charCodeAt(0) === 960) {
                new_elem = mathmlCreateNode('mn', Math.sin(Math.PI).toFixed(MATHMLJS.DECIMALS));
                r = 1;
            } else {
                console.log('Unable to handle the parameter');
                r = 0;
            }
            break;
            // sin (2 \pi)
            // sin (x + y)
        case 3:
            switch (f.n2[1].innerHTML.trim().charCodeAt(0)) {
                case 43: // +
                    // sin (x + y) = sin x cos y + cos x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 8722: // minus sign
                case 45: // "-" for nooby
                    // sin (x - y) = sin x cos y - cos x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 215: // multiplication sign
                case 183: // middle dot
                case 8290: // invisible times
                    if (f.n2[2].nodeName === 'mi' &&
                        f.n2[2].innerHTML.trim().charCodeAt(0) === 960 &&
                        f.n2[0].nodeName === 'mn') {
                        new_elem = mathmlCreateNode('mn', Math.sin(Number(f.n2[0].innerHTML) * Math.PI).toFixed(MATHMLJS.DECIMALS));
                        r = 1;
                    } else {
                        console.log('Unable to handle the parameter');
                        r = 0;
                    }
                    break;
                default:
                    console.log('Not implement yet the operator \\u' + f.n2[1].innerHTML.trim().charCodeAt(0));
                    r = 0;
                    break;
            }
            break;
        default:
            console.log('Unable to handle the parameter');
            r = 0;
            break;
    }

    if (r === 1) {
        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
        n.remove();
        n2.remove();
    }

    return r;
}

// Compute the cos in radians.
function trigCos(elem) {
    var r;
    var f = trigFilter(elem);
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var new_elem;
    var temp;

    switch (f.code) {
        // cos 1
        case 1:
            new_elem = mathmlCreateNode('mn', Math.cos(Number(f.n2[0].innerHTML)).toFixed(MATHMLJS.DECIMALS));
            r = 1;
            break;
            // cos \pi
        case 2:
            if (f.n2[0].innerHTML.trim().charCodeAt(0) === 960) {
                new_elem = mathmlCreateNode('mn', Math.cos(Math.PI).toFixed(MATHMLJS.DECIMALS));
                r = 1;
            } else {
                console.log('Unable to handle the parameter');
                r = 0;
            }
            break;
            // cos (2 \pi)
            // cos (x + y)
        case 3:
            switch (f.n2[1].innerHTML.trim().charCodeAt(0)) {
                case 43: // +
                    // cos (x + y) = sin x cos y + cos x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 8722: // minus sign
                case 45: // "-" for nooby
                    // sin (x - y) = cos x cos y + sin x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    temp = trigCreate('cos', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('cos', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[0].innerHTML);
                    new_elem.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    new_elem.appendChild(temp);
                    temp = trigCreate('sin', f.n2[2].innerHTML);
                    new_elem.appendChild(temp);

                    r = 1;
                    break;
                case 215: // multiplication sign
                case 183: // middle dot
                case 8290: // invisible times
                    if (f.n2[2].nodeName === 'mi' &&
                        f.n2[2].innerHTML.trim().charCodeAt(0) === 960 &&
                        f.n2[0].nodeName === 'mn') {
                        new_elem = mathmlCreateNode('mn', Math.cos(Number(f.n2[0].innerHTML) * Math.PI).toFixed(MATHMLJS.DECIMALS));
                        r = 1;
                    } else {
                        console.log('Unable to handle the parameter');
                        r = 0;
                    }
                    break;
                default:
                    console.log('Not implement yet the operator \\u' + f.n2[1].innerHTML.trim().charCodeAt(0));
                    r = 0;
                    break;
            }
            break;
        default:
            console.log('Unable to handle the parameter');
            r = 0;
            break;
    }

    if (r === 1) {
        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
        n.remove();
        n2.remove();
    }

    return r;
}

// Compute the tan in radians.
function trigTan(elem) {
    var r;
    var f = trigFilter(elem);
    var n = elem.nextElementSibling;
    var n2 = n.nextElementSibling;
    var new_elem;
    var temp;
    var frac;
    var frac_temp;

    switch (f.code) {
        // tan 1
        case 1:
            new_elem = mathmlCreateNode('mn', Math.tan(Number(f.n2[0].innerHTML)).toFixed(MATHMLJS.DECIMALS));
            r = 1;
            break;
            // tan \pi
        case 2:
            if (f.n2[0].innerHTML.trim().charCodeAt(0) === 960) {
                new_elem = mathmlCreateNode('mn', Math.tan(Math.PI).toFixed(MATHMLJS.DECIMALS));
                r = 1;
            } else {
                console.log('Unable to handle the parameter');
                r = 0;
            }
            break;
            // tan (2 \pi)
            // tan (x + y)
        case 3:
            switch (f.n2[1].innerHTML.trim().charCodeAt(0)) {
                case 43: // +
                    // tan (x + y) = (tan x + tan y) / (1 - tan x tan y)
                    new_elem = mathmlCreateNode('mrow', '');

                    frac = mathmlCreateNode('mfrac', '');
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = mathmlCreateNode('mn', 1);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    new_elem.appendChild(frac);

                    r = 1;
                    break;
                case 8722: // minus sign
                case 45: // "-" for nooby
                    // tan (x - y) = (tan x - tan y) / (1 + tan x tan y)
                    // sin (x - y) = cos x cos y + sin x sin y
                    new_elem = mathmlCreateNode('mrow', '');

                    frac = mathmlCreateNode('mfrac', '');
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2212');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    frac_temp = mathmlCreateNode('mrow', '');
                    temp = mathmlCreateNode('mn', 1);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u002B');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[0].innerHTML);
                    frac_temp.appendChild(temp);
                    temp = mathmlCreateNode('mo', '\u2062');
                    frac_temp.appendChild(temp);
                    temp = trigCreate('tan', f.n2[2].innerHTML);
                    frac_temp.appendChild(temp);
                    frac.appendChild(frac_temp);
                    new_elem.appendChild(frac);

                    r = 1;
                    break;
                case 215: // multiplication sign
                case 183: // middle dot
                case 8290: // invisible times
                    if (f.n2[2].nodeName === 'mi' &&
                        f.n2[2].innerHTML.trim().charCodeAt(0) === 960 &&
                        f.n2[0].nodeName === 'mn') {
                        new_elem = mathmlCreateNode('mn', Math.tan(Number(f.n2[0].innerHTML) * Math.PI).toFixed(MATHMLJS.DECIMALS));
                        r = 1;
                    } else {
                        console.log('Unable to handle the parameter');
                        r = 0;
                    }
                    break;
                default:
                    console.log('Not implement yet the operator \\u' + f.n2[1].innerHTML.trim().charCodeAt(0));
                    r = 0;
                    break;
            }
            break;
        default:
            console.log('Unable to handle the parameter');
            r = 0;
            break;
    }

    if (r === 1) {
        // Replace node and remove old ones
        jQuery(elem).replaceWith(new_elem);
        n.remove();
        n2.remove();
    }

    return r;
}
