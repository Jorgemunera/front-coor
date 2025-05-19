import { useEffect, useState } from "react";
import { getReportData } from "../../services/reportsService";
import { type Filters } from "../../types/Filters";
import { type ReportEntry } from "../../types/ReportEntry";
import { formatDateTime } from "../../utils/formatters";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Reports = () => {
  const [filters, setFilters] = useState<Filters>({
    status: "",
    transporterId: undefined,
    startDate: "",
    endDate: "",
  });
  const [details, setDetalles] = useState<ReportEntry[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [avgTime, setAvgTime] = useState<number | null>(null);

  const fetchReport = async () => {
    try {
      const { details, total } = await getReportData(filters);
      setDetalles(details);
      setTotal(total);

      const times = details
        .map((d) => d.deliveryTimeHours)
        .filter((n) => typeof n === "number") as number[];

      const promedio = times.length
        ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)
        : null;

      setAvgTime(promedio ? parseFloat(promedio) : null);
    } catch (err) {
      console.error("Error al cargar el reporte", err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Delivery Report</h2>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Start Date</p>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">End Date</p>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Order Status</p>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">All statuses</option>
            <option value="En espera">En espera</option>
            <option value="En tránsito">En tránsito</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Transporter ID</p>
          <input
            type="number"
            name="transporterId"
            value={filters.transporterId || ""}
            onChange={handleChange}
            placeholder="Transporter ID"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="col-span-2">
          <button
            onClick={fetchReport}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>


      {/* Métricas */}
      <div className="mb-6">
        <p><strong>Total orders:</strong> {total}</p>
        <p><strong>Average delivery time:</strong> {avgTime !== null ? `${avgTime} hours` : "N/A"}</p>
      </div>

      {/* Gráfico */}
      {details.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-2">Chart by Status</h3>
          <BarChart width={600} height={300} data={getChartData(details)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3182ce" />
          </BarChart>

          <h3 className="text-xl font-semibold mt-6 mb-2">Detailed Report</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border bg-white text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">ID</th>
                  <th className="border px-2 py-1">Transporter</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">Delivery Time</th>
                  <th className="border px-2 py-1">Created At</th>
                  <th className="border px-2 py-1">Delivered At</th>
                </tr>
              </thead>
              <tbody>
                {details.map((r) => (
                  <tr key={r.orderId}>
                    <td className="border px-2 py-1">{r.orderId}</td>
                    <td className="border px-2 py-1">{r.transporter}</td>
                    <td className="border px-2 py-1">{r.status}</td>
                    <td className="border px-2 py-1">
                      {r.deliveryTimeHours !== null ? `${r.deliveryTimeHours} h` : "-"}
                    </td>
                    <td className="border px-2 py-1">{formatDateTime(r.createdAt)}</td>
                    <td className="border px-2 py-1">{r.deliveredAt ? formatDateTime(r.deliveredAt) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const getChartData = (entries: ReportEntry[]) => {
  const counts: Record<string, number> = {};
  for (const e of entries) {
    counts[e.status] = (counts[e.status] || 0) + 1;
  }
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
};

export default Reports;
