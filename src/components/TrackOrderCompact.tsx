import { useEffect, useState } from "react";
import api from "../services/api";
import { type HistoryEntry } from "../types/History";
import {config} from "../config/config";

const wsP = config.wsProtocol;

interface Props {
  orderId: number;
}

const TrackOrderCompact = ({ orderId }: Props) => {
  const [status, setStatus] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const statusRes = await api.get(`/orders/${orderId}/status`);
      console.log("Status response:", statusRes.data);
      const historyRes = await api.get(`/orders/${orderId}/history`);
      console.log("History response:", historyRes.data);
      setStatus(statusRes.data.status);
      setHistory(historyRes.data.history);
    };

    fetchData();

    const socket = new WebSocket(`${wsP}://localhost:3000`);

    socket.addEventListener("open", () => {
      console.log("✅ WebSocket connected from client");
    });

    socket.addEventListener("message", (event) => {
      console.log("📨 Message received from server:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.orderId === orderId && data.newStatus) {
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
        console.error("WebSocket parse error:", err);
      }
    });

    socket.addEventListener("close", () => {
      console.log("🔌 WebSocket disconnected from client");
    });

    socket.addEventListener("error", (err) => {
      console.error("❌ WebSocket error on client:", err);
    });

    return () => socket.close();
  }, [orderId]);

  return (
    <div>
      <p className="font-semibold mb-2">Current Status:</p>
      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-3">
        {status}
      </span>

      <p className="font-semibold mb-2">Status History:</p>
      <ul className="text-sm text-gray-700 space-y-1">
        {history.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.status}</strong> –{" "}
            {new Date(entry.changedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackOrderCompact;
