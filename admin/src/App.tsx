import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import useAuthStore from "./store/useAuthStore";
import { useState } from "react";
import { cn } from "./lib/utils";

export default function App() {
  const { isAuthenticated} = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex bg-background">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <div
        className={cn("flex flex-col flex-1 max-w-[--breakpoint-2xl] ", sidebarOpen ? "md:ml-64" : "md:ml-20")}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
