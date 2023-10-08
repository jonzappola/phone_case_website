import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the product data from your API or database
    // Replace this with your actual API endpoint
    fetch('/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      <h2>Phone Cases</h2>
      <div className="product-container">
        {products.map((product, index) => (
          <div key={index} className="product">
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <div className="images">
              {product.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`Product ${index + 1} - Image ${imgIndex + 1}`}
                />
              ))}
            </div>
            <p>Compatible Models: {product.compatibleModels.join(', ')}</p>
            <p>SKU: {product.sku.join(', ')}</p>
            <p>Quantity: {product.quantity.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;