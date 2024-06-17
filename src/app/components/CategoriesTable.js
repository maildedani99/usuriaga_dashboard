import Link from "next/link";
import { getCategories } from "../lib/data";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export default async function CategoriesTable() {
  const categories = await getCategories();

  console.log(categories)

  return (
    categories &&
    <div>
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Subcategorias
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
          {categories &&
            categories.map((category) => (
              <tr
                key={category.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.name}
                </th>
                <td className="px-6 py-4 text-center">
                  {category.subcategories.length}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link href="">
                    <CiEdit color="black" className="mx-auto" />
                  </Link>
                </td>
                <td
                  className={`${
                    category.subcategories.length > 0 ? "opacity-40" : ""
                  }`}
                >
                  <Link href="" className="mx-auto">
                    <RiDeleteBin6Line className="mx-auto" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <span className="py-4">
        * No se pueden eliminar categorias que contien subcategorias.
      </span>
    </div>
  );
}
