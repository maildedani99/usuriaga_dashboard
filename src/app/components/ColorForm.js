"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../lib/AuthContext";
import { colorCreate } from "../lib/data";
import CancelButton from "./CancelButton";
import AcceptButton from "./AceptButton";

export default function ColorForm() {
  const router = useRouter();
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { name, color } = formData;
    setIsFormValid(name.trim() !== "" && color.trim() !== "");
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resColor = await colorCreate(formData, auth.token);
      console.log(resColor);
      if (resColor.success) {
        router.push(`/alert?messageId=alert_color_succes`, undefined, { scroll: false });
      } else {
        router.push(`/alert?messageId=alert_color_error`, undefined, { scroll: false });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="grid gap-4 px-4 w-full mx-auto md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Agregar Nuevo Color
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre:
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="color"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Color:
          </label>
          <input
            type="color"
            name="color"
            required
            value={formData.color}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-10 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div className="flex w-full">
          <AcceptButton
            message="Aceptar"
            isDisabled={!isFormValid}
          />
          <CancelButton text="Cancelar" />
        </div>
      </form>
    </div>
  );
}
