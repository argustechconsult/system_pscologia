import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  Client,
  Appointment,
  FinancialRecord,
  KanbanTask,
  SessionReport,
  GlobalSettings,
} from '../types';

interface AppContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  sessionReports: SessionReport[];
  setSessionReports: React.Dispatch<React.SetStateAction<SessionReport[]>>;
  finances: FinancialRecord[];
  setFinances: React.Dispatch<React.SetStateAction<FinancialRecord[]>>;
  kanbanTasks: KanbanTask[];
  setKanbanTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>;
  settings: GlobalSettings;
  setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  registerNewBooking: (
    clientData: { name: string; email: string; phone: string },
    appointmentData: { date: string; time: string },
  ) => Appointment;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize state only on client-side to avoid hydration mismatch
  useEffect(() => {
    const auth = localStorage.getItem('soraia_auth') === 'true';
    setIsAuthenticated(auth);
  }, []);

  const [settings, setSettings] = useState<GlobalSettings>({
    defaultPrice: 250,
    defaultDuration: 50,
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sessionReports, setSessionReports] = useState<SessionReport[]>([]);
  const [finances, setFinances] = useState<FinancialRecord[]>([]);
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([]);

  // Load initial data
  useEffect(() => {
    const savedSettings = localStorage.getItem('soraia_settings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    const savedClients = localStorage.getItem('soraia_clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      setClients([
        {
          id: '1',
          name: 'João Silva',
          address: 'Rua das Flores, 123',
          phone: '2199999999',
          email: 'joao@email.com',
          status: 'active',
          treatmentStage: 'In Treatment',
          lastSessionDate: '2023-10-20',
        },
        {
          id: '2',
          name: 'Maria Souza',
          address: 'Av. Paulista, 1000',
          phone: '2198888888',
          email: 'maria@email.com',
          status: 'inactive',
          treatmentStage: 'Evaluation',
          lastSessionDate: '2023-08-15',
        },
      ]);
    }

    const savedAppointments = localStorage.getItem('soraia_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      setAppointments([
        {
          id: 'app-joao-1',
          clientId: '1',
          date: tomorrowStr,
          time: '14:00',
          type: 'Clinical',
          status: 'scheduled',
          meetLink: 'https://meet.google.com/soraia-joao-session',
          price: 250,
          duration: 50,
        },
        {
          id: 'app-maria-prev',
          clientId: '2',
          date: '2023-08-15',
          time: '10:00',
          type: 'Neuropsychology',
          status: 'completed',
          price: 450,
          duration: 90,
        },
      ]);
    }

    const savedReports = localStorage.getItem('soraia_reports');
    if (savedReports) setSessionReports(JSON.parse(savedReports));

    const savedFinances = localStorage.getItem('soraia_finances');
    if (savedFinances) setFinances(JSON.parse(savedFinances));

    const savedKanban = localStorage.getItem('soraia_kanban');
    if (savedKanban) {
      setKanbanTasks(JSON.parse(savedKanban));
    } else {
      setKanbanTasks([
        { id: 'k1', title: 'Análise de Testes - João', status: 'doing' },
        { id: 'k2', title: 'Relatório Final - Maria', status: 'todo' },
      ]);
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (clients.length > 0)
      localStorage.setItem('soraia_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    if (appointments.length > 0)
      localStorage.setItem('soraia_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (sessionReports.length > 0)
      localStorage.setItem('soraia_reports', JSON.stringify(sessionReports));
  }, [sessionReports]);

  useEffect(() => {
    if (finances.length > 0)
      localStorage.setItem('soraia_finances', JSON.stringify(finances));
  }, [finances]);

  useEffect(() => {
    if (kanbanTasks.length > 0)
      localStorage.setItem('soraia_kanban', JSON.stringify(kanbanTasks));
  }, [kanbanTasks]);

  useEffect(() => {
    localStorage.setItem('soraia_settings', JSON.stringify(settings));
  }, [settings]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('soraia_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('soraia_auth');
  };

  const registerNewBooking = (
    clientData: { name: string; email: string; phone: string },
    appointmentData: { date: string; time: string },
  ) => {
    let existingClient = clients.find(
      (c) => c.email.toLowerCase() === clientData.email.toLowerCase(),
    );
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
        treatmentStage: 'First Contact',
      };
      setClients((prev) => [...prev, newClient]);
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
      meetLink: `https://meet.google.com/soraia-${Math.random()
        .toString(36)
        .substring(7)}`,
      price: price,
      duration: duration,
    };

    setAppointments((prev) => [...prev, newAppointment]);

    const newFinancialRecord: FinancialRecord = {
      id: `f-${Date.now()}`,
      description: `Agendamento Online - ${clientData.name}`,
      amount: price,
      type: 'income',
      date: appointmentData.date,
      category: 'Atendimento',
    };
    setFinances((prev) => [...prev, newFinancialRecord]);

    return newAppointment;
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        clients,
        setClients,
        appointments,
        setAppointments,
        sessionReports,
        setSessionReports,
        finances,
        setFinances,
        kanbanTasks,
        setKanbanTasks,
        settings,
        setSettings,
        registerNewBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
