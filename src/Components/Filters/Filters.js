import React, { useState, useEffect } from "react";
import "./Filters.css";

const URL =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const Filters = ({productsData, applyFilters}) => {
  const [colorFilter, setColorFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);

  
  const handleColorFilter = (event) => {
    const filterName = event.target.value;

    if (colorFilter.includes(filterName)) {
      let tempArr = colorFilter.filter((filter) => {
        return filter !== filterName;
      });
      setColorFilter(tempArr);
    } else {
      let tempArr = [...colorFilter];
      tempArr.push(filterName);
      setColorFilter(tempArr);
    }
  };

  const handleGenderFilter = (event) => {
    const filterName = event.target.value;

    if (genderFilter.includes(filterName)) {
      let tempArr = genderFilter.filter((filter) => {
        return filter !== filterName;
      });
      setGenderFilter(tempArr);
    } else {
      let tempArr = [...genderFilter];
      tempArr.push(filterName);
      setGenderFilter(tempArr);
    }
  };

  const handlePriceFilter = (event) => {
    const filterName = event.target.value;

    if (priceFilter.includes(filterName)) {
      let tempArr = priceFilter.filter((filter) => {
        return filter !== filterName;
      });
      setPriceFilter(tempArr);
    } else {
      let tempArr = [...priceFilter];
      tempArr.push(filterName);
      setPriceFilter(tempArr);
    }
  };

  const handleTypeFilter = (event) => {
    const filterName = event.target.value;

    if (typeFilter.includes(filterName)) {
      let tempArr = typeFilter.filter((filter) => {
        return filter !== filterName;
      });
      setTypeFilter(tempArr);
    } else {
      let tempArr = [...typeFilter];
      tempArr.push(filterName);
      setTypeFilter(tempArr);
    }
  };


  const applyColorFilter=(filteredProducts)=>{

    if(colorFilter.length){
        let filterData=[];
    for(let i=0;i<colorFilter.length;i++){
        const tempArr=filteredProducts.filter((obj)=> obj.color.toLowerCase()===colorFilter[i].toLowerCase());
        filterData=filterData.concat(tempArr);
    }
    console.log("color Filter Data",filterData);
   
   return filterData;
    }

     return filteredProducts;   
    
  }

  const applyGenderFilter=(filteredProducts)=>{
   
    if(genderFilter.length){
         let filterData=[];
     for(let i=0;i<genderFilter.length;i++){
         const tempArr=filteredProducts.filter((obj)=> obj.gender.toLowerCase()=== genderFilter[i].toLowerCase());
         filterData=filterData.concat(tempArr);
     }
     console.log("Gender filter Data",filterData);
   
    return filterData;
}
    return filteredProducts;
  }


  const applyPriceFilter=(filteredProducts)=>{
   
    if(priceFilter.length){
         let filterData=[];
     for(let i=0;i<priceFilter.length;i++){
        const priceArr=priceFilter[i].split("-");
        const lowPrice=priceArr[0];
        const highPrice=priceArr[1];
        console.log("low-price"  + lowPrice + " highPrice " + highPrice);
         const tempArr=filteredProducts.filter( (obj) => Number(obj.price) >= Number(lowPrice) && Number(obj.price) <= Number(highPrice) );
         filterData=filterData.concat(tempArr);
     }
     console.log("Gender filter Data",filterData);
   
    return filterData;
}
    return filteredProducts;
  }



  const applyTypeFilter=(filteredProducts)=>{
   
    if(typeFilter.length){
         let filterData=[];
     for(let i=0;i<typeFilter.length;i++){
         const tempArr=filteredProducts.filter((obj)=> obj.type.toLowerCase()=== typeFilter[i].toLowerCase());
         filterData=filterData.concat(tempArr);
     }
     console.log("Type filter Data",filterData);
    
    return filterData;
}
    return filteredProducts;
  }
  

useEffect(()=>{
    console.log("price filter",priceFilter);
    let filteredProducts=productsData;
    filteredProducts=applyColorFilter(filteredProducts);
    filteredProducts=applyGenderFilter(filteredProducts);
    filteredProducts=applyPriceFilter(filteredProducts);
    filteredProducts=applyTypeFilter(filteredProducts);
    console.log("filtered products:",filteredProducts);
    setFilteredProducts(filteredProducts);

},[colorFilter,genderFilter,priceFilter,typeFilter]);


useEffect(()=>{
  applyFilters(filteredProducts);
},[filteredProducts])
  

  return (
    <>
      <div className="filter-SideBar">
        {/* Colour Filter */}
        <div className="colour-Filter">
          <h4>Colour</h4>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Red"
              onChange={(event) => {
                handleColorFilter(event);
              }}
            />
            <label>Red</label>
          </div>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Blue"
              onChange={(event) => {
                handleColorFilter(event);
              }}
            />
            <label>Blue</label>
          </div>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Green"
              onChange={(event) => {
                handleColorFilter(event);
              }}
            />
            <label>Green</label>
          </div>
        </div>
        <br />
        {/* Gender Filter */}
        <div className="gender-Filter">
          <h4>Gender</h4>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Men"
              onChange={(event) => {
                handleGenderFilter(event);
              }}
            />
            <label>Men</label>
          </div>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Women"
              onChange={(event) => {
                handleGenderFilter(event);
              }}
            />
            <label>Women</label>
          </div>
        </div>
        <br />
        {/* Price Filter */}
        <div className="price-Filter">
          <h4>Price</h4>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="0-250"
              onChange={(event) => {
                handlePriceFilter(event);
              }}
            />
            <label>0-Rs 250</label>
          </div>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="251-450"
              onChange={(event) => {
                handlePriceFilter(event);
              }}
            />
            <label>Rs 251-450</label>
          </div>
          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="450"
              onChange={(event) => {
                handlePriceFilter(event);
              }}
            />

            <label>Rs 450</label>
          </div>
        </div>
        <br />
        {/* TYPE FILTER */}
        <div className="type-Filter">
          <h4>Type</h4>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Polo"
              onChange={(event) => {
                handleTypeFilter(event);
              }}
            />

            <label>Polo</label>
          </div>

          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Hoodie"
              onChange={(event) => {
                handleTypeFilter(event);
              }}
            />

            <label>Hoodie</label>
          </div>
          <div>
            <input
              className="boxOfCheckbox"
              type="checkbox"
              value="Basic"
              onChange={(event) => {
                handleTypeFilter(event);
              }}
            />

            <label>Basic</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
