function opPlusMiMi(elem) {
  var p = elem.previousElementSibling;
  var n = elem.nextElementSibling;

  if (p.innerHTML === n.innerHTML) {
    // Create node to replace
    var new_elem = document.createElement('mrow');
    setMouseover(new_elem);
    var mn = document.createElement('mn');
    setMouseover(mn);
    mn.innerHTML = 2;
    new_elem.appendChild(mn);
    var mo = document.createElement('mo');
    setMouseover(mo);
    mo.innerHTML = '\u2062'
    new_elem.appendChild(mo);
    var mi = document.createElement('mi');
    setMouseover(mi);
    mi.innerHTML = p.innerHTML;
    new_elem.appendChild(mi);

    // Replace node and remove old ones
    jQuery(p).replaceWith(new_elem);
    n.remove();
    elem.remove();
  }
}

function opPlusMnMn(elem) {
  var p = elem.previousElementSibling;
  var n = elem.nextElementSibling;

  // Create node to replace
  var new_elem = document.createElement('mn');
  new_elem.innerHTML = Number(p.innerHTML) + Number(n.innerHTML);

  // Replace node and remove old ones
  setMouseover(new_elem);
  jQuery(p).replaceWith(new_elem);
  n.remove();
  elem.remove();
}

function opPlusMrowMrow(elem) {
}

// Return a has based on the sibling of a plus sign
function opPlusSiblingHash(elem) {
  var p = elem.previousElementSibling.localName;
  var n = elem.nextElementSibling.localName;
  if (p === 'mi' && n === 'mi')
    return 1;
  else if (p == 'mn' && n === 'mn')
    return 2;
  else if (p == 'mrow' && n === 'mrow')
    return 3;
  else
    return 0;
}

// Handle the double click in a plus sign
function opPlus(elem) {
  var h = opPlusSiblingHash(elem);
  switch (h) {
    case 0:
      break;
    case 1:
      opPlusMiMi(elem);
      break;
    case 2:
      opPlusMnMn(elem);
      break;
    case 3:
      opPlusMrowMrow(elem);
      break;
  }
}
