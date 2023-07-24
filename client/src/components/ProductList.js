import React, { useEffect, useState } from 'react';

function ProductList (){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: Fetch products from the server and set them to state.
  }, []);

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
