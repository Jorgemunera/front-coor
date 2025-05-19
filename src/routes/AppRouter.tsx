import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateOrder from "../pages/orders/CreateOrder";
import History from "../pages/orders/History";
import AssignOrders from "../pages/admin/AssignOrders";
import TrackOrder from "../pages/tracking/TrackOrder";


const AppRouter = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/create-order"
          element={
            <ProtectedRoute>
              {user?.role === "user" ? (
                <MainLayout>
                  <CreateOrder />
                </MainLayout>
              ) : (
                <Navigate to="/dashboard" />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/history"
          element={
            <ProtectedRoute>
              {user?.role === "user" ? (
                <MainLayout>
                  <History />
                </MainLayout>
              ) : (
                <Navigate to="/dashboard" />
              )}
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
        />
        <Route
          path="/admin/assign-orders"
          element={
            <ProtectedRoute>
              {user?.role === "admin" ? (
                <MainLayout>
                  <AssignOrders />
                </MainLayout>
              ) : (
                <Navigate to="/dashboard" />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TrackOrder />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
