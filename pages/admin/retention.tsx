import AdminLayout from '../../components/AdminLayout';
import RetentionTool from '../../components/RetentionTool';
import { useApp } from '../../context/AppContext';

export default function RetentionPage() {
  const { clients, logout } = useApp();

  return (
    <AdminLayout onLogout={logout}>
      <RetentionTool clients={clients} />
    </AdminLayout>
  );
}
