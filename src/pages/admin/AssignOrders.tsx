import { useEffect, useState } from "react";
import { getPendingOrders, assignOrder } from "../../services/ordersService";
import { getAvailableTransporters } from "../../services/transportersService";
import { getAvailableRoutes } from "../../services/routesService";
import { type Order } from "../../types/Order";
import { type Transporter } from "../../types/Transporter";
import { type Route } from "../../types/Route";

const AssignOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selected, setSelected] = useState<Record<number, { transporterId: string; routeId: string }>>({});
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const [o, t, r] = await Promise.all([
      getPendingOrders(),
      getAvailableTransporters(),
      getAvailableRoutes(),
    ]);
    setOrders(o);
    setTransporters(t);
    setRoutes(r);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (orderId: number) => {
    const { transporterId, routeId } = selected[orderId] || {};
    if (!transporterId || !routeId) {
      setMessage("Select transporter and route");
      return;
    }

    try {
      await assignOrder(orderId, parseInt(transporterId), parseInt(routeId));
      setMessage("Assigned successfully");
      await fetchData();
    } catch (err: any) {
      const customError =
        err?.response?.data?.error || "Error assigning order";
      setMessage(customError);
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
      {message && (
        <p
          className={`text-sm mb-3 ${message.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
            }`}
        >
          {message}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">Weight</th>
              <th className="px-4 py-2 border">Transporter</th>
              <th className="px-4 py-2 border">Route</th>
              <th className="px-4 py-2 border">Assign</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.destinationAddress}</td>
                <td className="px-4 py-2 border">{order.weight} kg</td>
                <td className="px-4 py-2 border">
                  <select
                    value={selected[order.id]?.transporterId || ""}
                    onChange={(e) =>
                      setSelected((prev) => ({
                        ...prev,
                        [order.id]: {
                          ...prev[order.id],
                          transporterId: e.target.value,
                        },
                      }))
                    }
                    className="border p-1"
                  >
                    <option value="">Select</option>
                    {transporters.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.capacity} kg)
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <select
                    value={selected[order.id]?.routeId || ""}
                    onChange={(e) =>
                      setSelected((prev) => ({
                        ...prev,
                        [order.id]: {
                          ...prev[order.id],
                          routeId: e.target.value,
                        },
                      }))
                    }
                    className="border p-1"
                  >
                    <option value="">Select</option>
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleAssign(order.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignOrders;
