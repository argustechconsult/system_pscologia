
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, DollarSign, Columns, RefreshCw, LogOut, FileText } from 'lucide-react';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-2xl font-bold text-white tracking-tight">Soraia</h1>
          <p className="text-[9px] text-teal-400 uppercase tracking-[0.3em] font-black mt-1">Neuropsicologia</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink 
            to="/admin/clients" 
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={20} /> Clientes
          </NavLink>
          <NavLink 
            to="/admin/schedule" 
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Calendar size={20} /> Agendamento
          </NavLink>
          <NavLink 
            to="/admin/reports" 
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText size={20} /> Relato de Sessão
          </NavLink>
          <NavLink 
            to="/admin/kanban" 
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Columns size={20} /> Kanban
          </NavLink>
          <NavLink 
            to="/admin/finance" 
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <DollarSign size={20} /> Financeiro
          </NavLink>
          <NavLink 
            to="/admin/retention" 
            className={({ isActive }) => `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-semibold ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <RefreshCw size={20} /> Retenção
          </NavLink>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-bold border border-red-500/20"
          >
            <LogOut size={20} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Seja bem-vinda, Soraia!</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Soraia Rodrigues</p>
              <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Psicóloga & Neuropsicóloga</p>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/soraia/100" 
                className="w-11 h-11 rounded-full border-2 border-teal-500 shadow-lg p-0.5" 
                alt="Soraia"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </header>
        <div className="p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
