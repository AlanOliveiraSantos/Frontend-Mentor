// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cart = {};

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        handleAddToCart(e.target.closest('.add-to-cart'));
      } else {
        handleAddToCart(button);
      }
    });
  });

  document.getElementById('clear-cart').addEventListener('click', () => {
    clearCart();
  });

  function handleAddToCart(button) {
    const item = button.closest('.item');
    const itemId = item.getAttribute('data-item-id');
    const itemName = item.querySelector('h2').innerText;
    const itemPriceText = item.querySelectorAll('p')[1].innerText;
    const itemPrice = parseFloat(itemPriceText.replace('$', '').trim());

    if (!cart[itemId]) {
      cart[itemId] = { name: itemName, price: itemPrice, quantity: 0 };
    }

    cart[itemId].quantity++;
    updateCart();
    updateButton(button, cart[itemId].quantity);
    updateCartBackground();
  }

  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    for (const id in cart) {
      if (cart.hasOwnProperty(id)) {
        const item = cart[id];
        const itemTotal = (item.price * item.quantity).toFixed(2);

        const li = document.createElement('li');
        li.innerHTML = `
          <span class="item-name">${item.name}</span>
          <span class="item-quantity">Qty: ${item.quantity}</span>
          <span class="item-price">$${itemTotal}</span>
          <button class="remove-item" data-item-id="${id}">Remove</button>
        `;

        li.querySelector('.remove-item').addEventListener('click', (e) => {
          const itemId = e.target.getAttribute('data-item-id');
          decreaseItem(itemId);
        });

        cartItems.appendChild(li);
        total += item.price * item.quantity;
      }
    }

    document.getElementById('order-total').innerText = `Order Total: $${total.toFixed(2)}`;
    updateCartBackground();
  }

  function updateButton(button, quantity) {
    const buttonImage = button.querySelector('.button-image');
    button.innerHTML = '';
    button.appendChild(buttonImage);
    button.append(`Add to Cart (${quantity})`);
  }

  function decreaseItem(itemId) {
    if (cart[itemId].quantity > 1) {
      cart[itemId].quantity--;
    } else {
      delete cart[itemId];
    }
    updateCart();
    updateButtonAfterRemoval(itemId);
    updateCartBackground();
  }

  function updateButtonAfterRemoval(itemId) {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      const item = button.closest('.item');
      if (item.getAttribute('data-item-id') === itemId) {
        if (cart[itemId]) {
          updateButton(button, cart[itemId].quantity);
        } else {
          const buttonImage = button.querySelector('.button-image');
          button.innerHTML = '';
          button.appendChild(buttonImage);
          button.append('Add to Cart');
        }
      }
    });
  }

  function updateCartBackground() {
    const cartContainer = document.querySelector('.cart-container');
    if (Object.keys(cart).length === 0) {
      cartContainer.classList.add('empty');
    } else {
      cartContainer.classList.remove('empty');
    }
  }

  function clearCart() {
    for (const id in cart) {
      delete cart[id];
    }
    updateCart();
    updateAllButtons();
    updateCartBackground();
  }

  function updateAllButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      const buttonImage = button.querySelector('.button-image');
      button.innerHTML = '';
      button.appendChild(buttonImage);
      button.append('Add to Cart');
    });
  }
});
