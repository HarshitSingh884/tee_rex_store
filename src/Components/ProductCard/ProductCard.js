import React from "react";
import "./ProductCard.css";

const ProductCard = ({ productObj, handleAddToCart }) => {
  return (
    <>
      <div className="cardContainer" key={productObj.id}>
        <div className="image_Container">
          <img className="cardImg" src={productObj.imageURL} alt="Product" />
        </div>
        <div className="productName">{productObj.name}</div>
        <div className="cardFooter">
          <div style={{ fontWeight: 600 }}>Rs {productObj.price}</div>
          <button className="cardButton" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
