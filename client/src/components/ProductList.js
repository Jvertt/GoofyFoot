import React, { useEffect, useState } from 'react';

function ProductList (){
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/products') // Replace with your actual server URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          {/* TODO: Add link to ProductDetail component for each product */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
