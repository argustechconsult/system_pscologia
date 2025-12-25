import AdminLayout from '../../components/AdminLayout';
import ScheduleManagement from '../../components/ScheduleManagement';
import { useApp } from '../../context/AppContext';

export default function SchedulePage() {
  const {
    appointments,
    setAppointments,
    clients,
    setFinances,
    settings,
    setSettings,
    logout,
  } = useApp();

  return (
    <AdminLayout onLogout={logout}>
      <ScheduleManagement
        appointments={appointments}
        setAppointments={setAppointments}
        clients={clients}
        setFinances={setFinances}
        settings={settings}
        setSettings={setSettings}
      />
    </AdminLayout>
  );
}
