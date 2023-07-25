import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

function ProductList (){
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/products')
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
        <div key={product.id} className="card">
          <img src={product.image_url} alt={product.title} className="card-img-top"/>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><small className="text-muted">${product.price}</small></p>
            <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
