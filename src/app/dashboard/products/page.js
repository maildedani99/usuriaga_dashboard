
"use client"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getProducts } from "../../lib/data"
import Link from "next/link";
import Image from "next/image";
import ProductsTable from "../../components/ProductsTable";
import Error from "../../components/Error";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";


export default  function Products() {


    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}products/all`, fetcher);

    if (error) return <Error />;

    return (
        <div className="flex flex-col mx-auto w-8/12 min-h-[80vh]">
            <ProductsTable products={data} />
        </div>



    )
}