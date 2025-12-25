
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import ClientManagement from './components/ClientManagement';
import ScheduleManagement from './components/ScheduleManagement';
import FinancialManagement from './components/FinancialManagement';
import KanbanBoard from './components/KanbanBoard';
import RetentionTool from './components/RetentionTool';
import SessionReportManagement from './components/SessionReportManagement';
import { Client, Appointment, FinancialRecord, KanbanTask, SessionReport, GlobalSettings } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('soraia_auth') === 'true';
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('soraia_settings');
    return saved ? JSON.parse(saved) : { defaultPrice: 250, defaultDuration: 50 };
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('soraia_clients');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'João Silva', address: 'Rua das Flores, 123', phone: '2199999999', email: 'joao@email.com', status: 'active', treatmentStage: 'In Treatment', lastSessionDate: '2023-10-20' },
      { id: '2', name: 'Maria Souza', address: 'Av. Paulista, 1000', phone: '2198888888', email: 'maria@email.com', status: 'inactive', treatmentStage: 'Evaluation', lastSessionDate: '2023-08-15' },
    ];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('soraia_appointments');
    if (saved) return JSON.parse(saved);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    return [
      { 
        id: 'app-joao-1', 
        clientId: '1', 
        date: tomorrowStr, 
        time: '14:00', 
        type: 'Clinical', 
        status: 'scheduled', 
        meetLink: 'https://meet.google.com/soraia-joao-session',
        price: 250,
        duration: 50
      },
      { 
        id: 'app-maria-prev', 
        clientId: '2', 
        date: '2023-08-15', 
        time: '10:00', 
        type: 'Neuropsychology', 
        status: 'completed',
        price: 450,
        duration: 90
      }
    ];
  });

  const [sessionReports, setSessionReports] = useState<SessionReport[]>(() => {
    const saved = localStorage.getItem('soraia_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [finances, setFinances] = useState<FinancialRecord[]>(() => {
    const saved = localStorage.getItem('soraia_finances');
    return saved ? JSON.parse(saved) : [];
  });

  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(() => {
    const saved = localStorage.getItem('soraia_kanban');
    return saved ? JSON.parse(saved) : [
      { id: 'k1', title: 'Análise de Testes - João', status: 'doing' },
      { id: 'k2', title: 'Relatório Final - Maria', status: 'todo' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('soraia_clients', JSON.stringify(clients));
    localStorage.setItem('soraia_appointments', JSON.stringify(appointments));
    localStorage.setItem('soraia_reports', JSON.stringify(sessionReports));
    localStorage.setItem('soraia_finances', JSON.stringify(finances));
    localStorage.setItem('soraia_kanban', JSON.stringify(kanbanTasks));
    localStorage.setItem('soraia_settings', JSON.stringify(settings));
  }, [clients, appointments, sessionReports, finances, kanbanTasks, settings]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('soraia_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('soraia_auth');
  };

  const registerNewBooking = (clientData: { name: string, email: string, phone: string }, appointmentData: { date: string, time: string }) => {
    let existingClient = clients.find(c => c.email.toLowerCase() === clientData.email.toLowerCase());
    let clientId = '';

    if (!existingClient) {
      clientId = Date.now().toString();
      const newClient: Client = {
        id: clientId,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        address: 'Pendente',
        status: 'pending',
        treatmentStage: 'First Contact'
      };
      setClients(prev => [...prev, newClient]);
    } else {
      clientId = existingClient.id;
    }

    const price = settings.defaultPrice;
    const duration = settings.defaultDuration;
    
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      clientId: clientId,
      date: appointmentData.date,
      time: appointmentData.time,
      type: 'Clinical',
      status: 'scheduled',
      meetLink: `https://meet.google.com/soraia-${Math.random().toString(36).substring(7)}`,
      price: price,
      duration: duration
    };
    
    setAppointments(prev => [...prev, newAppointment]);

    const newFinancialRecord: FinancialRecord = {
      id: `f-${Date.now()}`,
      description: `Agendamento Online - ${clientData.name}`,
      amount: price,
      type: 'income',
      date: appointmentData.date,
      category: 'Atendimento'
    };
    setFinances(prev => [...prev, newFinancialRecord]);
    
    return newAppointment;
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage appointments={appointments} onBookingComplete={registerNewBooking} settings={settings} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        
        {isAuthenticated ? (
          <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<AdminDashboard clients={clients} appointments={appointments} finances={finances} />} />
            <Route path="clients" element={<ClientManagement clients={clients} setClients={setClients} />} />
            <Route path="schedule" element={<ScheduleManagement 
                appointments={appointments} 
                setAppointments={setAppointments} 
                clients={clients} 
                setFinances={setFinances}
                settings={settings}
                setSettings={setSettings}
              />} 
            />
            <Route path="reports" element={<SessionReportManagement appointments={appointments} clients={clients} reports={sessionReports} setReports={setSessionReports} />} />
            <Route path="finance" element={<FinancialManagement finances={finances} setFinances={setFinances} />} />
            <Route path="kanban" element={<KanbanBoard tasks={kanbanTasks} setTasks={setKanbanTasks} />} />
            <Route path="retention" element={<RetentionTool clients={clients} />} />
          </Route>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
