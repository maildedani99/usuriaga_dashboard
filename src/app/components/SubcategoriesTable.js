import Link from "next/link";
import { getCategories, getProductsBySubcategory, getSubcategories } from "../lib/data"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export default async function SubcategoriesTable () {

    const subcategories = await getSubcategories()
    const categories = await getCategories()
    const products = await getProductsBySubcategory()

    const getCategoryBySubcategoryId = (categories, id) => {
            const category = categories.find(category => category.id === id);
            return category ? category.name : "no existe categoria"
    }

    console.log(products)

    return (
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Subcategoria
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Productos
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
                { subcategories &&
                    subcategories?.map((subcategory)=>
            <tr key={subcategory.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {subcategory.name}
                </th>
                <td className="px-6 py-4 text-center">
                   {getCategoryBySubcategoryId(categories, subcategory.category_id)}
                </td>
                <td className="px-6 py-4 text-center">
                    <span>{products.length}</span>
                </td>
                <td className="px-6 py-4 text-center">
                   <Link href="" ><CiEdit color="black" className="mx-auto"/></Link>
                </td>
                <td /* className={`${category.subcategories.length > 0 ? 'opacity-40' : ''}`} */>
                   <Link href="" className="mx-auto">
                     <RiDeleteBin6Line className="mx-auto"/>
                     </Link>
                </td>
            </tr>
                    )
                }
            
           
        </tbody>
        <div className="py-4">

        <span className="">* No se pueden eliminar categorias que contien productos.</span>
        </div>
    </table>
    )
}