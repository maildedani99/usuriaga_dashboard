"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../lib/AuthContext";
import { useRouter } from "next/navigation";
import { stockCreate } from "../lib/data";

export default function SalesForm({ allStock, stock, sizesColors }) {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [availableQuantity, setAvailableQuantity] = useState(0);

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

    if (name === "product_id") {
      const selectedProductStock = stock.filter(
        (stockItem) => stockItem.product_id === parseInt(value)
      );

      const availableSizes = Array.from(
        new Set(selectedProductStock.map((stockItem) => stockItem.size_id))
      );

      setSizes(
        availableSizes.map((size_id) => {
          const size = sizesColors.sizes.find((s) => s.id === size_id);
          return { id: size_id, name: size ? size.name : `Talla ${size_id}` };
        })
      );

      setColors([]);
      setAvailableQuantity(0);
      setData((prevData) => ({ ...prevData, size_id: "", color_id: "" }));
    }

    if (name === "size_id") {
      const selectedProductStock = stock.filter(
        (stockItem) =>
          stockItem.product_id === parseInt(data.product_id) &&
          stockItem.size_id === parseInt(value)
      );

      const availableColors = Array.from(
        new Set(selectedProductStock.map((stockItem) => stockItem.color_id))
      );

      setColors(
        availableColors.map((color_id) => {
          const color = sizesColors.colors.find((c) => c.id === color_id);
          return { id: color_id, name: color ? color.name : `Color ${color_id}` };
        })
      );

      setAvailableQuantity(0);
      setData((prevData) => ({ ...prevData, color_id: "" }));
    }

    if (name === "color_id") {
      const selectedStock = stock.find(
        (stockItem) =>
          stockItem.product_id === parseInt(data.product_id) &&
          stockItem.size_id === parseInt(data.size_id) &&
          stockItem.color_id === parseInt(value)
      );

      if (selectedStock) {
        setAvailableQuantity(selectedStock.quantity);
      } else {
        setAvailableQuantity(0);
      }
    }
  };

  const resetForm = () => {
    setData(initialState);
    setSizes([]);
    setColors([]);
    setAvailableQuantity(0);
  };

  const onStockCreate = async () => {
    try {
      const resStockCreate = await stockCreate(data, auth.token);

      if (resStockCreate && resStockCreate.status === "success") {
        router.push(
          `/alert?messageId=alert_create_stock_success&messageFetch=${encodeURIComponent(
            resStockCreate.message
          )}`
        );
        resetForm();
      } else {
        router.push(
          `/alert?messageId=alert_create_stock_error&messageFetch=${encodeURIComponent(
            resStockCreate.message
          )}`
        );
      }
    } catch (error) {
      console.error("Error al crear el stock:", error);
      router.push(
        `/alert?messageId=alert_create_stock_error&messageFetch=${encodeURIComponent(
          "An unexpected error occurred."
        )}`
      );
    }
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
          {allStock &&
            allStock.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
        </select>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Talla
      </label>
      <div className="flex items-center gap-2">
        <select
          name="size_id"
          value={data.size_id}
          onChange={handleInputChange}
          disabled={!data.product_id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value=""></option>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name}
            </option>
          ))}
        </select>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Color
      </label>
      <div className="flex items-center gap-2">
        <select
          name="color_id"
          value={data.color_id}
          onChange={handleInputChange}
          disabled={!data.size_id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value=""></option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      {availableQuantity > 0 && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Cantidad disponible: {availableQuantity}
        </p>
      )}

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Cantidad
      </label>
      <input
        onChange={handleInputChange}
        type="number"
        min="0"
        max={availableQuantity}
        step="1"
        name="quantity"
        value={data.quantity}
        disabled={!data.color_id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        required
      />
      <button
        type="button"
        onClick={onStockCreate}
        className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto"
        disabled={!data.quantity || !data.product_id || !data.size_id || !data.color_id}
      >
        Registrar Venta
      </button>
    </div>
  );
}
