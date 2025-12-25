import AdminLayout from '../../components/AdminLayout';
import AdminDashboard from '../../components/AdminDashboard';
import { useApp } from '../../context/AppContext';

export default function AdminDashboardPage() {
  const { clients, appointments, finances, logout } = useApp();

  return (
    <AdminLayout onLogout={logout}>
      <AdminDashboard
        clients={clients}
        appointments={appointments}
        finances={finances}
      />
    </AdminLayout>
  );
}
