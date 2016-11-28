(function(window) {
    var validator = {};

    validator.isEmailAddress = function(input) {
        var split = input.split("@"),
            domain = split[1];

        if (input.indexOf("@") === -1) return false // "Not a valid email address";
        if (domain.split(".").length > 2) return false // "Not a valid domain";
        if (domain.indexOf(".") <= 0) return false // "Not a valid domain"; - One period must exist and it cannot be the first character
        if (domain.indexOf(".") > domain.length - 3) return false // "Not a valid domain"; - TLD must be at least two characters

        return true;
    };

    validator.isPhoneNumber = function(input) {
        var formatted = input.replace("+", "00"),
            splitStr = formatted.split(""),
            splitNum = [],
            countryCode = formatted.slice(0, 5),
            phoneNum = formatted.slice(5, formatted.length);

        //Check if any character is not a number
        splitStr.forEach(function(x) {
            splitNum.push(parseInt(x));
        });
        if (splitNum.indexOf(NaN) !== -1) return false // "Not a valid phone number";

        if (countryCode !== "00372") return false // "Country code must be +372 or 00372";
        if (phoneNum.length < 7 || phoneNum.length > 8) return false // "Wrong number of digits"; //Estonian phone numbers can only be 7 or 8 digits

        return true;
    };

    validator.withoutSymbols = function(input) {
        var reference = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

        var inputArr = input.split("");

        //Replace hiphens with spaces
        for (var j = 0; j < inputArr.length; j++) {
            if (inputArr[j] === "-") {
                inputArr[j] = " ";
            }
        }

        //Remove symbols
        for (var i = 0; i < inputArr.length; i++) {
            if (reference.indexOf(inputArr[i]) === -1) inputArr[i] = "";
        }

        return inputArr.join("");
    };

    validator.isDate = function(input) {
        return !isNaN(Date.parse(input));
    };

    validator.isBeforeDate = function(input, reference) {
        if (!isNaN(Date.parse(input)) && !isNaN(Date.parse(reference))) {
            return (Date.parse(input) < Date.parse(reference));
        } else throw "One of the dates is invalid";
    };

    validator.isAfterDate = function(input, reference) {
        if (!isNaN(Date.parse(input)) && !isNaN(Date.parse(reference))) {
            return (Date.parse(input) > Date.parse(reference));
        } else throw "One of the dates is invalid";
    };

    validator.isBeforeToday = function(input) {
        if (!isNaN(Date.parse(input))) {
            return (Date.parse(input) < Date.now());
        } else throw "Invalid date";
    };

    validator.isAfterToday = function(input) {
        if (!isNaN(Date.parse(input))) {
            return (Date.parse(input) > Date.now());
        } else throw "Invalid date";
    };

    validator.isEmpty = function(input) {
        if (typeof input !== "string") return false;
        if (input === "") return true;

        var inputArr = input.split("");
        for (var i = 0; i < inputArr.length; i++) {
            if (inputArr[i] !== " ") return false;
        }

        return true;
    };

    validator.contains = function(input, words) {
        var strippedArr = this.withoutSymbols(input).toLowerCase().split(" ");
        var exists = false;

        for (var i = 0; i < words.length; i++) {
            if (strippedArr.indexOf(words[i]) !== -1) exists = true;
        }

        return exists;
    };

    validator.lacks = function(input, words) {
        var strippedArr = this.withoutSymbols(input).toLowerCase().split(" ");
        var doesNotExist = false;

        for (var i = 0; i < words.length; i++) {
            if (strippedArr.indexOf(words[i]) === -1) doesNotExist = true;
        }

        return doesNotExist;
    };

    validator.isComposedOf = function(input, strings) {
    	//Sorting strings array by length to avoid error when strings have similar characters but different lengths
        strings.sort(function(a, b) {
            return b.length - a.length;
        });
        //Remove strings if they match. Decrement counter to check for repeated occurrences of the same string.
        for (var i = 0; i < strings.length; i++) {
            if (input.indexOf(strings[i]) !== -1) {
                input = input.replace(strings[i], "");
                i--;
            }
        }
        //Remove remaining symbols and trim so that periods and spaces don't affect the output.
        input = this.withoutSymbols(input.trim());
        
        return input === "";
    };

    validator.isLength = function(input, n) {
        return input.length <= n;
    };

    validator.isOfLength = function(input, n) {
        return input.length >= n;
    };

    validator.countWords = function(input) {
        return this.withoutSymbols(input).split(" ").length;
    };

    validator.lessWordsThan = function(input, n) {
        return (this.countWords(input) <= n);
    };

    validator.moreWordsThan = function(input, n) {
        return (this.countWords(input) >= n);
    };

    validator.isBetween = function(input, floor, ceiling) {
        return ((input >= floor) && (input <= ceiling));
    };

    validator.isAlphaNumeric = function(input) {
        var reference = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var inputArr = input.split("");
        for (var i = 0; i < inputArr.length; i++) {
            if (reference.indexOf(inputArr[i]) === -1) return false;
        }

        return true;
    };

    validator.isCreditCard = function(input) {
        var inputArr = input.split(""),
            formatted;

        for (var i = 0; i < inputArr.length; i++) {
            if (inputArr[i] === "-") inputArr[i] = "";
        }

        formatted = inputArr.join("");

        return this.isAlphaNumeric(formatted) && (formatted.length === 16);
    };

    validator.isHex = function(input) {
        var reference = "0123456789ABCDEFabcdef",
            hash = input.slice(0, 1),
            value = input.slice(1, input.length);

        if (hash !== "#") return false // "Hex color must begin with #";

        if (value.length !== 3 && value.length !== 6) return false // "Value must be 3 or 6 characters";

        for (var i = 0; i < value.length; i++) {
            if (reference.indexOf(value.charAt(i)) === -1) return false;
        }

        return true;
    };

    validator.isRGB = function(input) {

        var valStart = input.indexOf("(") + 1,
            valEnd = input.indexOf(")"),
            value = input.slice(valStart, valEnd).split(",");

        if (input.slice(0, 4) !== "rgb(" || input.charAt(input.length - 1) !== ")") return false; //Check value wrapping

        if (value.length !== 3) return false; //Check that there are only 3 color values

        //Check that the values are valid numbers between 0 and 255
        for (var i = 0; i < value.length; i++) {
            if (isNaN(value[i]) || value[i] < 0 || value[i] > 255) return false;
        }

        return true;
    };

    validator.isHSL = function(input) {
        var valStart = input.indexOf("(") + 1,
            valEnd = input.indexOf(")"),
            value = input.slice(valStart, valEnd).split(",");

        if (input.slice(0, 4) !== "hsl(" || input.charAt(input.length - 1) !== ")") return false; //Check value wrapping
        if (value.length !== 3) return false; //Check that there are only 3 color values
        if (isNaN(value[0]) || value[0] < 0 || value[0] > 360) return false;
        if (isNaN(value[1]) || value[1] < 0 || value[1] > 1) return false;
        if (isNaN(value[2]) || value[2] < 0 || value[2] > 1) return false;

        return true;
    };

    validator.isColor = function(input) {
        return this.isRGB(input) || this.isHex(input) || this.isHSL(input);
    };

    validator.isTrimmed = function(input) {
        var inputSplit = input.split(" ");
        // Check for leading and trailing whitespace
        if (input.charAt(0) === " " || input.charAt(input.length - 1) === " ") return false;
        //Empty strings after splitting the string by spaces indicates excess white spaces
        for (var i = 0; i < inputSplit.length; i++) {
            if (inputSplit[i] === "") return false;
        }

        return true;
    };

    window.validator = validator;

})(window);
