
/* =====================================================
   FOODIE FOOD DELIVERY WEBSITE
   JAVASCRIPT FILE
   ===================================================== */


/* ================= CART ================= */

let cart = [];

const addButtons = document.querySelectorAll(".add-btn");
const cartButton = document.querySelector(".cart-btn");


/*
   Add food item to cart
*/

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const foodCard = button.closest(".food-card");

        const foodName =
            foodCard.querySelector("h3").textContent;

        const foodPrice =
            foodCard.querySelector(".food-bottom strong").textContent;

        const existingItem = cart.find(
            item => item.name === foodName
        );


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: foodName,
                price: foodPrice,
                quantity: 1
            });

        }


        updateCart();

        button.textContent = "✓ Added";

        setTimeout(() => {
            button.textContent = "+ Add";
        }, 1000);

    });

});


/*
   Update cart button
*/

function updateCart() {

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartButton.innerHTML = `🛒 Cart (${totalItems})`;

}


/* ================= CART WINDOW ================= */


/*
   Create cart popup
*/

cartButton.addEventListener("click", () => {

    showCart();

});


function showCart() {

    const oldCart = document.querySelector(".cart-popup");

    if (oldCart) {
        oldCart.remove();
    }


    const cartPopup = document.createElement("div");

    cartPopup.classList.add("cart-popup");


    let cartHTML = `
        <div class="cart-content">

            <div class="cart-header">
                <h2>🛒 Your Cart</h2>

                <button class="close-cart">
                    ×
                </button>
            </div>
    `;


    if (cart.length === 0) {

        cartHTML += `
            <div class="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some delicious food!</p>
            </div>
        `;

    } else {

        let total = 0;


        cart.forEach((item, index) => {

            const numericPrice =
                parseInt(item.price.replace("₹", ""));

            total += numericPrice * item.quantity;


            cartHTML += `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <h3>${item.name}</h3>

                        <p>${item.price} each</p>

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>


                    <strong>
                        ₹${numericPrice * item.quantity}
                    </strong>

                </div>

            `;

        });


        cartHTML += `

            <div class="cart-total">

                <span>Total</span>

                <strong>₹${total}</strong>

            </div>


            <button class="checkout-btn"
                onclick="checkout()">

                Proceed to Checkout

            </button>

        `;

    }


    cartHTML += `
        </div>
    `;


    cartPopup.innerHTML = cartHTML;

    document.body.appendChild(cartPopup);


    /* Close button */

    const closeButton =
        cartPopup.querySelector(".close-cart");

    closeButton.addEventListener("click", () => {
        cartPopup.remove();
    });


    /* Close when clicking outside */

    cartPopup.addEventListener("click", (event) => {

        if (event.target === cartPopup) {
            cartPopup.remove();
        }

    });

}


/* ================= QUANTITY ================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

    showCart();

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "🎉 Order placed successfully!\n\n" +
        "Thank you for ordering from Foodie!"
    );


    cart = [];

    updateCart();

    const cartPopup =
        document.querySelector(".cart-popup");

    if (cartPopup) {
        cartPopup.remove();
    }

}


/* ================= SEARCH ================= */

const searchInput =
    document.querySelector(".search-box input");

const searchButton =
    document.querySelector(".search-box button");


function searchFood() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const foodCards =
        document.querySelectorAll(".food-card");


    if (searchText === "") {

        foodCards.forEach(card => {
            card.style.display = "block";
        });

        return;

    }


    let found = false;


    foodCards.forEach(card => {

        const foodName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const description =
            card.querySelector("p")
                .textContent
                .toLowerCase();


        if (
            foodName.includes(searchText) ||
            description.includes(searchText)
        ) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (!found) {

        alert(
            `Sorry! We couldn't find "${searchInput.value}".`
        );

    }

}


searchButton.addEventListener(
    "click",
    searchFood
);


searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchFood();

        }

    }
);


/* ================= FAVORITES ================= */

const favoriteButtons =
    document.querySelectorAll(".favorite");


favoriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.textContent === "♡") {

            button.textContent = "♥";

            button.style.color = "#ff5a1f";

        } else {

            button.textContent = "♡";

            button.style.color = "#555";

        }

    });

});


/* ================= LOGIN ================= */

const loginButton =
    document.querySelector(".login-btn");


loginButton.addEventListener("click", () => {

    alert(
        "👋 Welcome to Foodie!\n\n" +
        "Login functionality can be connected " +
        "to a backend later."
    );

});


/* ================= NEWSLETTER ================= */

const newsletterForm =
    document.querySelector(".newsletter-form");


newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const emailInput =
        newsletterForm.querySelector("input");


    const email =
        emailInput.value.trim();


    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    if (!email.includes("@")) {

        alert("Please enter a valid email address.");

        return;

    }


    alert(
        "🎉 Thank you for subscribing to Foodie!"
    );


    emailInput.value = "";

});


/* ================= VIEW ALL BUTTONS ================= */

const viewAllButtons =
    document.querySelectorAll(".section-heading a");


viewAllButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const menuSection =
            document.querySelector("#menu");

        menuSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* ================= ADD CART POPUP CSS ================= */


/*
   JavaScript creates the cart popup dynamically.
   The following CSS is added automatically.
*/

const cartStyles = document.createElement("style");

cartStyles.textContent = `

    .cart-popup {

        position: fixed;

        inset: 0;

        background: rgba(0, 0, 0, 0.55);

        display: flex;

        justify-content: flex-end;

        z-index: 5000;

    }


    .cart-content {

        width: 420px;

        max-width: 95%;

        height: 100%;

        background: white;

        padding: 25px;

        overflow-y: auto;

        animation: slideCart 0.3s ease;

    }


    @keyframes slideCart {

        from {

            transform: translateX(100%);

        }

        to {

            transform: translateX(0);

        }

    }


    .cart-header {

        display: flex;

        justify-content: space-between;

        align-items: center;

        border-bottom: 1px solid #eee;

        padding-bottom: 18px;

        margin-bottom: 20px;

    }


    .cart-header h2 {

        font-size: 22px;

    }


    .close-cart {

        width: 35px;

        height: 35px;

        border-radius: 50%;

        background: #f2f2f2;

        font-size: 24px;

    }


    .empty-cart {

        text-align: center;

        padding: 70px 20px;

        color: #777;

    }


    .empty-cart div {

        font-size: 70px;

        margin-bottom: 15px;

    }


    .cart-item {

        display: grid;

        grid-template-columns: 1fr auto;

        gap: 10px;

        padding: 18px 0;

        border-bottom: 1px solid #eee;

    }


    .cart-item-info h3 {

        font-size: 14px;

    }


    .cart-item-info p {

        font-size: 11px;

        color: #888;

    }


    .quantity-controls {

        display: flex;

        align-items: center;

        gap: 10px;

    }


    .quantity-controls button {

        width: 28px;

        height: 28px;

        border-radius: 5px;

        background: #fff0e9;

        color: #ff5a1f;

        font-size: 18px;

        font-weight: bold;

    }


    .quantity-controls span {

        font-weight: 600;

    }


    .cart-item > strong {

        color: #ff5a1f;

        font-size: 14px;

        grid-column: 2;

        text-align: right;

    }


    .cart-total {

        display: flex;

        justify-content: space-between;

        font-size: 20px;

        margin: 25px 0;

    }


    .cart-total strong {

        color: #ff5a1f;

    }


    .checkout-btn {

        width: 100%;

        background: #ff5a1f;

        color: white;

        padding: 15px;

        border-radius: 8px;

        font-size: 15px;

        font-weight: 600;

    }


    .checkout-btn:hover {

        opacity: 0.9;

    }


    @media (max-width: 500px) {

        .cart-content {

            width: 100%;

        }

    }

`;

document.head.appendChild(cartStyles);


/* ================= PAGE LOADED ================= */

console.log(
    "🍴 Foodie website loaded successfully!"
);
