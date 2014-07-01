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

// Parse element and set informations

function setTokenType(elem) {
    var token = null; // Will store token level
    switch (elem.nodeName.toLowerCase()) {
        case 'mi':
            token = 0;
            break;
        case 'mn':
            token = 0;
            break;
        case 'mrwo':
            token = 1;
            break;
        case 'mfenced':
            token = 1;
            break;
    }
}
