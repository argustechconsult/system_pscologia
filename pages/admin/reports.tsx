import AdminLayout from '../../components/AdminLayout';
import SessionReportManagement from '../../components/SessionReportManagement';
import { useApp } from '../../context/AppContext';

export default function ReportsPage() {
  const { appointments, clients, sessionReports, setSessionReports, logout } =
    useApp();

  return (
    <AdminLayout onLogout={logout}>
      <SessionReportManagement
        appointments={appointments}
        clients={clients}
        reports={sessionReports}
        setReports={setSessionReports}
      />
    </AdminLayout>
  );
}
