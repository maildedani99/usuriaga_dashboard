"use client"

import React, { createContext, useEffect, useState } from "react";
import { getColors, getSizes, getSubcategories, getProducts } from "./data";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [sizeSelectedOption, setSizeSelectedOption] = useState(null);
  const [colorSelectedOption, setColorSelectedOption] = useState(null);
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState({});
  const [order, setOrder] = useState({ orderAmount: 0});
  const [redsysData, setRedsysData] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([])

  



  const addItemToCart = (item, sizeSelectedOption, colorSelectedOption) => {
    const matchItemIndex = cartItems.findIndex(
      (object) => object.id === item.id && object.size.id === sizeSelectedOption.id && object.color === colorSelectedOption
    );
  
    if (matchItemIndex !== -1) {
      cartItems[matchItemIndex].quantity += 1;
      setCartItems([...cartItems]);
    } else {
      const newItem = { ...item, quantity: 1, size: sizeSelectedOption, color: colorSelectedOption };
      setCartItems([...cartItems, newItem]);
    }
  };
  

  const addQuantity = (item) => {
    const resItemMatch = cartItems.find(object => object.id === item.id & object.size.id === item.size.id);
    resItemMatch.quantity = resItemMatch.quantity + 1;
    setCartItems([...cartItems])
  }

  const removeQuantity = (item) => {
    const resItemMatch = cartItems.find(object => object.id === item.id & object.size.id === item.size.id);
    resItemMatch.quantity = resItemMatch.quantity - 1;
    setCartItems([...cartItems])

  }

  const removeItemFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => {
      return (
        cartItem.id !== item.id ||
        cartItem.size.id !== item.size.id ||
        cartItem.color !== item.color
      );
    });
  
    setCartItems(updatedCartItems);
  };

  const loadColors = async () => {
    const resColors = await getColors();
    setColors(resColors);
  }

  const loadProducts = async () => {
    const resProducts = await getProducts()
    setProducts(resProducts)
  }

  const loadSizes = async () => {
    const resSizes = await getSizes();
    setSizes(resSizes);
  }

  const loadSubcategories = async () => {
    const resSubcategories = await getSubcategories();
    setSubcategories(resSubcategories);
  }
  

  useEffect(() => {
    loadColors();
    loadProducts();
    loadSizes();
    loadSubcategories()
  }, [])

  return (
    <AppContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, addQuantity, sizeSelectedOption, setSizeSelectedOption, removeQuantity, searchBarIsOpen, setSearchBarIsOpen, searchTerm, setSearchTerm, colors, sizes, colorSelectedOption, setColorSelectedOption, formData, setFormData, order, setOrder, redsysData, setRedsysData, orderItems, setOrderItems, subcategories, products,  loadColors, loadProducts, loadSizes, loadSubcategories}}
    >
      {children}
    </AppContext.Provider>
  );  
};