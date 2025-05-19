import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { type   HistoryEntry } from "../../types/History";
import {config} from "../../config/config";


const wsP = config.wsProtocol;

const TrackOrder = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const loadInitial = async () => {
      const res1 = await api.get(`/orders/${id}/status`);
      const res2 = await api.get(`/orders/${id}/history`);
      setStatus(res1.data.status);
      setHistory(res2.data.history);
    };

    loadInitial();

    const socket = new WebSocket(`${wsP}://localhost:3000`);

    socket.addEventListener("open", () => {
      console.log("✅ WebSocket connected from client");
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.orderId?.toString() === id && data.newStatus) {
          setStatus(data.newStatus);
          setHistory((prev) => [
            ...prev,
            {
              status: data.newStatus,
              changedAt: data.updatedAt ?? new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error("WebSocket error:", err);
      }
    });

    socket.addEventListener("close", () => {
      console.log("🔌 WebSocket disconnected from client");
    });

    socket.addEventListener("error", (err) => {
      console.error("❌ WebSocket error on client:", err);
    });

    return () => socket.close();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tracking Order #{id}</h2>

      <div className="mb-6">
        <p className="font-medium">Current Status:</p>
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {status}
        </span>
      </div>

      <div>
        <p className="font-medium mb-2">Status History:</p>
        <ul className="space-y-2 text-sm">
          {history.map((entry, i) => (
            <li key={i} className="flex justify-between border-b pb-1">
              <span>{entry.status}</span>
              <span className="text-gray-500">
                {new Date(entry.changedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackOrder;
