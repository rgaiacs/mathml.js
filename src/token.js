// Parse element and set informations

function setTokenType(elem) {
    var tl = null;  // Will store token level
    switch (elem.localName) {
        case 'mi':
            t = 0;
            break;
        case 'mn':
            t = 0;
            break;
        case 'mrwo':
            t = 1;
            break;
        case 'mfenced':
            t = 1;
            break;
    }
}
