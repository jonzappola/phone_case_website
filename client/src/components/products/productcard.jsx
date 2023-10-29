import React from 'react';
import '../../styles/productcard.css';

function ProductCard({ product }) {
  // Define the root path for your product images
  const imageRoot = '/images/'; // Change this to match your project's image path

  // Assuming product.name is the name of the product
  const productUrl = `/products/${product.name.replace(/ /g, '-')}`;

  return (
    <a href={productUrl} className="product-card">
      <div className="product-image-container">
        {product.images && product.images.length > 0 ? (
          <img
            src={imageRoot + product.images[0]}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <p>No Image</p>
        )}
      </div>
    </a>
  );
}

export default ProductCard;
