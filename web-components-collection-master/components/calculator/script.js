(function(w, d) {

    var digits = d.querySelectorAll(".digit"),
    	symbols = d.querySelectorAll(".symbol"),
    	result = d.getElementById("result"),
    	history = d.getElementById("history"),
    	equals = d.getElementById("btn-eq"),
    	clear = d.getElementById("btn-cl"),
    	del = d.getElementById("btn-del");

    digits.forEach(function(digit) {
        digit.addEventListener("click", function() {
            result.value = (result.value === "0") ? this.innerHTML : result.value + this.innerHTML;
            history.value += this.innerHTML;
        })
    });

    symbols.forEach(function(symbol) {
        symbol.addEventListener("click", function() {
            if (history.value === "" || history.value.substr(history.value.length-1, history.value.length-2) === " ") {
                return null;
            } else {
                history.value = history.value + " " + this.innerHTML + " ";
                result.value = "0";
            }
        })
    })

    equals.addEventListener("click", function() {
        var input = history.value;
        var replaceDiv = input.replace(/\u00F7/g, "/");
    	var replaceMul = replaceDiv.replace(/\u00D7/g, "*");
        result.value = eval(replaceMul);
    });

    clear.addEventListener("click", function() {
        history.value = "";
        result.value = "0";
    });

    del.addEventListener("click", function() {
    	var val = history.value;
    	/*
		If the last char in history is not a space, delete 
		the last char. Else (if it is a symbol), delete 3 chars.
    	*/
        if (val.charAt(val.length - 1) !== " ") {
            if (val.length !== 1) {
                val = val.substr(0, val.length - 1);
            } else {
                val = "";
            }
        } else {
            val = val.substr(0, val.length - 3);
        }

        history.value = val;
    })


})(window, document)
