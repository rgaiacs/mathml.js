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

// Rules for assumptios required

// mi element
function assum_mi(elem) {
    var n = elem.nextElementSibling;
    var r;
    if (n) {
        switch (n.nodeName.toLowerCase()) {
            case 'mo':
                var sn = jQuery.trim(n.innerHTML);
                var charcode = sn.charCodeAt(0);
                switch (charcode) {
                    case 8289:  // Function Aplication
                        r = 1;
                        break;
                    case 8290:  // Invisible times
                        r = 2;
                        break;
                    case 8291:  // Invisible separator
                        r = 3;
                        break;
                    default:
                        r = 0;
                        break;
                }
                break;
            default:
                r = 0;
                break;
        }
    }
    else {
        // No next sibling
        r = 0;
    }
    return r;
}
