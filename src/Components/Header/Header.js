import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ cartSize, cartItems, productsData }) => {
  return (
    <div>
      <div className="container">
        <Link
         className="link"
         to="/"
         >
        <div className="HeaderTitle">TeeRex Store</div>
        </Link>
        <div className="sideBar">
         
          <Link
            className="link"
            to="/"
            state={{
              cartItems: cartItems,
              cartSize: cartSize,
              productsData: productsData,
            }}
          >
            <div className="Products">
              Products
              <hr />
            </div>
          </Link>

          <Link
            className="link"
            to="/ShoppingCart"
            state={{
              cartItems: cartItems,
              cartSize: cartSize,
              productsData: productsData,
            }}
          >
            <div className="CartLogo-And-TotalItems">
            
              <div>Cart</div>
             
              <i
                className="fa fa-shopping-cart"
                style={{ fontSize: "2rem", paddingLeft: 3, color: "gray" }}
              ></i>
              <span className="cartItemNumber">{cartSize}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
