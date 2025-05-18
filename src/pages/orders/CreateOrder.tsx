import { useState } from "react";
import { createOrder } from "../../services/ordersService";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destinationAddress: "",
    productType: "",
    weight: "",
    dimensions: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createOrder({
        destinationAddress: form.destinationAddress,
        productType: form.productType,
        weight: parseFloat(form.weight),
        dimensions: form.dimensions,
      });

      setSuccess("Order created successfully");
      setForm({
        destinationAddress: "",
        productType: "",
        weight: "",
        dimensions: "",
      });

      setTimeout(() => navigate("/user/history"), 1400);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error creating order");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Order</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="destinationAddress"
          placeholder="Destination Address"
          value={form.destinationAddress}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="productType"
          placeholder="Product Type"
          value={form.productType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="dimensions"
          placeholder="Dimensions (e.g. 10x20x30 cm)"
          value={form.dimensions}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
