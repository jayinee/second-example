(function(w, d) {

    /********RENDERING PRODUCT LIST*******/
    var promoCodes = {
        "10ONE": 0.90,
        "15GROUP": 0.85,
        "5ALL": 0.95
    }

    // Store result of GET request in productList.
    var productList = [{
        name: "Super Strength Elastic Resistance Bands",
        id: "rb001",
        price: "$ 59.99",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Black Mountain Resistance Bands",
        id: "rb002",
        price: "$ 15.99",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Phantom Fit Resistance Loops",
        id: "rb003",
        price: "$ 18.50",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Theraband Resistance Bands",
        id: "rb004",
        price: "$ 24.99",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Starwood Sports Resistance Bands",
        id: "rb005",
        price: "$ 5.00",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Woodridge Resistance Bands",
        id: "rb006",
        price: "$ 34.99",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Master of Muscle Resistance Bands",
        id: "rb007",
        price: "$ 12.67",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Serious Steel Resistance Bands",
        id: "rb008",
        price: "$ 36.50",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "Lim Exercise Resistance Bands",
        id: "rb009",
        price: "$ 24.99",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }, {
        name: "SPRI XER Tube Resistance Bands",
        id: "rb010",
        price: "$ 39.99",
        description: "Lorem ipsum dolor sit amet, conse ctetur adipisicing elit. Dolor emque, eum fuga! Enim nesciunt non dolorum excepturi quisquam iste.",
        image: "http://placehold.it/350x350"
    }]

    var prodContainer = d.getElementById("prodContainer");

    //Render an item for every object in productList

    if (productList) {
        productList.forEach(function(product) {
            var productHTML = "<div class='item' id=" + product.id + "><img class='item-img' id='' src=" + product.image + "><div class='content-wrap'><h4 class='name'>" + product.name + "</h4><h3 class='price'>" + product.price + "</h3><button class='btn orange add-margin'>Add To Cart</button><p class='description'>" + product.description + "</p></div></div>";
            prodContainer.innerHTML += productHTML;
        })
    }

    /*************CART CONTROLS*************/

    var closeCart = d.getElementById("closeCart"),
        showCart = d.getElementById("showCart"),
        cartWrapper = d.getElementById("cartWrapper");

    var toggleVisibility = function(target) {
        target.classList.toggle("hide");
    }

    closeCart.addEventListener("click", function() { toggleVisibility(cartWrapper) });
    showCart.addEventListener("click", function() { toggleVisibility(cartWrapper) });

    /************SHOPPING CART FEATURES**************/

    var cartContent = d.getElementById("cartItems"),
        cartTotal = d.getElementById("total-amount"),
        // The cart object holds the current state of the cart
        cart = {
            promoCode: "",
            items: [],
            total: 0
        };

    // Helper function to reverse lookup an array by product ID.
    // Returns the object containing the lookup ID.

    function lookupByIdProp(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) return array[i];
        }
    }

    //Renders the cart and updates the total price

    function renderCart() {
        var prices = [];

        cartContent.innerHTML = "";

        cart.items.forEach(function(item) {
            var itemPrice = parseFloat(item.price.replace("$ ", "")),
                itemQuantity = parseInt(item.quantity);

            prices.push(itemPrice * itemQuantity);
            cartContent.innerHTML += "<li class='cart-item' id='cart-" + item.id + "'><p class='cart-item-name'>" + item.name + "</p><img class='cart-item-img' src='http://vignette1.wikia.nocookie.net/clubpenguin/images/5/5f/Red_X.png/revision/latest?cb=20120514130731'><input type='number' class='inset quantity' min='0' max='50' value=" + item.quantity + "></li>";
        })

        var totalPrice = prices.reduce(function(a, b) {
            return a + b;
        }, 0);

        cart.total = totalPrice.toFixed(2);
        cartTotal.innerHTML = "$ " + cart.total;
    }

    // Constructor to add an item object to the cart

    function cartItem(id, name, quantity, price) {
        this.id = id,
            this.name = name,
            this.quantity = quantity
        this.price = price

        this.applyCode = function(percentage) {
            return this.price = "$ " + percentage * (this.price.replace("$ ", ""));
        }
    }

    //Listen for any additions to the cart.

    prodContainer.addEventListener("click", function(event) {
    	//Only fire if the button is clicked because placing the listener on prodContainer 
    	//fires it if clicked anywhere.
        if (event.target.classList.contains("btn", "orange")) {
            var itemId = event.target.parentNode.parentNode.id;
            var clickedItem = lookupByIdProp(productList, itemId);

            //When an item is added to the cart, create a new object for it
            //in the cart.items array. If it already exists, increment its quantity

            if (!lookupByIdProp(cart.items, itemId)) {
                cart.items.push(new cartItem(clickedItem.id, clickedItem.name, 1, clickedItem.price));
            } else {
                lookupByIdProp(cart.items, itemId).quantity++;
            }

            // Display SHOW CART button when an item is added to the cart

            if (cart.items.length !== 0) showCart.classList.remove("hide");

            renderCart();
        }
    })

    // Handle any quantity changes in the cart screen

    cartWrapper.addEventListener("change", function() {
        //Only fire if the input field is changed because placing the listener on cartWrapper 
        //fires it when anything is changed.
        if (event.target.classList.contains("inset")) {
            //Each cart item has an ID the same as the item ID prefixed with "cart-"
            //Extract the item ID from this string.
            var cartItemId = event.target.parentNode.id.substr(5, event.target.parentNode.id.length - 1);

            //Use it to lookup the same item in the cart array. Adjust its quantity as desired.

            lookupByIdProp(cart.items, cartItemId).quantity = event.target.value;

            //Remove the item if its quantity is 0

            if (event.target.value === "0") {
                for (var i = 0; i < cart.items.length; i++) {
                    if (cart.items[i].id === cartItemId) {
                        cart.items.splice(i, 1);
                    }
                }
            };

            renderCart();
        }
    });

    // Handle remove button. When clicked, splice out the associated object from the carts array.

    cartWrapper.addEventListener("click", function() {
        if (event.target.classList.contains("cart-item-img")) {
            var cartItemId = event.target.parentNode.id.substr(5, event.target.parentNode.id.length - 1);

            for (var i = 0; i < cart.items.length; i++) {
                if (cart.items[i].id === cartItemId) {
                    cart.items.splice(i, 1);
                }
            }

            renderCart();
        }
    })

    // Handle Promo Codes

    /*
	Note: I was unable to implement the final requirement with the way I had structured the rest of the application:
	"Only apply a promo code if it makes the total price less than the total price with the current promo code"
    */

    var applyPromo = d.getElementById("applyPromo"),
        promoInput = d.getElementById("promoCode");


    applyPromo.addEventListener("mousedown", function() {
        var enteredCode = "";
        for (var code in promoCodes) {
            if (promoInput.value === code) {
                enteredCode = promoInput.value;
            }
        }

        if (cart.promoCode === "") {
            switch (enteredCode) {
                case "5ALL":
                    for (var i = 0; i < cart.items.length; i++) {
                        cart.items[i].applyCode(promoCodes["5ALL"]);
                    }
                    cart.promoCode = "5ALL";
                    renderCart();
                    break;

                case "10ONE":
                    for (var i = 0; i < cart.items.length; i++) {
                        if (cart.items[i].id === "rb001") {
                            cart.items[i].applyCode(promoCodes["10ONE"]);
                        }
                    }
                    cart.promoCode = "10ONE";
                    renderCart();
                    break;

                case "15GROUP":
                    for (var i = 0; i < cart.items.length; i++) {
                        if (cart.items[i].id === "rb005" || cart.items[i].id === "rb006" || cart.items[i].id === "rb007") {
                            cart.items[i].applyCode(promoCodes["15GROUP"]);
                        }
                    }
                    cart.promoCode = "15GROUP";
                    renderCart();

                default:
                    cart.promoCode = "";
                    renderCart();
            }
        }
    })



})(window, document)
