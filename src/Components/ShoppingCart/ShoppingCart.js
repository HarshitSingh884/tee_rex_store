import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./ShoppingCart.css";
import { useLocation } from "react-router-dom";

const ShoppingCart = () => {
  const location = useLocation();
  const [productsData, setProductData] = useState(location.state.productsData);
  const [cartSize, setCartSize] = useState(location.state.cartSize);
  const [cartItems, setCartItems] = useState(location.state.cartItems);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    getTotalItemsInCart();
    localStorage.setItem("cartSize", JSON.stringify(cartSize));
    getOrderTotal();
  }, [cartItems]);

  const getOrderTotal = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].qty * cartItems[i].price;
    }
    setOrderTotal(total);
  };

  const getTotalItemsInCart = () => {
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].qty;
    }
    setCartSize(total);
  };

  const deleteCartItem = (id) => {
    let tempArr = cartItems.filter((obj) => {
      return obj.id !== id;
    });

    setCartItems(tempArr);
  };

  const increaseQuantity = (id, name, price, currQuantity, imageURL) => {
    let tempArr = [...cartItems];
    const indexInProductData = productsData.findIndex((obj) => {
      return obj.id == id;
    });

    const maxQuantity = productsData[indexInProductData].quantity;

    const indexInCartItems = cartItems.findIndex((obj) => {
      return obj.id == id;
    });

    if (currQuantity < maxQuantity) {
      tempArr[indexInCartItems] = {
        id: id,
        name: name,
        qty: currQuantity + 1,
        price: price,
        imageURL: imageURL,
      };
      setCartItems(tempArr);
    }
  };

  const decreaseQuantity = (id, name, price, currQuantity, imageURL) => {
    if (currQuantity == 1) {
      deleteCartItem(id);
    } else {
      let tempArr = [...cartItems];
      const indexInCartItems = cartItems.findIndex((obj) => {
        return obj.id == id;
      });
      tempArr[indexInCartItems] = {
        id: id,
        name: name,
        qty: currQuantity - 1,
        price: price,
        imageURL: imageURL,
      };
      setCartItems(tempArr);
    }
  };

  return (
    <div>
      <Header
        cartSize={cartSize}
        cartItems={cartItems}
        productsData={productsData}
      />

      {cartSize ? (
        <h3 style={{ padding: "2rem 0 0 2rem" }}>Shopping Cart</h3>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Add Items in cart!</h3>
        </div>
      )}

      <div className="cartList">
        {cartItems.map((obj) => {
          return (
            <div className="product" key={obj.id}>
              <div className="productDetails">
                <img
                  className="productImage"
                  src={obj.imageURL}
                  alt="product"
                />

                <div className="productNamePrice">
                  <div>{obj.name}</div>
                  <div>Rs {obj.price * obj.qty}</div>
                </div>
              </div>
              <div className="QtyButton">
                <div>Qty: {obj.qty} </div>
                <div className="updateQtyButtons">
                  <button
                    onClick={() =>
                      increaseQuantity(
                        obj.id,
                        obj.name,
                        obj.price,
                        obj.qty,
                        obj.imageURL
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        obj.id,
                        obj.name,
                        obj.price,
                        obj.qty,
                        obj.imageURL
                      )
                    }
                  >
                    -
                  </button>
                </div>
              </div>
              <button
                className="DeleteButton"
                onClick={() => deleteCartItem(obj.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
        {cartItems.length > 0 ? (
                               <div>
                                 <hr />
                                 <h3 style={{textAlign: "center"}}>Total Amount : Rs {orderTotal}</h3>
                              </div>
                                 ) 
                              : null}
      </div>
    </div>
  );
};

export default ShoppingCart;
