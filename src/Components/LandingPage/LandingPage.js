import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./LandingPage.css";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import ProductCard from "../ProductCard/ProductCard";

const URL =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const LandingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [productsData, setProductsData] = useState([]); //complete  Products Data
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [cartItems, setCartItems] = useState([]); //items present in Cart.
  const [cartSize, setCartSize] = useState(0);

  const searchTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  const filterFromSearch = (searchText) => {
    if (searchText === "") {
      getProducts();
    } else {
      const tempArr = productsData.filter((obj) => {
        return (obj.name.toLowerCase().startsWith(searchText.toLowerCase()) || 
                obj.name.toLowerCase().endsWith(searchText.toLowerCase())
               );
      });
      setFilteredProducts(tempArr);
    }
  };

  const getProducts = async () => {
    const dataArr = await axios.get(URL);
    setProductsData(dataArr.data);
    setFilteredProducts(dataArr.data);
  };

  const addToCart = async (name, price, maxQuantity, productId, imageURL) => {
    let tempCart = [...cartItems];
    const indexInCartItems = cartItems.findIndex((obj) => {
      return obj.id == productId;
    });

    if (indexInCartItems == -1 && maxQuantity > 0) {
      tempCart = [
        ...cartItems,
        { id: productId, name: name, qty: 1, price: price, imageURL: imageURL },
      ];
      setCartItems(tempCart);
    } else {
      const currentQuantity = cartItems[indexInCartItems].qty;
      const availableQuantity = maxQuantity - currentQuantity;

      if (availableQuantity > 0) {
        tempCart[indexInCartItems] = {
          id: productId,
          name: name,
          qty: currentQuantity + 1,
          price: price,
          imageURL: imageURL,
        };

        setCartItems(tempCart);
      }
    }
  };

  const getCartSize = () => {
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].qty;
    }
    setCartSize(total);
  };

  useEffect(() => {
    if (localStorage.length > 1) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }
    getProducts();
  }, []);

  useEffect(() => {
    getCartSize();
  }, [cartItems]);

  useEffect(() => {
    // console.log("Search text", filteredProducts);
    if (debounceTimeout !== 0) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      filterFromSearch(searchText);
    }, 600);
    setDebounceTimeout(newTimeout);
  }, [searchText]);

  return (
    <div>
      <Header
        cartSize={cartSize}
        cartItems={cartItems}
        productsData={productsData}
      />

      {/*SEARCH-BAR STARTS  */}
      <div className="searchBar">
        <input
          className="no-outline"
          type="text"
          value={searchText}
          placeholder="Search for products"
          onChange={(e) => searchTextHandler(e)}
        />
        <i className="fa fa-search"></i>
        <div className="mobileFilterSelector">
          <button className="filterBtn">
            <i className="fa fa-filter"></i>
          </button>

          {/* { filterBtnClicked && <Filters/>}  */}
        </div>
      </div>
      {/* SEARCH-BAR ENDS */}

      <div className="filtersAndCards">
        {/* Filters Panel Starts */}
        <div className="filterSideBar">
          <Filters
            productsData={productsData}
            applyFilters={(filtersApplied) =>
              setFilteredProducts(filtersApplied)
            }
          />
        </div>
        {/* Filters Panel Ends */}

        {/* Product-Grid Starts */}

        <div className="ProductsGrid">
          {filteredProducts.map((obj) => {
            return (
              <div style={{ margin: "0 4rem 4rem 4rem" }}>
                <ProductCard
                  productObj={obj}
                  key={obj.id}
                  handleAddToCart={async () => {
                    await addToCart(
                      obj.name,
                      obj.price,
                      obj.quantity,
                      obj.id,
                      obj.imageURL
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Product-Grid Ends */}
    </div>
  );
};

export default LandingPage;
