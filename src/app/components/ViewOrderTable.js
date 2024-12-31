"use client";

import { useEffect, useState, useMemo } from "react";
import { getProductsByIds } from "../lib/data";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useRouter } from "next/navigation";

export default function ViewOrderTable({ order }) {
  // Fetch colores y tallas usando SWR
  const { data: colorsSizes, error: colorSizesError, isValidating: colorSizesLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}data/sizesColors`,
    fetcher
  );

  const router = useRouter()

  // Estado para almacenar los productos obtenidos
  const [products, setProducts] = useState([]);

  // Función para obtener productos por sus IDs
  const onGetProducts = async () => {
    try {
      // Extraer y filtrar los product_id válidos del pedido
      const productsArray = order?.items
        ?.map((item) => item.product_id)
        .filter((id) => Boolean(id)) || [];

      console.log("IDs de productos a enviar:", productsArray);

      // Obtener los productos desde el backend
      const resProducts = await getProductsByIds(productsArray);

      if (resProducts) {
        setProducts(resProducts);
        console.log("Productos recibidos:", resProducts);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Efecto para obtener los productos cuando el pedido cambia
  useEffect(() => {
    if (order) {
      onGetProducts();
    }
  }, [order]);

  // Crear un mapa de colores por su ID
  const colorsMap = useMemo(() => {
    if (!colorsSizes || !colorsSizes.colors) return {};
    const map = colorsSizes.colors.reduce((map, color) => {
      map[color.id] = color;
      return map;
    }, {});
    console.log("Mapa de Colores:", map);
    return map;
  }, [colorsSizes]);

  // Crear un mapa de tallas por su ID
  const sizesMap = useMemo(() => {
    if (!colorsSizes || !colorsSizes.sizes) return {};
    const map = colorsSizes.sizes.reduce((map, size) => {
      map[size.id] = size;
      return map;
    }, {});
    console.log("Mapa de Tallas:", map);
    return map;
  }, [colorsSizes]);

  // Crear un mapa de productos por su ID para facilitar la búsqueda
  const productsMap = useMemo(() => {
    const map = products.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {});
    console.log("Mapa de Productos:", map);
    return map;
  }, [products]);

  // Manejar estados de carga y error
  if (colorSizesLoading) {
    return <div className="p-6 bg-white rounded-lg shadow-md">Cargando detalles de colores y tallas...</div>;
  }

  if (colorSizesError) {
    return <div className="p-6 bg-white rounded-lg shadow-md">Error al cargar colores y tallas.</div>;
  }

  
console.log(order)

  return (
    order && (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles del Pedido: {order.ds_order  }</h2>

        {/* Información del Cliente */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Información del Cliente</h3>
          <p className="text-sm text-gray-600">
            Nombre: {order.customer.first_name} {order.customer.last_name}
          </p>
          <p className="text-sm text-gray-600">
            Dirección: {order.customer.address}, {order.customer.city}, {order.customer.province}, {order.customer.postal_code}
          </p>
          <p className="text-sm text-gray-600">Teléfono: {order.customer.phone}</p>
          <p className="text-sm text-gray-600">Email: {order.customer.email}</p>
        </div>

        {/* Detalles del Pedido */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Detalles del Pedido</h3>
          <p className="text-sm text-gray-600">
            Estado: <span className="capitalize font-medium">{order.status}</span>
          </p>
          <p className="text-sm text-gray-600">
            Fecha de creación: {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Última actualización: {new Date(order.updated_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Total: <span className="font-bold">€{order.total}</span>
          </p>
        </div>

        {/* Productos del Pedido */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Productos</h3>
          <div className="mt-4 space-y-4">
            {order.items.map((item) => {
              const product = productsMap[item.product_id];

              // Si el producto no está disponible
              if (!product) {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                  >
                    <div>
                      <p className="text-sm text-gray-700">Producto ID: {item.product_id}</p>
                      <p className="text-sm text-gray-700">Talla ID: {item.size_id}</p>
                      <p className="text-sm text-gray-700">Color ID: {item.color_id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-700">Cantidad: {item.quantity}</p>
                      <p className="text-sm text-gray-700">Precio: €{item.price}</p>
                    </div>
                  </div>
                );
              }

              // Obtener la primera imagen del producto
              const firstImage = product.images && product.images.length > 0 ? product.images[0].url : "";

              // Obtener detalles de talla directamente desde item.size_id
              const sizeDetail = sizesMap[item.size_id]
                ? `Talla: ${sizesMap[item.size_id].name}`
                : `Talla ID: ${item.size_id}`;

              // Obtener detalles de color directamente desde item.color_id
              const colorDetail = colorsMap[item.color_id]
                ? (
                    <span className="flex items-center">
                      Color: {colorsMap[item.color_id].name}
                      <span
                        className="ml-2 w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: colorsMap[item.color_id].color }}
                        title={colorsMap[item.color_id].name}
                      ></span>
                    </span>
                  )
                : `Color ID: ${item.color_id}`;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center">
                    {firstImage && (
                      <img
                        src={firstImage}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{product.name}</p>
                      <p className="text-sm text-gray-600">{sizeDetail}</p>
                      <p className="text-sm text-gray-600">{colorDetail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Cantidad: {item.quantity}</p>
                    <p className="text-sm text-gray-700">Precio: €{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón de Cerrar */}
        <div className="mt-6 text-right">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={() => router.back()}
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  );
}
