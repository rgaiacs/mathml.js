// Rules for assumptios required

// mi element
function assum_mi(elem) {
    var n = elem.nextElementSibling;
    if (n) {
        var r = null;  // Return value
        switch (n.localName) {
            case 'mo':
                var sn = jQuery.trim(n.innerHTML);
                var charcode = sn.charCodeAt(0);
                console.log('Operator with charcode ' + charcode + ' not support');
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
                console.log('Can make any assumption.');
                r = -1;
                break;
        }
        return r;
    }
    else {
        // No next sibling
        return 0;
    }
}
