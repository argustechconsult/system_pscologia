module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[project]/context/AppContext.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])(undefined);
const AppProvider = ({ children })=>{
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Initialize state only on client-side to avoid hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const auth = localStorage.getItem('soraia_auth') === 'true';
        setIsAuthenticated(auth);
    }, []);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        defaultPrice: 250,
        defaultDuration: 50
    });
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [sessionReports, setSessionReports] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [finances, setFinances] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [kanbanTasks, setKanbanTasks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Load initial data
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
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
                    lastSessionDate: '2023-10-20'
                },
                {
                    id: '2',
                    name: 'Maria Souza',
                    address: 'Av. Paulista, 1000',
                    phone: '2198888888',
                    email: 'maria@email.com',
                    status: 'inactive',
                    treatmentStage: 'Evaluation',
                    lastSessionDate: '2023-08-15'
                }
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
                {
                    id: 'k1',
                    title: 'Análise de Testes - João',
                    status: 'doing'
                },
                {
                    id: 'k2',
                    title: 'Relatório Final - Maria',
                    status: 'todo'
                }
            ]);
        }
    }, []);
    // Save changes
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (clients.length > 0) localStorage.setItem('soraia_clients', JSON.stringify(clients));
    }, [
        clients
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (appointments.length > 0) localStorage.setItem('soraia_appointments', JSON.stringify(appointments));
    }, [
        appointments
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (sessionReports.length > 0) localStorage.setItem('soraia_reports', JSON.stringify(sessionReports));
    }, [
        sessionReports
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (finances.length > 0) localStorage.setItem('soraia_finances', JSON.stringify(finances));
    }, [
        finances
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (kanbanTasks.length > 0) localStorage.setItem('soraia_kanban', JSON.stringify(kanbanTasks));
    }, [
        kanbanTasks
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        localStorage.setItem('soraia_settings', JSON.stringify(settings));
    }, [
        settings
    ]);
    const login = ()=>{
        setIsAuthenticated(true);
        localStorage.setItem('soraia_auth', 'true');
    };
    const logout = ()=>{
        setIsAuthenticated(false);
        localStorage.removeItem('soraia_auth');
    };
    const registerNewBooking = (clientData, appointmentData)=>{
        let existingClient = clients.find((c)=>c.email.toLowerCase() === clientData.email.toLowerCase());
        let clientId = '';
        if (!existingClient) {
            clientId = Date.now().toString();
            const newClient = {
                id: clientId,
                name: clientData.name,
                email: clientData.email,
                phone: clientData.phone,
                address: 'Pendente',
                status: 'pending',
                treatmentStage: 'First Contact'
            };
            setClients((prev)=>[
                    ...prev,
                    newClient
                ]);
        } else {
            clientId = existingClient.id;
        }
        const price = settings.defaultPrice;
        const duration = settings.defaultDuration;
        const newAppointment = {
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
        setAppointments((prev)=>[
                ...prev,
                newAppointment
            ]);
        const newFinancialRecord = {
            id: `f-${Date.now()}`,
            description: `Agendamento Online - ${clientData.name}`,
            amount: price,
            type: 'income',
            date: appointmentData.date,
            category: 'Atendimento'
        };
        setFinances((prev)=>[
                ...prev,
                newFinancialRecord
            ]);
        return newAppointment;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
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
            registerNewBooking
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AppContext.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useApp = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
}),
"[project]/pages/_app.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AppContext.tsx [ssr] (ecmascript)");
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AppContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AppProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
            ...pageProps
        }, void 0, false, {
            fileName: "[project]/pages/_app.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/_app.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = MyApp;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8a73ab90._.js.map