"use client";

import { useContext, useEffect, useState } from "react";
import { UploadPhotoContext } from "../lib/UploadPhotoContext";
import { AppContext } from "../lib/AppContext";
import { AuthContext } from "../lib/AuthContext";
import UploadPhoto from "./Uploadphoto/UploadPhoto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct } from "../lib/data";
import CancelButton from "./CancelButton";
import AcceptButton from "./AceptButton";

export default function AddProductForm() {
  const { uploadPhotoArray, setUploadPhotoArray } = useContext(UploadPhotoContext);
  const { subcategories, loadProducts } = useContext(AppContext);
  const { auth } = useContext(AuthContext);

  const router = useRouter()

  const initialState = {
    name: "",
    price: "",
    reduced_price: "",
    subcategory_id: "",
    description: "",
    novelty: false,
    outlet: false,
  };

  const [data, setData] = useState(initialState);
  const [checkedList, setCheckList] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onReturn = () => {
    router.back()
  }

  const selectTrue = () => {
    const selectedSubcategories = [];
    for (const property in checkedList) {
      if (checkedList[property]) {
        selectedSubcategories.push(property);
      }
    }
    return selectedSubcategories;
  };

  const onCreateProduct = async () => {
    try {
      const checkedListArray = selectTrue();
      const resCreateProduct = await createProduct(data, checkedListArray, uploadPhotoArray, auth.token);
      if (resCreateProduct.success) {
        loadProducts()
        setUploadPhotoArray([])
        setData(initialState)
        router.push(`/alert?messageId=alert_create_product_success`);
      }
    } catch (error) {
      router.push(`/alert?messageId=alert_create_product_error`, undefined, { scroll: false });
      console.error('Error en la solicitud:', error);
    }
  };

useEffect(()=> {
  console.log(uploadPhotoArray)
},[uploadPhotoArray])


  return (
    <div>
      <div className="flex">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 px-8">
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre producto
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={data.name}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Precio
            </label>
            <input
              onChange={handleInputChange}
              type="number"
              name="price"
              value={data.price}
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  mt-6">
              Precio rebajado
            </label>
            <input
              onChange={handleInputChange}
              type="number"
              name="reduced_price"
              value={data.reduced_price}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sub-categoria
            </label>
            <select
              id="subcategory_id"
              name="subcategory_id"
              value={data.subcategory_id}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value=""></option>
              {subcategories && subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripción
            </label>
            <textarea
              onChange={handleInputChange}
              id="description"
              name="description"
              value={data.description}
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            ></textarea>
          </div>
          <div className="flex items-center mb-4 my-auto">
            <input
              onChange={handleInputChange}
              name="novelty"
              type="checkbox"
              checked={data.novelty}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Añadir a novedades
            </label>
          </div>
          <div className="flex items-center mb-4 my-auto">
            <input
              onChange={handleInputChange}
              name="outlet"
              type="checkbox"
              checked={data.outlet}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Añadir a outlet
            </label>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 px-8">
          <UploadPhoto name="image1" num={uploadPhotoArray[0]} />
          <UploadPhoto name="image2" num={uploadPhotoArray[1]} />
          <UploadPhoto name="image3" num={uploadPhotoArray[2]} />
          <UploadPhoto name="image4" num={uploadPhotoArray[3]} />
          <UploadPhoto name="image5" num={uploadPhotoArray[4]} />
          <UploadPhoto name="image6" num={uploadPhotoArray[5]} />
        </div>
      </div>
      <div className="flex w-full mt-4">
        <button
          onClick={onCreateProduct}
          type="btn"
          className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white rounded-lg focus:ring-4 mx-auto bg-primary-700 hover:bg-primary-800 focus:ring-primary-200 dark:focus:ring-primary-900"
        >
          Añadir producto
        </button>
        <CancelButton onClick={onReturn} text="Cancelar" />

      </div>
      {statusMessage && <p className="text-center mt-4">{statusMessage}</p>}
    </div>
  );
}
