import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">Empresa de envios</h2>
        <p className="text-sm mb-4">Logged in as: {user?.email}</p>
        <nav className="space-y-2">
          <button
            className="block w-full text-left hover:text-blue-300"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          {/* Aquí puedes agregar más botones */}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
