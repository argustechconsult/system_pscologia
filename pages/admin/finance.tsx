import AdminLayout from '../../components/AdminLayout';
import FinancialManagement from '../../components/FinancialManagement';
import { useApp } from '../../context/AppContext';

export default function FinancePage() {
  const { finances, setFinances, logout } = useApp();

  return (
    <AdminLayout onLogout={logout}>
      <FinancialManagement finances={finances} setFinances={setFinances} />
    </AdminLayout>
  );
}
