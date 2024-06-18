"use client"
import { useEffect, useState } from "react";
import EditProductForm from "../../../components/EditProductForm";
import Modal from "../../../components/Modal";
import { getProductById, getSubcategories } from "../../../lib/data";


export  async function EditProduct({ params }) {

    const [product, setProduct] = useState({});

    const onGetProductByID = async () => {
        const product = await getProductById(params.id)
        console.log(product)
        setProduct(product)
    }

    useEffect(()=> {
        onGetProductByID()
    },[params])


    return (
        <Modal>
            <EditProductForm product={product ? product : {}}  />
        </Modal>
    )
}