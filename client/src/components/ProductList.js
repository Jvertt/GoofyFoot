import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: Fetch products from the server and set them to state.
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          {/* TODO: Add link to ProductDetail component for each product */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
