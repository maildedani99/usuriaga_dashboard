import Modal from "../../../components/Modal";
import { getOrdersById } from "../../../lib/data";

export default async function EditOrder({ params }) {
    const order = await getOrdersById(params.id);

    if (!order) {
        return (
            <div>
                <p>Order not found</p>
            </div>
        );
    }

    const formattedDate = order.created_at.substring(0, 10);

    return (
        <Modal>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Order Info</h3>
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Order Number:</strong> {order.ds_order}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Created At:</strong> {formattedDate}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Customer Info</h3>
                    <p><strong>Name:</strong> {order.customer.first_name} {order.customer.last_name}</p>
                    <p><strong>Address:</strong> {order.customer.address}, {order.customer.city}, {order.customer.province}, {order.customer.postal_code}</p>
                    <p><strong>Phone:</strong> {order.customer.phone}</p>
                    <p><strong>Email:</strong> {order.customer.email}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Order Items</h3>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Product ID</th>
                                <th className="py-2">Size ID</th>
                                <th className="py-2">Color ID</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-2 text-center">{item.product_id}</td>
                                    <td className="py-2 text-center">{item.size_id}</td>
                                    <td className="py-2 text-center">{item.color_id}</td>
                                    <td className="py-2 text-center">{item.quantity}</td>
                                    <td className="py-2 text-center">${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
}
