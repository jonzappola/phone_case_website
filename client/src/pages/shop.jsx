import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';
import ProductCard from '../components/products/productcard.jsx';

function Shop() {
  const [products, setProducts] = useState(null); // Initialize as null

  useEffect(() => {
    axios.get('/product/all') // Make sure this route matches your backend route
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="product-list">
        {products === null ? (
          // Render a loading message or spinner while data is being fetched
          <p>Loading...</p>
        ) : (
          // Render the products when they are available
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;

