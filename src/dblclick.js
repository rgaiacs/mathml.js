// Replace mi with mn
function replaceMiByMn(mi, mn_val) {
    var new_elem = document.createElement('mn');
    new_elem.innerHTML = mn_val;
    setMouseover(new_elem);
    jQuery(mi).replaceWith(new_elem);
}

// Handle "var" double click
function varDblclick(elem) {
    var sym = jQuery.trim(elem.innerHTML);
    switch (jQuery.trim(sym.charCodeAt(0))) {
        case 2148:  // double-struck italic small i
            console.log('The imaginary constant.')
            break;
        case 960:  // greek small letter pi
            var val = prompt('Replace ' + elem.innerHTML + ' by:', '3.14');
            replaceMiByMn(elem, val);
            break;
        case 2147:  // double-struck italic small e
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
            }
            else {
                console.log('Prompt have been cancel.');
            }
            break;
    }
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
        case 0:  // var
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
}

// Handle for double click in mo element
function moDblclick(e) {
    var op = jQuery.trim(this.innerHTML);
    switch (op.charCodeAt(0)) {
        case 43:  // +
            opPlus(this);
            break;
        case 8722:  // minus sign
        case 45:  // "-" for nooby
            moUnsuport(this);
            break;
        case 215:  // multiplication sign
        case 183:  // middle dot
            moUnsuport(this);
            break;
        case 247:  // division sign
        case 8725:  // division slash
        case 47:  // "/" for nooby
            moUnsuport(this);
            break;
        default:
            moUnsuport(this);
            break;
    }
    e.stopPropagation();
    e.preventDefault()
}

// Setup all mouseover
function setDblclick(elem) {
    switch (elem.localName) {
        case 'mi':
            elem.addEventListener('dblclick', miDblclick, false);
            break;
        case 'mo':
            elem.addEventListener('dblclick', moDblclick, false);
            break;
    }
}

