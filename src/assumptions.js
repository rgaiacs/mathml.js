// Rules for assumptios required

// mi element
function assum_mi(elem) {
    var n = elem.nextElementSibling;
    if (n) {
        var r = null;  // Return value
        switch (n.localName) {
            case 'mo':
                sn = jQuery.trim(n.innerHTML);
                switch (sn.charCodeAt(0)) {
                    case 2061:  // Function Aplication
                        r = 1;
                        break;
                    case 2062:  // Invisible times
                        r = 2;
                        break;
                    case 2063:  // Invisible separator
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
