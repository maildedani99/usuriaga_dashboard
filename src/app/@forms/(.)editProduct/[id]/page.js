import EditProductForm from "../../../components/EditProductForm";
import Modal from "../../../components/Modal";
import { getProductById, getSubcategories } from "../../../lib/data";


export default async function EditProduct({ params }) {

    const product = await getProductById(params.id)



    return (
        <Modal>
            <EditProductForm product={product && product}  />
        </Modal>
    )
}