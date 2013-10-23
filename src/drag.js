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

function handleDragStart(e) {
    dragData = this;

    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'copy';

    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragData != this) {
        var pthis = jQuery(this).parents('math');
        var pdrag = jQuery(dragData).parents('math');
        if (pthis[0].id == pdrag[0].id) {
            console.log('Drag and drop inside equation not implemented.')
        }
        else {
            if ((this.nodeName.toLowerCase() == 'mi' || this.nodeName.toLowerCase() == 'mn') &&
                (dragData.nodeName.toLowerCase() == 'mi' || dragData.nodeName.toLowerCase() == 'mn')) {
                var cdrag = dragData.cloneNode(true);
                jQuery(this).replaceWith(cdrag);
            }
            else {
                console.log('Drag and drop not implemented.')
            }
        }
    }

    e.preventDefault();
    return false;
}

function setDND(elem) {
    elem.setAttribute("draggable", "true");
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('drop', handleDrop, false);
}

