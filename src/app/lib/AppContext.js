"use client"



import React, { createContext, useEffect, useState } from "react";
import { getAllData, getColors, getSizes, getSubcategories, getProducts, getNovelties, getOutlets } from "./data";

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
  const [order, setOrder] = useState({ orderAmount: 0 });
  const [redsysData, setRedsysData] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [novelties, setNovelties] = useState([]);
  const [outlets, setOutlets] = useState([]);

  

  const loadColors = async () => {
    const resColors = await getColors();
    setColors(resColors);
  }

  const loadProducts = async () => {
    const resProducts = await getProducts();
    setProducts(resProducts);
  }

  const loadSizes = async () => {
    const resSizes = await getSizes();
    setSizes(resSizes);
  }

  const loadSubcategories = async () => {
    const resSubcategories = await getSubcategories();
    setSubcategories(resSubcategories);
  }

  const loadNovelties = async () => {
    const resNovelties = await getNovelties();
    setNovelties(resNovelties);
  }

  const loadOutlets = async () => {
    const resOutlets = await getOutlets();
    setOutlets(resOutlets);
  }
  
  const loadAllData = async () => {
    try {
      const result = await getAllData();
      setColors(result.colors);
      setSizes(result.sizes);
      setSubcategories(result.subcategories);
      setProducts(result.products);
      setNovelties(result.novelties);
      setOutlets(result.outlets);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };



  return (
    <AppContext.Provider
      value={{
        searchBarIsOpen,
        setSearchBarIsOpen,
        searchTerm,
        setSearchTerm,
        colors,
        sizes,
        colorSelectedOption,
        setColorSelectedOption,
        formData,
        setFormData,
        order,
        setOrder,
        redsysData,
        setRedsysData,
        orderItems,
        setOrderItems,
        subcategories,
        products,
        novelties,
        outlets,
        loadColors,
        loadProducts,
        loadSizes,
        loadSubcategories,
        loadNovelties,
        loadOutlets,
        loadAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
