(function(w, d) {
    /*
    I found the constraints API limiting and the inconsistent style of messages did not provide a good UX across browsers.
    So I went ahead and implemented my own validation methods to behave in a manner similar 
    to how I've seen validation work on websites like twitter/ facebook, etc.
    */


    /*
    The setValidity function manipulates the contents of the error nodes in the form.
    It either displays a message or hides the element.
    */

    function setValidity(element, validity, msg) {
        var container = element.nextElementSibling;

        if (!validity) {
            container.innerHTML = "<i class='fa fa-times'></i>" + msg;
            container.style.color = "#E84C3D";
            container.style.display = "table";
        } else {
            container.style.display = "none";
        }
    }

    /*
	This is a final test that checks the validity of all the input fields when the 
	submit button is clicked. If any field is invalid, it prevents the form submission.
    */

    function submissionCheck(event, state) {
        var result = true;
        for (var i in state) {
            if (state[i] === false) result = false;
        }

        if (!result) {
            event.preventDefault();
            setValidity(submit, false, "Please check the hints for errors. All fields are required.")
        }
    }

    /*BILLING AND SHIPPING ADDRESS FORM*/

    function address() {
        var firstName1 = d.getElementById("bl-firstname"),
            lastName1 = d.getElementById("bl-lastname"),
            address1 = d.getElementById("bl-address"),
            city1 = d.getElementById("bl-city"),
            country1 = d.getElementById("bl-country")

        firstName2 = d.getElementById("sh-firstname"),
            lastName2 = d.getElementById("sh-lastname"),
            address2 = d.getElementById("sh-address"),
            city2 = d.getElementById("sh-city"),
            country2 = d.getElementById("sh-country"),

            match = d.getElementById("match"),
            submit = d.getElementById("submit"),
            form = d.querySelector(".address-form");

        /*
		The state variable holds the state of validity of each input field.
		It is updated every time an input event is fired on a field.
		The final submit event only fires if all its properties are true.
        */

        var state = {
            firstName1: false,
            firstName2: false,
            lastName1: false,
            lastName2: false,
            address1: false,
            address2: false,
            city1: false,
            city2: false,
            country1: false,
            country2: false
        }

        /*
		Each validation function has two arguments.
		"obj" refers to the element/object calling the function.
		"prop" is a string with the same name as the calling object to set its associated state property.
        */

        function checkName(obj, prop) {
            if (validator.isEmpty(obj.value)) {
                state[prop] = false;
                return setValidity(obj, false, "Name cannot be empty")
            };
            if (!validator.isOfLength(obj.value, 2)) {
                state[prop] = false;
                return setValidity(obj, false, "Name too short")
            };
            state[prop] = true;
            setValidity(obj, true)
        };

        firstName1.addEventListener("input", function() { checkName(this, "firstName1"); });
        firstName2.addEventListener("input", function() { checkName(this, "firstName2"); });
        lastName1.addEventListener("input", function() { checkName(this, "lastName1"); });
        lastName2.addEventListener("input", function() { checkName(this, "lastName2"); });

        function checkAddress(obj, prop) {
            if (validator.isEmpty(obj.value)) {
                state[prop] = false;
                return setValidity(obj, false, "Address cannot be empty")
            };
            if (!validator.isOfLength(obj.value, 10)) {
                state[prop] = false;
                return setValidity(obj, false, "Please enter a valid address")
            };
            state[prop] = true;
            setValidity(obj, true)
        }

        address1.addEventListener("input", function() { checkAddress(this, "address1"); });
        address2.addEventListener("input", function() { checkAddress(this, "address2"); });

        function checkCity(obj, prop) {
            if (validator.isEmpty(obj.value)) {
                state[prop] = false;
                return setValidity(obj, false, "City cannot be empty")
            };
            if (!validator.isOfLength(obj.value, 3)) {
                state[prop] = false;
                return setValidity(obj, false, "Please enter a valid city")
            };
            state[prop] = true;
            setValidity(obj, true)
        }

        city1.addEventListener("input", function() { checkCity(this, "city1"); });
        city2.addEventListener("input", function() { checkCity(this, "city2"); });

        function checkCountry(obj, prop) {
            if (validator.isEmpty(obj.value)) {
                state[prop] = false;
                return setValidity(obj, false, "Country cannot be empty")
            };
            if (!validator.isOfLength(obj.value, 3)) {
                state[prop] = false;
                return setValidity(obj, false, "Please enter a valid country")
            };
            state[prop] = true;
            setValidity(obj, true)
        }

        country1.addEventListener("input", function() { checkCountry(this, "country1"); });
        country2.addEventListener("input", function() { checkCountry(this, "country2"); });

        form.addEventListener("submit", function() { submissionCheck(event, state) });


        /*
		The checkbox logic is rather straightforward. When the box is checked, all billing address fields
		are first evaluated for validity. If invalid, an error message is displayed. If valid, all values 
		are copied into the corresponding shipping address fields. Care has been taken to reset state when unchecked.
        */

        var matchState = false;

        match.addEventListener("change", function() {
            matchState = !matchState;
            if (matchState) {
                if (!state.firstName1 || !state.lastName1 || !state.address1 || !state.city1 || !state.country1) {
                    setValidity(match, false, "Check all fields in the Billing Address")
                } else {
                    firstName2.value = firstName1.value;
                    lastName2.value = lastName1.value;
                    address2.value = address1.value;
                    city2.value = city1.value;
                    country2.value = country1.value;

                    state.firstName2 = state.lastName2 = state.address2 = state.city2 = state.country2 = true;
                }
            } else {
                setValidity(match, true);
                firstName2.value = lastName2.value = address2.value = city2.value = country2.value = "";
                state.firstName2 = state.lastName2 = state.address2 = state.city2 = state.country2 = false;
            }
        })
    }

    if (d.querySelector(".address-form")) address();

    /*COLOR BUILDER*/

    function colorBuilder() {
        var red = d.getElementById("red"),
            green = d.getElementById("green"),
            blue = d.getElementById("blue"),
            alpha = d.getElementById("alpha");

        var form = d.querySelector(".color-builder");

        red.addEventListener("input", function() {
            d.getElementById("red-op").innerHTML = red.value;
        });
        green.addEventListener("input", function() {
            d.getElementById("green-op").innerHTML = green.value;
        });
        blue.addEventListener("input", function() {
            d.getElementById("blue-op").innerHTML = blue.value;
        });
        alpha.addEventListener("input", function() {
            d.getElementById("alpha-op").innerHTML = alpha.value;
        });

        form.addEventListener("input", function() {
            d.getElementById("result").style.backgroundColor = "rgba(" + red.value + ", " + green.value + "," + blue.value + "," + alpha.value + ")";
        });
    }

    if (d.querySelector(".color-builder")) colorBuilder();

    /*CREDIT CARD FORM*/

    function creditCard() {
        var name = d.getElementById("name"),
            number = d.getElementById("number"),
            month = d.getElementById("month"),
            year = d.getElementById("year"),
            cvv = d.getElementById("cvv"),

            form = d.querySelector(".credit-card"),
            submit = d.querySelector(".btn");

        var state = {
            name: false,
            number: false,
            month: false,
            year: false,
            cvv: false
        }

        name.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.name = false;
                return setValidity(this, false, "Name cannot be empty");
            }
            if (validator.isLength(this.value, 2)) {
                state.name = false;
                return setValidity(this, false, "Name too short!");
            }

            state.name = true;
            setValidity(this, true);
        });

        number.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.number = false;
                return setValidity(this, false, "Credit Card cannot be empty");
            }
            if (!validator.isCreditCard(this.value)) {
                state.number = false;
                return setValidity(this, false, "Not a valid credit card number")
            }

            state.number = true;
            setValidity(this, true);
        });

        month.addEventListener("change", function() { state.month = true });
        year.addEventListener("change", function() { state.year = true });

        cvv.addEventListener("input", function() {
            if (!validator.isOfLength(this.value, 3)) {
                state.cvv = false;
                return setValidity(this, false, "Must be 3 digits");
            }

            state.cvv = true;
            return setValidity(this, true);
        });

        form.addEventListener("submit", function() { submissionCheck(event, state) });
    }

    if (d.querySelector(".credit-card")) creditCard();

    /*LOGIN FORM*/

    function loginForm() {
        var username = d.getElementById("username"),
            email = d.getElementById("email"),
            password = d.getElementById("password"),

            submit = d.getElementById("submit"),
            form = d.querySelector(".login");

        var state = {
            username: false,
            email: false,
            password: false
        }

        username.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.username = false;
                return setValidity(this, false, "Username cannot be empty");
            };
            if (validator.isLength(this.value, 2)) {
                state.username = false;
                return setValidity(this, false, "Username too short!");
            };
            if (!validator.isAlphaNumeric(this.value)) {
                state.username = false;
                return setValidity(this, false, "Username should contain only alphabets and numbers");
            };
            state.username = true;
            return setValidity(this, true);
        });

        email.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.email = false;
                return setValidity(this, false, "Email cannot be empty");
            };
            if (!validator.isEmailAddress(this.value)) {
                state.email = false;
                return setValidity(this, false, "Not a valid email");
            }
            state.email = true;
            return setValidity(this, true);
        });

        password.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.password = false;
                return setValidity(this, false, "Password required");
            };
            if (!validator.isOfLength(this.value, 6)) {
                state.password = false;
                return setValidity(this, false, "Password must be at least 6 characters");
            }
            state.password = true;
            return setValidity(this, true);
        });

        form.addEventListener("submit", function() { submissionCheck(event, state) });
    };

    if (d.querySelector(".login")) loginForm();

    /*SCHEDULING FORM*/

    function scheduleForm() {
    	var date = d.getElementById("date"),
    		time = d.getElementById("time"),
    		zone = d.getElementById("zone"),
    		phone = d.getElementById("phone"),
    		email = d.getElementById("email"),
    		msg = d.getElementById("msg"),

    		form = d.querySelector(".scheduler"),
    		submit = d.getElementById("submit");

    	var state = {
    		date: false,
    		time: false,
    		zone: false,
    		phone: false,
    		email: false
    	}
    	
    	date.addEventListener("input", function() { return state.date = true });
    	time.addEventListener("input", function() { return state.time = true });
    	zone.addEventListener("input", function() { return state.zone = true });

    	phone.addEventListener("input", function() {
    		if (validator.isEmpty(this.value)) {
                state.email = false;
                return setValidity(this, false, "Phone number is required");
            };
    		if(!validator.isPhoneNumber(this.value)) {
    			state.phone = false;
    			return setValidity(this, false, "Not a valid phone number");
    		}

    		state.phone = true;
    		setValidity(this, true);
    	});

    	email.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.email = false;
                return setValidity(this, false, "Email cannot be empty");
            };
            if (!validator.isEmailAddress(this.value)) {
                state.email = false;
                return setValidity(this, false, "Not a valid email");
            }
            state.email = true;
            return setValidity(this, true);
        });

    	form.addEventListener("submit", function() { submissionCheck(event, state) });
    };

    if (d.querySelector(".scheduler")) scheduleForm();

    function signupForm() {
    	var firstName = d.getElementById("firstName"),
    		lastName = d.getElementById("lastName"),
    		email = d.getElementById("email"),
    		birthday = d.getElementById("birth"),
    		password = d.getElementById("password"),

    		form = d.querySelector(".signup"),
    		submit = d.getElementById("submit");

    	var state = {
    		firstName: false,
    		lastName: false,
    		email: false,
    		birthday: false,
    		password: false
    	}

    	function checkName(obj, prop) {
            if (validator.isEmpty(obj.value)) {
                state[prop] = false;
                return setValidity(obj, false, "Name cannot be empty")
            };
            if (!validator.isOfLength(obj.value, 2)) {
                state[prop] = false;
                return setValidity(obj, false, "Name too short")
            };
            state[prop] = true;
            setValidity(obj, true);
        };

        email.addEventListener("input", function() {
            if (validator.isEmpty(this.value)) {
                state.email = false;
                return setValidity(this, false, "Email cannot be empty");
            };
            if (!validator.isEmailAddress(this.value)) {
                state.email = false;
                return setValidity(this, false, "Not a valid email");
            }
            state.email = true;
            return setValidity(this, true);
        });

        birthday.addEventListener("input", function() { return state.birthday = true });

        password.addEventListener("input", function() {
        	if(!validator.isOfLength(this.value, 6)) {
        		state.password = false;
        		return setValidity(this, false, "Password must be at least 6 characters long");
        	}
        	state.password = true;
        	return setValidity(this, true);
        });

    	firstName.addEventListener("input", function() { checkName(this, "firstName"); });
        lastName.addEventListener("input", function() { checkName(this, "lastName"); });

        form.addEventListener("submit", function() { submissionCheck(event, state); console.log(state); });
    }

    if(d.querySelector(".signup")) signupForm();

})(window, document)
