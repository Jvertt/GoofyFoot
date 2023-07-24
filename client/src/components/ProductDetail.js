import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail () {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // TODO: Fetch product details from the server using the ID from the URL params.
  }, [id]);

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
