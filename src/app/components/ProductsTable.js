import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import ClientImage from "./ClientImage";
import { getProducts } from "../lib/data";



export default async function ProductsTable() {

  const products = await getProducts();

  if (!Array.isArray(products)) {
    return <div>No se encontraron categorías.</div>;
  }

  return (
    products &&
    <div>
      <div className="flex justify-end mt-4 mb-4">
        <Link href="/addProduct" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">

          Añadir Nuevo
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Imagen
            </th>
            <th scope="col" className="px-6 py-3">
              Producto
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Precio
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Precio 2
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Subcategoria
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Editar
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Eliminar *
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <ClientImage
                    src={product?.images[0]?.url}
                    width={50}
                    height={100}
                    alt="imagen del producto"
                  />
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4 text-center">{product.price}</td>
                <td className="px-6 py-4 text-center">{product.reduced_price}</td>
                <td className="px-6 py-4 text-center">{product.subcategory}</td>
                <td className="px-6 py-4 text-center">
                  <Link href={`/editProduct/${product.id}`}>
                    <CiEdit color="black" className="mx-auto" />
                  </Link>
                </td>
                <td>
                  <Link href="" className="mx-auto">
                    <RiDeleteBin6Line className="mx-auto" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}