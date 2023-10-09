import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the product data from your API or database
    // Replace '/product' with your actual API endpoint
    fetch('/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data); // Debugging
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="product-list">
      <div className="product-container">
        {products.map((product, index) => (
          <div key={index} className="product">
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Compatible Models: {product.compatibleModels.join(', ')}</p>
            <p>SKU: {product.sku.join(', ')}</p>
            <p>Quantity: {product.quantity.join(', ')}</p>
            {/* Add rendering for images */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
