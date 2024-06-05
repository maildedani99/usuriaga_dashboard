import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getColors } from "../lib/data";

export default async function ColorsTable() {
  const colors = await getColors();

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <Link href="/addColor" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">

          Añadir Nuevo
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Codigo
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Editar
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {colors &&
            colors.map((color) => (
              <tr key={color.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {color.name}
                </th>
                <td className="px-6 py-4 text-center">{color.color}</td>
                <td className="px-6 py-4 text-center">
                  <Link href="">
                    <CiEdit color="black" className="mx-auto" />
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link href="">
                    <RiDeleteBin6Line className="mx-auto" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
