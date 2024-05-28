"use client";

import { useContext, useEffect, useState } from "react";
import UploadPhoto from "./Uploadphoto/UploadPhoto";
import { UploadPhotoContext } from "../lib/UploadPhotoContext";
import { createProduct, getSubcategories } from "../lib/data";
import { AppContext } from "../lib/AppContext";
import { AuthContext } from "../lib/AuthContext";

export default function AddProductForm() {
  const { uploadPhotoArray } = useContext(UploadPhotoContext);
  const { subcategories } = useContext(AppContext);
  const { auth } = useContext(AuthContext)
  const [data, setData] = useState({});
  const [checkedList, setCheckList] = useState({});
  
  var checkedListArray = [];
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    console.log(auth);
  };

  const handleCheckbox = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.checked,
    });
    console.log(data);
  };

  const selectTrue = () => {
    for (const property in checkedList) {
      if (checkedList[property] === true) {
        checkedListArray.push(property);
      }
    }
  }

  const onCreateProduct = async () => {
    selectTrue();
    console.log(auth.token)
    //const token = auth.token
    const resCreateProduct = await createProduct(data, checkedListArray, uploadPhotoArray, auth.token)
    console.log(resCreateProduct)
  }

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
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Precio rebajado
            </label>
            <input
              onChange={handleInputChange}
              type="number"
              name="reduced_price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sub-categoria
            </label>
            <select
              id="category"
              name="subcategory_id"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
               <option value={" "} ></option>
              {subcategories &&
                subcategories?.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              onChange={handleInputChange}
              id="description"
              name="description"
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            ></textarea>
          </div>
          
          
          <div className="flex items-center mb-4 my-auto">
            <input
              onChange={(e) => handleCheckbox(e)}
              name="novelty"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Añadir a novedades
            </label>
          </div>
          <div className="flex items-center mb-4 my-auto">
            <input
              onChange={(e) => handleCheckbox(e)}
              name="outlet"
              type="checkbox"
              value=""
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
          type="button"
          onClick={onCreateProduct}
          className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto"
        >
          Añadir producto
        </button>
      </div>
    </div>
  );
}
