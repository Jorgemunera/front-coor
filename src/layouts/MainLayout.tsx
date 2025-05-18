import { type ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default MainLayout;
