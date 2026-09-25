const SMARTMART_PRODUCTS = [
    {
        id: "apple-gala",
        name: "Organic Gala Apples",
        category: "fruits",
        price: 14.0,
        unit: "1 kg",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
        description: "Crisp, sweet apples sourced from local farms."
    },
    {
        id: "avocado-hass",
        name: "Hass Avocados",
        category: "fruits",
        price: 18.5,
        unit: "pack of 4",
        image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=900&q=80",
        description: "Creamy avocados perfect for toast and salads."
    },
    {
        id: "spinach-baby",
        name: "Baby Spinach",
        category: "vegetables",
        price: 9.75,
        unit: "250 g",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80",
        description: "Tender baby spinach leaves washed and ready to cook."
    },
    {
        id: "vine-tomatoes",
        name: "Vine Tomatoes",
        category: "vegetables",
        price: 11.25,
        unit: "1 kg",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80",
        description: "Bright and juicy tomatoes for salads and sauces."
    },
    {
        id: "free-range-eggs",
        name: "Free Range Eggs",
        category: "dairy",
        price: 16.0,
        unit: "12 eggs",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80",
        description: "Fresh eggs from ethically raised hens."
    },
    {
        id: "greek-yogurt",
        name: "Greek Yogurt",
        category: "dairy",
        price: 13.5,
        unit: "500 g",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
        description: "Protein-rich yogurt with a smooth finish."
    },
    {
        id: "salmon-fillet",
        name: "Atlantic Salmon Fillet",
        category: "meat",
        price: 39.0,
        unit: "500 g",
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=900&q=80",
        description: "Fresh salmon fillet cut daily."
    },
    {
        id: "chicken-breast",
        name: "Chicken Breast",
        category: "meat",
        price: 27.0,
        unit: "1 kg",
        image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80",
        description: "Lean, boneless chicken breast trimmed and packed."
    },
    {
        id: "basmati-rice",
        name: "Premium Basmati Rice",
        category: "pantry",
        price: 21.0,
        unit: "2 kg",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=900&q=80",
        description: "Long-grain basmati rice with a fragrant aroma."
    },
    {
        id: "olive-oil",
        name: "Extra Virgin Olive Oil",
        category: "pantry",
        price: 34.0,
        unit: "750 ml",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
        description: "Cold-pressed olive oil for cooking and dressing."
    },
    {
        id: "orange-juice",
        name: "Fresh Orange Juice",
        category: "beverages",
        price: 12.5,
        unit: "1 L",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?auto=format&fit=crop&w=900&q=80",
        description: "No added sugar, just fresh squeezed oranges."
    },
    {
        id: "sparkling-water",
        name: "Sparkling Water",
        category: "beverages",
        price: 8.5,
        unit: "6 cans",
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=900&q=80",
        description: "Crisp sparkling water for everyday refreshment."
    }
];

const CART_KEY = "smartmart-cart";
const VOUCHER_KEY = "smartmart-voucher";
const CURRENCY_KEY = "smartmart-currency";
const CURRENCY_RATES = {
    AED: 1,
    USD: 0.27,
    EUR: 0.25,
    SAR: 1.02
};

const CURRENCY_LABELS = {
    AED: "AED",
    USD: "$",
    EUR: "EUR",
    SAR: "SAR"
};

document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    updateCartCounters();
    initCategorySearch();
    initProductsPage();
    initCartPage();
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function readCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCounters();
}

function getVoucher() {
    return localStorage.getItem(VOUCHER_KEY) || "";
}

function setVoucher(code) {
    if (code) {
        localStorage.setItem(VOUCHER_KEY, code);
    } else {
        localStorage.removeItem(VOUCHER_KEY);
    }
}

function getCurrency() {
    return localStorage.getItem(CURRENCY_KEY) || "AED";
}

function setCurrency(code) {
    localStorage.setItem(CURRENCY_KEY, code);
}

function findProduct(productId) {
    return SMARTMART_PRODUCTS.find((product) => product.id === productId);
}

function addToCart(productId) {
    const cart = readCart();
    cart.push({ productId, quantity: 1 });
    saveCart(cart);
}

function groupCartItems() {
    const grouped = new Map();

    readCart().forEach((entry) => {
        const product = findProduct(entry.productId);
        if (!product) {
            return;
        }

        if (!grouped.has(product.id)) {
            grouped.set(product.id, {
                ...product,
                quantity: 0
            });
        }

        grouped.get(product.id).quantity += entry.quantity || 1;
    });

    return Array.from(grouped.values());
}

function setItemQuantity(productId, nextQuantity) {
    const cart = readCart().filter((entry) => entry.productId !== productId);

    for (let index = 0; index < nextQuantity; index += 1) {
        cart.push({ productId, quantity: 1 });
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    const cart = readCart().filter((entry) => entry.productId !== productId);
    saveCart(cart);
}

function updateCartCounters() {
    const itemCount = readCart().reduce((sum, item) => sum + (item.quantity || 1), 0);

    document.querySelectorAll("[data-cart-count]").forEach((counter) => {
        counter.textContent = itemCount;
    });
}

function formatPrice(amount, currency = getCurrency()) {
    const converted = amount * (CURRENCY_RATES[currency] || 1);

    if (currency === "USD") {
        return `${CURRENCY_LABELS[currency]}${converted.toFixed(2)}`;
    }

    return `${CURRENCY_LABELS[currency]} ${converted.toFixed(2)}`;
}

function getCartSummary() {
    const items = groupCartItems();
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const voucher = getVoucher().toUpperCase();
    const discount = voucher === "SAVE10" ? subtotal * 0.1 : 0;

    return {
        items,
        subtotal,
        discount,
        total: subtotal - discount
    };
}

function initCategorySearch() {
    const input = document.getElementById("categorySearch");
    const grid = document.getElementById("categoryGrid");

    if (!input || !grid) {
        return;
    }

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();

        grid.querySelectorAll(".category-tile").forEach((tile) => {
            const text = tile.textContent.toLowerCase();
            tile.style.display = text.includes(query) ? "" : "none";
        });
    });
}

function initProductsPage() {
    const grid = document.getElementById("productGrid");
    const search = document.getElementById("productSearch");
    const emptyState = document.getElementById("productsEmptyState");
    const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

    if (!grid) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    let activeCategory = params.get("category") || "all";

    renderProducts();

    search.addEventListener("input", renderProducts);

    filterButtons.forEach((button) => {
        if (button.dataset.filter === activeCategory) {
            button.classList.add("active");
        } else if (activeCategory !== "all" && button.dataset.filter === "all") {
            button.classList.remove("active");
        }

        button.addEventListener("click", () => {
            activeCategory = button.dataset.filter;
            filterButtons.forEach((item) => item.classList.toggle("active", item === button));
            renderProducts();
        });
    });

    function renderProducts() {
        const term = search.value.trim().toLowerCase();
        const filteredProducts = SMARTMART_PRODUCTS.filter((product) => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory;
            const matchesSearch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });

        grid.innerHTML = filteredProducts.map((product) => `
            <article class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-card-body">
                    <p class="product-category">${labelize(product.category)}</p>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-meta">
                        <strong>${formatPrice(product.price, "AED")}</strong>
                        <span>${product.unit}</span>
                    </div>
                    <button class="btn btn-dark add-to-cart-btn" data-product-id="${product.id}" type="button">Add to Cart</button>
                </div>
            </article>
        `).join("");

        emptyState.classList.toggle("hidden", filteredProducts.length > 0);

        grid.querySelectorAll(".add-to-cart-btn").forEach((button) => {
            button.addEventListener("click", () => {
                addToCart(button.dataset.productId);
                button.textContent = "Added";
                window.setTimeout(() => {
                    button.textContent = "Add to Cart";
                }, 900);
            });
        });
    }
}

function initCartPage() {
    const cartList = document.getElementById("cartItemsList");
    if (!cartList) {
        return;
    }

    const emptyState = document.getElementById("emptyCartState");
    const locationSelect = document.getElementById("locationSelect");
    const voucherInput = document.getElementById("voucherCode");
    const voucherMessage = document.getElementById("voucherMessage");
    const orderForm = document.getElementById("orderForm");
    const orderMessage = document.getElementById("orderMessage");
    const confirmationBox = document.getElementById("confirmationBox");

    locationSelect.value = getCurrency();
    voucherInput.value = getVoucher();

    renderCart();

    locationSelect.addEventListener("change", () => {
        setCurrency(locationSelect.value);
        renderCart();
    });

    document.getElementById("applyVoucherBtn").addEventListener("click", () => {
        const code = voucherInput.value.trim().toUpperCase();
        setVoucher(code);

        if (code === "SAVE10") {
            voucherMessage.textContent = "Voucher applied. You saved 10%.";
            voucherMessage.className = "inline-message success";
        } else if (code) {
            voucherMessage.textContent = "Voucher not recognized. Try SAVE10.";
            voucherMessage.className = "inline-message error";
        } else {
            voucherMessage.textContent = "";
            voucherMessage.className = "inline-message";
        }

        renderCart();
    });

    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const items = groupCartItems();
        if (!items.length) {
            orderMessage.textContent = "Your cart is empty. Add products before placing an order.";
            orderMessage.className = "inline-message error";
            return;
        }

        const fields = [
            document.getElementById("customerName"),
            document.getElementById("customerEmail"),
            document.getElementById("customerPhone"),
            document.getElementById("customerAddress"),
            document.getElementById("paymentMethod")
        ];

        const hasEmptyField = fields.some((field) => !field.value.trim());
        if (hasEmptyField) {
            orderMessage.textContent = "Please complete all delivery and payment fields.";
            orderMessage.className = "inline-message error";
            return;
        }

        orderMessage.textContent = "Processing your order...";
        orderMessage.className = "inline-message";

        window.setTimeout(() => {
            const summary = getCartSummary();
            saveCart([]);
            setVoucher("");
            voucherInput.value = "";
            voucherMessage.textContent = "";
            orderForm.reset();
            locationSelect.value = getCurrency();
            orderMessage.textContent = "";
            confirmationBox.innerHTML = `
                <h4>Order placed successfully</h4>
                <p>Your groceries are confirmed for delivery.</p>
                <p><strong>Total charged:</strong> ${formatPrice(summary.total)}</p>
            `;
            confirmationBox.classList.remove("hidden");
            renderCart();
        }, 900);
    });

    function renderCart() {
        const summary = getCartSummary();

        if (!summary.items.length) {
            cartList.innerHTML = "";
            emptyState.classList.remove("hidden");
        } else {
            emptyState.classList.add("hidden");
            cartList.innerHTML = summary.items.map((item) => `
                <article class="cart-item-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p class="product-category">${labelize(item.category)}</p>
                        <h3>${item.name}</h3>
                        <p>${item.unit}</p>
                    </div>
                    <div class="cart-item-price">
                        <span>Price</span>
                        <strong>${formatPrice(item.price)}</strong>
                    </div>
                    <div class="quantity-control" data-product-id="${item.id}">
                        <button type="button" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="increase">+</button>
                    </div>
                    <div class="cart-item-price">
                        <span>Subtotal</span>
                        <strong>${formatPrice(item.price * item.quantity)}</strong>
                    </div>
                    <button type="button" class="remove-item-btn" data-remove-id="${item.id}">Remove</button>
                </article>
            `).join("");
        }

        document.getElementById("cartSubtotal").textContent = formatPrice(summary.subtotal);
        document.getElementById("cartDiscount").textContent = formatPrice(summary.discount);
        document.getElementById("cartTotal").textContent = formatPrice(summary.total);

        cartList.querySelectorAll(".quantity-control button").forEach((button) => {
            button.addEventListener("click", () => {
                const productId = button.parentElement.dataset.productId;
                const item = summary.items.find((product) => product.id === productId);
                const nextQuantity = button.dataset.action === "increase" ? item.quantity + 1 : item.quantity - 1;

                if (nextQuantity <= 0) {
                    removeFromCart(productId);
                } else {
                    setItemQuantity(productId, nextQuantity);
                }

                renderCart();
            });
        });

        cartList.querySelectorAll(".remove-item-btn").forEach((button) => {
            button.addEventListener("click", () => {
                removeFromCart(button.dataset.removeId);
                renderCart();
            });
        });
    }
}

function labelize(value) {
    return value
        .split("-")
        .join(" ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}