"use client"
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getOrders, getcustomers } from "../lib/data";


export default  function OrdersTable ({orders, customers}) {



    const onFormattedDate = (created_at) => {
        const formattedDate = new Date(created_at).toLocaleDateString();
        return formattedDate;
    } 

  
    
    return (
        orders &&
    <div>
      <div className="flex justify-end mt-4 mb-4">
        <Link href="/addProduct" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">

          Añadir Nuevo
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
           
            <th scope="col" className="px-6 py-3">
              Pedido
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              cliente
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              importe
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              fecha
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              estado
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
          {orders &&
            orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.ds_order}
                </th>
                <td className="px-6 py-4 text-center">{
                    customers &&
                    customers?.map((customer)=> (
                       customer.id===order.customer_id && (customer.last_name + ", " + customer.first_name)
                    ))
            }</td>
                <td className="px-6 py-4 text-center">{order.total}</td>
                <td className="px-6 py-4 text-center">{onFormattedDate(order.created_at)}</td>
                <td className="px-6 py-4 text-center">{order.status == "pending" ? "pendiente" : "confirmado"  }</td>
                <td className="px-6 py-4 text-center">   <Link href={`/editOrder/${order.id}`}>
                    <CiEdit color="black" className="mx-auto" />
                  </Link></td>
                <Link href="" className="mx-auto">
                    <RiDeleteBin6Line className="mx-auto" />
                  </Link>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    )
}