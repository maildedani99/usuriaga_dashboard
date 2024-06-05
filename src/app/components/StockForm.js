"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/AppContext";
import { stockCreate } from "../lib/data";
import { AuthContext } from "../lib/AuthContext";
import AddButton from "./AddButton";

export default function StockForm() {
  const { sizes, colors, products } = useContext(AppContext);
  const { auth } = useContext(AuthContext);

  //const [colors, setColors] = useState([])

  const initialState = {
    product_id: "",
    size_id: "",
    color_id: "",
    quantity: "",
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData(initialState);
  };

  const onStockCreate = async () => {
    const resStockCreate = await stockCreate(data, auth.token);
    console.log(resStockCreate.status);
    if (resStockCreate && resStockCreate.status === "success") {
      resetForm();
    }
    console.log(resStockCreate);
  };



  return (
    <div className="grid gap-4 px-4 w-full mx-auto md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Producto
      </label>
      <div className="flex items-center gap-2">
        <select
          name="product_id"
          value={data.product_id}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value=""></option>
          {products &&
            products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
        </select>
        <AddButton link="/addProduct" />
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Talla
      </label>
      <div className="flex items-center gap-2">
        <select
          name="size_id"
          value={data.size_id}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value=""></option>
          {sizes &&
            sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
        </select>
        <AddButton />
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Color
      </label>
      <div className="flex items-center gap-2">
        <select
          name="color_id"
          value={data.color_id}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value=""></option>
          {colors &&
            colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
        </select>
        <AddButton link="/addColor" />
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Cantidad
      </label>
      <input
        onChange={handleInputChange}
        type="number"
        min="0"
        max="99"
        step="1"
        name="quantity"
        value={data.quantity}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        required
      />
      <button
        type="button"
        onClick={onStockCreate}
        className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto"
      >
        Añadir compra
      </button>
    </div>
  );
}
