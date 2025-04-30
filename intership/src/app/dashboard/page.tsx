// src/pages/dashboard.tsx
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <Dashboard /> {/* Тут відображаємо компонент Dashboard */}
    </div>
  );
};

export default DashboardPage;
