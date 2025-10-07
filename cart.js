import loadProducts from "./loadProducts.js";

const cart = () => {
  let listCartHTML = document.querySelector(".listCart");
  let iconCart = document.querySelector(".icon-cart");

  if (!iconCart || !listCartHTML) {
    console.error("Cart elements not found");
    return;
  }

  let iconCartSpan = iconCart.querySelector("span");
  let body = document.querySelector("body");
  let closeCart = document.querySelector(".close");
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!closeCart) {
    console.error("Close button not found");
    return;
  }

  // Get products using loadProducts
  const getProducts = async () => {
    try {
      const products = await loadProducts();
      console.log("📦 Loaded products:", products);
      return products;
    } catch (error) {
      console.error("Error loading products:", error);
      return [];
    }
  };

  // Open and close cart
  iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  const setProductInCart = async (idProduct, quantity) => {
    let position = cart.findIndex((item) => item.product_id == idProduct);

    if (quantity <= 0) {
      if (position >= 0) {
        cart.splice(position, 1);
      }
    } else if (position < 0) {
      cart.push({
        product_id: idProduct,
        quantity: quantity,
      });
    } else {
      cart[position].quantity = quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    await addCartToHTML();
  };

  const addCartToHTML = async () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    const products = await getProducts();

    console.log("🛒 Rendering cart items:", cart);
    console.log("📦 Available products:", products);

    if (cart.length > 0) {
      cart.forEach((item) => {
        totalQuantity += item.quantity;

        const product = products.find((p) => p.id == item.product_id);
        const newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.product_id;

        if (!product) {
          console.warn(`❌ Product ${item.product_id} not found in products`);
          newItem.innerHTML = `
            <div class="image">
              <img src="/Structure/Logo-image/ducati_id.png" alt="Not found">
            </div>
            <div class="name">
              Product ${item.product_id} (Not Available)
            </div>
            <div class="totalPrice">$0</div>
            <div class="quantity">
              <span class="minus" data-id="${item.product_id}">-</span>
              <span>${item.quantity}</span>
              <span class="plus" data-id="${item.product_id}">+</span>
            </div>
          `;
        } else {
          // Deepseek: how do i target this so i can style them in css
          newItem.innerHTML = `
            <div class="image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="name">
              ${product.name}
            </div>
            <div class="totalPrice">$${product.price * item.quantity}</div>
            <div class="quantity">
              <span class="minus" data-id="${product.id}">-</span>
              <span>${item.quantity}</span>
              <span class="plus" data-id="${product.id}">+</span>
            </div>
          `;
          // end of question
        }

        listCartHTML.appendChild(newItem);
      });
    } else {
      listCartHTML.innerHTML =
        '<div class="empty-cart">Your cart is empty</div>';
    }

    if (iconCartSpan) {
      iconCartSpan.innerText = totalQuantity;
    }
  };

  // Handle cart interactions
  document.addEventListener("click", async (event) => {
    const button = event.target;
    const productId = button.dataset.id;

    if (!productId) return;

    const position = cart.findIndex((item) => item.product_id == productId);

    if (button.classList.contains("addCart")) {
      const quantity = position < 0 ? 1 : cart[position].quantity + 1;
      await setProductInCart(productId, quantity);
    } else if (button.classList.contains("minus")) {
      if (position >= 0) {
        const quantity = cart[position].quantity - 1;
        await setProductInCart(productId, quantity);
      }
    } else if (button.classList.contains("plus")) {
      if (position >= 0) {
        const quantity = cart[position].quantity + 1;
        await setProductInCart(productId, quantity);
      }
    }
  });

  // Initialize
  addCartToHTML();
};

export default cart;

