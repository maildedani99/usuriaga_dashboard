
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getProducts } from "../../lib/data"
import Link from "next/link";
import Image from "next/image";
import ProductsTable from "../../components/ProductsTable";


export default async function Products() {

    const products = await getProducts();


    return (
        <div className="flex flex-col mx-auto w-8/12 min-h-[80vh]">
            <ProductsTable products={products} />
        </div>



    )
}