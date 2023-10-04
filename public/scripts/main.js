//Basic example for main site functionality 
document.addEventListener('DOMContentLoaded', function () {
    // Sample product data (you can replace this with your actual product data)
    const products = [
      { id: 1, name: 'Phone Case 1', price: 10.99 },
      { id: 2, name: 'Phone Case 2', price: 12.99 },
      { id: 3, name: 'Phone Case 3', price: 9.99 },
    ];
  
    // Shopping cart data
    let cart = [];
  
    // Function to display products on the webpage
    function displayProducts() {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
  
      products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
  
        productList.appendChild(productItem);
      });
    }
  
    // Function to add a product to the cart
    function addToCart(productId) {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        cart.push(productToAdd);
        updateCart();
      }
    }
  
    // Function to update the cart display
    function updateCart() {
      const cartItems = document.getElementById('cart-items');
      cartItems.innerHTML = '';
  
      cart.forEach((product) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <p>${product.name} - $${product.price}</p>
        `;
  
        cartItems.appendChild(cartItem);
      });
    }
  
    // Event listener for adding products to the cart
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        if (!isNaN(productId)) {
          addToCart(productId);
        }
      }
    });
  
    // Initialize the product display
    displayProducts();
  });