import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axiosConfig.js';

function ProductDetails() {
  const { productName } = useParams(); // Retrieve the product name from the route

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on the product name
    axios.get(`/product/name/${productName}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [productName]);

  if (!product) {
    // Handle loading or product not found
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <div>
        <img src={product.image} alt={product.name} />
      </div>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <h3>Compatible Models:</h3>
      <ul>
        {product.compatibleModels.map((model, index) => (
          <li key={index}>{model}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetails;
