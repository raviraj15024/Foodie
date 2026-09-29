const cartCount = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-cart");

const cartButton = document.querySelector(".cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

const cartItemsBox = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Add item to cart
addButtons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".food-card");
        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        renderCart();
    });
});

// Display cart
function renderCart() {
    cartItemsBox.innerHTML = "";

    if (cart.length === 0) {
        cartItemsBox.innerHTML = `
            <p class="empty-cart">Your cart is empty.</p>
        `;
        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";
        return;
    }

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <span>${item.name}</span>
                <strong>₹${item.price * item.quantity}</strong>
            </div>

            <div class="quantity">
                <button class="quantity-btn" data-index="${index}" data-action="minus">−</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-index="${index}" data-action="plus">+</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        cartItemsBox.appendChild(cartItem);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = `₹${total}`;

    addCartActions();
}

// Quantity and remove buttons
function addCartActions() {
    document.querySelectorAll(".quantity-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);
            const action = button.dataset.action;

            if (action === "plus") {
                cart[index].quantity++;
            } else if (action === "minus") {
                cart[index].quantity--;

                if (cart[index].quantity === 0) {
                    cart.splice(index, 1);
                }
            }

            renderCart();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);

            cart.splice(index, 1);
            renderCart();
        });
    });
}

// Open cart
cartButton.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

const placeOrder = document.getElementById("place-order");

placeOrder.addEventListener("click", () => {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (cart.length === 0) {
        alert("Please add an item to your cart first.");
        return;
    }

    if (!name || !phone || !address) {
        alert("Please fill in all delivery details.");
        return;
    }

    alert(`Thank you, ${name}! Your order has been placed successfully.`);
});

const foodSearch = document.getElementById("food-search");
const foodCards = document.querySelectorAll(".food-card");

foodSearch.addEventListener("input", () => {
    const searchText = foodSearch.value.toLowerCase().trim();

    foodCards.forEach(card => {
        const foodName = card.dataset.name.toLowerCase();

        card.style.display = foodName.includes(searchText) ? "" : "none";
    });
});

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        foodCards.forEach(card => {
            const cardCategory = card.dataset.category;

            card.style.display =
                category === "all" || cardCategory === category
                    ? ""
                    : "none";
        });
    });
});