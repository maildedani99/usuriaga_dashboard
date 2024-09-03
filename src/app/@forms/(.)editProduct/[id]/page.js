"use client"
import useSWR from "swr";
import EditProductForm from "../../../components/EditProductForm";
import Modal from "../../../components/Modal";
import { getProductById, getSubcategories } from "../../../lib/data";
import { fetcher } from "../../../utils/fetcher";
import Error from "../../../components/Error";
import { Aldrich } from "next/font/google";
import Spinner from "../../../components/Spinner";


export default  function EditProduct({ params }) {

    const { data: product, error:errorProduct } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}products/${params.id}`, fetcher);

    const { data:allData, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}data/all`, fetcher);


    if (errorProduct ) return <Error />;

    //const product = await getProductById(params.id)

    console.log(allData)

    return (
        <Modal>
            {product && allData ?
            <EditProductForm product={product} allData={allData}  />
            :
            <Spinner />
            }
        </Modal>
    )
}