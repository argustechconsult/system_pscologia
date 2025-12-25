import AdminLayout from '../../components/AdminLayout';
import KanbanBoard from '../../components/KanbanBoard';
import { useApp } from '../../context/AppContext';

export default function KanbanPage() {
  const { kanbanTasks, setKanbanTasks, logout } = useApp();

  return (
    <AdminLayout onLogout={logout}>
      <KanbanBoard tasks={kanbanTasks} setTasks={setKanbanTasks} />
    </AdminLayout>
  );
}
