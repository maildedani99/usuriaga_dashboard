"use client"
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import Modal from "../../../components/Modal";
import ViewOrderTable from "../../../components/ViewOrderTable";



export default function ViewOrder ( {params} ) {

    const { data : order, error : errorOrders } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}orders/${params.id}`, fetcher);



    return (
        <Modal>

          <ViewOrderTable order={order}  />
        </Modal>
    )
}