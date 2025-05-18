import { useEffect, useState } from "react";
import { getUserOrders } from "../../services/ordersService";
import { type Order } from "../../types/Order";

const History = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Weight</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.destinationAddress}</td>
                  <td className="px-4 py-2 border">{order.productType}</td>
                  <td className="px-4 py-2 border">{order.weight} kg</td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
