"use client";

import { useContext, useState, useEffect } from "react";
import { UploadPhotoContext } from "../lib/UploadPhotoContext";
import { AppContext } from "../lib/AppContext";
import { AuthContext } from "../lib/AuthContext";
import { useRouter } from "next/navigation";
import { updateProduct } from "../lib/data";
import CancelButton from "./CancelButton";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { isNovelty, isOutlet } from "../lib/helpers";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import Spinner from "./Spinner";

export default function EditProductForm({ product, allData }) {
  const { uploadPhotoArray, setUploadPhotoArray } = useContext(UploadPhotoContext);
  const { auth } = useContext(AuthContext);
  const { subcategories, outlets, novelties} = allData
  const router = useRouter();

  const [loading, setLoading] = useState(true);  // Estado para manejar el spinner de carga



  const initialState = {
    name: product.name,
    price: product.price,
    reduced_price: product?.reduced_price,
    subcategory_id: product.subcategory_id,
    description: product.description,
    novelty: isNovelty(novelties, product.id),
    outlet: isOutlet(outlets, product.id),
  };

  const [data, setData] = useState(initialState);
  const [productImages, setProductImages] = useState(product.images.map(image => ({ url: image.url })) || []);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      novelty: isNovelty(novelties, product.id),
      outlet: isOutlet(outlets, product.id),
    }));
  }, [novelties, outlets, product.id]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onReturn = () => {
    router.back();
  };

  const openUploadWidget = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          multiple: true,
          resourceType: 'image',
          clientAllowedFormats: ['png', 'jpg', 'jpeg'],
          maxImageFileSize: 5000000, // 5MB
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const newImage = { url: result.info.secure_url };
            setProductImages((prevImages) => [...prevImages, newImage]);
            setUploadPhotoArray((prevUrls) => [...prevUrls, newImage.url]);
          } else if (error) {
            console.error("Error al subir imagen:", error);
          }
        }
      );
    }
  };

  const handleDeleteImage = (index) => {
    console.log(productImages)
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setUploadPhotoArray((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const onUpdateProduct = async () => {
    console.log(productImages)

    try {
      const imagesArray = productImages.map((image) => image.url);
      const resUpdateProduct = await updateProduct(data, [], imagesArray, auth.token, product.id);
      if (resUpdateProduct.success) {
        loadAllData();
        router.push(`/alert?messageId=alert_edit_product_success`);
      }
    } catch (error) {
      router.push(`/alert?messageId=alert_edit_product_error`, undefined, { scroll: false });
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
     
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6">
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
            {subcategories &&
              subcategories.map((subcategory) => (
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
        { productImages.map((image, index) => (
          <div key={index} className="relative">
              {loading && (
              <div className="flex justify-center items-center w-[100px] h-[150px]">
                <Spinner size={40} />
              </div>
            )}
            <Image
              src={image.url}
              width={100}
              height={150}
              alt="imagen del producto"
              className="mx-auto"
              onLoadingComplete={() => setLoading(false)}  // Oculta el spinner cuando la imagen se ha cargado
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute bottom-0 left-0 m-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <RiDeleteBin6Line className="mx-auto" />
            </button>
          </div>
        ))
      }
      </div>
      <div className="flex w-full mt-4">
        <button
          onClick={openUploadWidget}
          type="button"
          className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white rounded-lg focus:ring-4 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-blue-200 dark:focus:ring-blue-900"
        >
          Subir imagen
        </button>
        <button
          onClick={onUpdateProduct}
          type="button"
          className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white rounded-lg focus:ring-4 mx-auto bg-primary-700 hover:bg-primary-800 focus:ring-primary-200 dark:focus:ring-primary-900"
        >
          Actualizar producto
        </button>
        <CancelButton onClick={onReturn} text="Cancelar" />
      </div>
      {statusMessage && <p className="text-center mt-4">{statusMessage}</p>}
    </div>
  );
}
