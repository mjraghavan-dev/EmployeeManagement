export const Numeric = (event) => {
    var x = event.charCode || event.keyCode;
    if (x > 47 && x < 58) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
};
export const Alphabetic = (event) => {
    var x = event.charCode || event.keyCode;
    if (
        (x > 96 && x < 123) ||
        (x > 64 && x < 91) ||
        x === 32 ||
        x === 46 || // dot "."
        x === 44 || // comma ","
        x === 95 || // underscore "_"
        x === 45
    ) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
};

export const AlphaNumeric = (event) => {
    var x = event.charCode || event.keyCode;
    if (
        (x > 96 && x < 123) ||
        (x > 64 && x < 91) ||
        x === 32 ||
        (x > 47 && x < 58) ||
        x === 46 || // dot "."
        x === 44 || // comma ","
        x === 95 || // underscore "_"
        x === 45
    ) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
};