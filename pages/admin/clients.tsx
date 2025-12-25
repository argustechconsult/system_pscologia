import AdminLayout from '../../components/AdminLayout';
import ClientManagement from '../../components/ClientManagement';
import { useApp } from '../../context/AppContext';

export default function ClientsPage() {
  const { clients, setClients, logout } = useApp();

  return (
    <AdminLayout onLogout={logout}>
      <ClientManagement clients={clients} setClients={setClients} />
    </AdminLayout>
  );
}
