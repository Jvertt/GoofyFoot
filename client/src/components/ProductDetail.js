import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail () {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      {/* TODO: Display reviews for the product, and a form to add a new review */}
    </div>
  );
};

export default ProductDetail;
