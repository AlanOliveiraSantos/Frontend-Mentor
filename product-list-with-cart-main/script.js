document.addEventListener('DOMContentLoaded', () => {
    const cart = {};

// selecionando todos os botões com a classe .add-to-cart e adicionando um evento de clique a cada um deles.
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
//Quando um botão é clicado, este código encontra o elemento .item mais próximo. Em seguida, ele obtém os atributos data-item-id, o texto do título (<h2>) e o preço (<p>) do item.
        const item = e.target.closest('.item');
        const itemId = item.getAttribute('data-item-id');
        const itemName = item.querySelector('h2').innerText;
        const itemPrice = item.querySelector('p').innerText;
//Se o item ainda não estiver no carrinho, ele é adicionado com uma quantidade inicial de 0. Em seguida, a quantidade é incrementada em 1.
        if (!cart[itemId]) {
          cart[itemId] = { name: itemName, price: itemPrice, quantity: 0 };
        }
        cart[itemId].quantity++;
//Estas funções são chamadas para atualizar a exibição do carrinho e o texto do botão.
        updateCart();
        updateButton(e.target, cart[itemId].quantity);
      });
    });
//Essa função limpa a lista de itens no carrinho (cart-items) e a preenche novamente com os itens atualizados do carrinho.
    function updateCart() {
      const cartItems = document.getElementById('cart-items');
      cartItems.innerHTML = '';
  
      for (const id in cart) {
        const li = document.createElement('li');
        li.innerText = `${cart[id].name} - ${cart[id].quantity}`;
        cartItems.appendChild(li);
      }
    }
//Esta função atualiza o texto do botão para mostrar a quantidade de itens selecionados.
    function updateButton(button, quantity) {
      button.innerText = `(${quantity})`;
    }
  });