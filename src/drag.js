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
    console.log('Drag iniciado.');

    dragData = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        console.log('handleDragOver go to preventDefault.');
        e.preventDefault();
    }

    console.log('handleDragOver change dropEffect.');
    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        console.log('handleDrop go to stopPropagation.');
        e.stopPropagation();
    }

    if (dragData != this) {
        dragData.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    console.log('handleDrop return false.');
    return false;
}

function dnd_tag(tag) {
    var elem = document.getElementsByTagName(tag);
    for(var i = 0; i < elem.length; i++) {
        elem[i].setAttribute("draggable", "true");
        elem[i].addEventListener('dragstart', handleDragStart, false);
        elem[i].addEventListener('dragover', handleDragOver, false);
        elem[i].addEventListener('drop', handleDrop, false);
        console.log('Added events.');
    }
}

