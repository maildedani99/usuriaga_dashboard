"use client"
import useSWR from "swr";
import OrdersTable from "../../components/OrdersTable";
import { fetcher } from "../../utils/fetcher";
import Error from "../../components/Error";


export default function Orders () {

    const { data:orders, error:errorOrders } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}orders/all`, fetcher);
    const { data: customers, error:errorCustomers } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}customers/all`, fetcher);

    if (errorOrders ||errorCustomers ) return <Error />;

    return (
        <div className="flex flex-col mx-auto w-8/12 min-h-[80vh]">
        <OrdersTable orders={orders} customers={customers} />
        </div>
    )
}