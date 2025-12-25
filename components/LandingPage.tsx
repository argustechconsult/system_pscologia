
import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User, BookOpen, MapPin, Phone, Mail, Instagram, CheckCircle, Clock, Video, Check, Sparkles, RefreshCw, Send, Menu, X as CloseIcon } from 'lucide-react';
import { Appointment, GlobalSettings } from '../types';
import { generateConfirmationMessage } from '../services/geminiService';

interface LandingPageProps {
  onBookingComplete: (client: { name: string, email: string, phone: string }, appointment: { date: string, time: string }) => Appointment;
  settings: GlobalSettings;
  appointments: Appointment[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onBookingComplete, settings, appointments }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [finalAppointment, setFinalAppointment] = useState<Appointment | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Helper para obter a data/hora atual em São Paulo
  const getBrazilDateTime = () => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  };

  const todayStr = useMemo(() => {
    const brDate = getBrazilDateTime();
    const year = brDate.getFullYear();
    const month = String(brDate.getMonth() + 1).padStart(2, '0');
    const day = String(brDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const timeSlots = useMemo(() => {
    const slots = [];
    const duration = settings.defaultDuration || 50;
    let current = new Date();
    current.setHours(8, 0, 0, 0);
    const morningEnd = new Date();
    morningEnd.setHours(12, 0, 0, 0);
    while (current < morningEnd) {
      slots.push(current.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      current.setMinutes(current.getMinutes() + duration + 10);
    }
    current = new Date();
    current.setHours(13, 30, 0, 0);
    const afternoonEnd = new Date();
    afternoonEnd.setHours(18, 0, 0, 0);
    while (current < afternoonEnd) {
      slots.push(current.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      current.setMinutes(current.getMinutes() + duration + 10);
    }
    return slots;
  }, [settings.defaultDuration]);

  // Filtra horários disponíveis com base na data escolhida e agendamentos existentes
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const brNow = getBrazilDateTime();
    const currentHour = brNow.getHours();
    const currentMinute = brNow.getMinutes();

    return timeSlots.filter(time => {
      // 1. Bloquear horários que já passaram se for hoje
      if (selectedDate === todayStr) {
        const [hour, minute] = time.split(':').map(Number);
        if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
          return false;
        }
      }

      // 2. Bloquear horários que já estão agendados no sistema
      const isOccupied = appointments.some(app => 
        app.date === selectedDate && 
        app.time === time && 
        app.status !== 'cancelled'
      );

      return !isOccupied;
    });
  }, [selectedDate, todayStr, timeSlots, appointments]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const elementId = targetId.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      const offset = 80; // Altura do header fixo
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const app = onBookingComplete(clientInfo, { date: selectedDate, time: selectedTime });
      
      const message = await generateConfirmationMessage(
        clientInfo.name, 
        new Date(selectedDate).toLocaleDateString('pt-BR'), 
        selectedTime, 
        app.meetLink || ''
      );

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`[Notification System] Sending to ${clientInfo.email}: ${message}`);
      console.log(`[Notification System] Sending WhatsApp to ${clientInfo.phone}: ${message}`);

      setFinalAppointment(app);
      setBookingStep(3);
    } catch (error) {
      console.error("Erro ao processar agendamento:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeBooking = () => {
    setShowBooking(false);
    setBookingStep(1);
    setIsProcessing(false);
    setSelectedDate('');
    setSelectedTime('');
    setClientInfo({ name: '', email: '', phone: '' });
    setFinalAppointment(null);
  };

  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold text-teal-900 leading-tight group-hover:text-teal-600 transition-colors">Soraia</span>
            <span className="text-[10px] text-teal-600 font-bold tracking-widest uppercase">Psicologia & Neuropsicologia</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="text-slate-600 hover:text-teal-600 font-semibold transition-colors">Início</a>
            <a href="#sobre" onClick={(e) => handleNavClick(e, '#sobre')} className="text-slate-600 hover:text-teal-600 font-semibold transition-colors">Sobre</a>
            <a href="#especialidades" onClick={(e) => handleNavClick(e, '#especialidades')} className="text-slate-600 hover:text-teal-600 font-semibold transition-colors">Especialidades</a>
            <Link to="/login" className="text-teal-700 font-bold hover:text-teal-900 transition-colors">Acesso Profissional</Link>
            <button onClick={() => setShowBooking(true)} className="btn-attention bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg">
              Agendar Consulta
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 animate-fade-in shadow-xl">
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="block py-2 text-slate-600 font-semibold">Início</a>
            <a href="#sobre" onClick={(e) => handleNavClick(e, '#sobre')} className="block py-2 text-slate-600 font-semibold">Sobre</a>
            <a href="#especialidades" onClick={(e) => handleNavClick(e, '#especialidades')} className="block py-2 text-slate-600 font-semibold">Especialidades</a>
            <Link to="/login" className="block py-2 text-teal-700 font-bold border-t border-slate-50 pt-4">Acesso Profissional</Link>
            <button 
              onClick={() => { setShowBooking(true); setIsMenuOpen(false); }}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg"
            >
              Agendar Consulta
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-blue-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in text-center md:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-teal-100 text-teal-800 text-xs font-bold tracking-widest uppercase shadow-sm">
                CRP 05/64585 | PUC Rio
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Cuidado humano pautado na <span className="text-teal-600 italic">Ciência</span>.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                Soraia é Psicóloga Clínica e Neuropsicóloga dedicada a auxiliar pessoas em seu processo de autoconhecimento, saúde mental e reabilitação cognitiva.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => setShowBooking(true)}
                  className="bg-teal-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all shadow-2xl shadow-teal-200"
                >
                  Agendar Sessão
                </button>
                <a 
                  href="#especialidades"
                  onClick={(e) => handleNavClick(e, '#especialidades')}
                  className="px-10 py-5 rounded-2xl font-bold text-lg text-slate-700 border-2 border-slate-200 hover:bg-slate-50 transition-all text-center flex items-center justify-center bg-white/50"
                >
                  Ver especialidades
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/psychologist/800/1000" 
                alt="Soraia Psicóloga"
                className="rounded-[2.5rem] shadow-2xl border-4 border-white object-cover aspect-[4/5] transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Restored */}
      <section id="sobre" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
               <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Trajetória e <span className="text-teal-600">Formação Profissional</span></h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                 <p>Graduada pela <span className="font-bold text-slate-800 underline decoration-teal-300 decoration-4 underline-offset-4">PUC Rio</span>, com especialização em Neuropsicologia, Soraia combina a escuta empática da psicologia clínica com a precisão dos testes neuropsicológicos.</p>
                 <p>Seu trabalho é fundamentado na <span className="italic">Terapia Cognitivo-Comportamental (TCC)</span>, oferecendo ferramentas práticas para que seus pacientes lidem com os desafios do dia a dia.</p>
                 <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100 text-center">
                     <p className="text-teal-700 font-bold text-3xl">CRP 05</p>
                     <p className="text-[10px] uppercase font-bold text-teal-600/60 tracking-widest mt-1">Registro</p>
                   </div>
                   <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                     <p className="text-blue-700 font-bold text-3xl">PUC Rio</p>
                     <p className="text-[10px] uppercase font-bold text-blue-600/60 tracking-widest mt-1">Bacharelado</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="order-1 md:order-2 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
               <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <CheckCircle className="text-teal-400" /> Valores do Atendimento
               </h3>
               <ul className="space-y-8">
                 <li className="flex gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0"><Check size={24} className="text-teal-400" /></div>
                   <div>
                     <p className="font-bold text-lg">Ética e Sigilo</p>
                     <p className="text-slate-400 text-sm">Respeito total à individualidade e privacidade.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0"><Check size={24} className="text-teal-400" /></div>
                   <div>
                     <p className="font-bold text-lg">Base Científica</p>
                     <p className="text-slate-400 text-sm">Protocolos validados para avaliação e tratamento clínico.</p>
                   </div>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Specialty Section Brief */}
      <section id="especialidades" className="py-24 bg-slate-50 text-center scroll-mt-20">
        <h2 className="text-4xl font-bold mb-12">Nossas Especialidades</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
          <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-8 mx-auto text-teal-600">
              <User size={32} />
            </div>
            <h3 className="text-2xl font-bold text-teal-700 mb-4">Psicoterapia Clínica</h3>
            <p className="text-slate-600 mb-6">Atendimento humanizado focado em adolescentes e adultos, utilizando a Terapia Cognitivo-Comportamental.</p>
            <ul className="space-y-2 text-slate-500 font-semibold text-sm">
              <li>• Ansiedade e Depressão</li>
              <li>• Autoconhecimento</li>
            </ul>
          </div>
          <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 mx-auto text-blue-600">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Neuropsicologia</h3>
            <p className="text-slate-600 mb-6">Avaliação técnica detalhada de funções cognitivas como memória e atenção, com emissão de laudos.</p>
            <ul className="space-y-2 text-slate-500 font-semibold text-sm">
              <li>• Diagnóstico TDAH e Autismo</li>
              <li>• Reabilitação Cognitiva</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Restored */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-teal-400">Soraia Rodrigues</span>
            <span className="text-xs text-teal-600 uppercase tracking-widest">Psicóloga CRP 05/64585</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 Soraia - Psicologia & Neuropsicologia. Rio de Janeiro, Brasil.</p>
        </div>
      </footer>

      {/* Advanced Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative animate-scale-up">
            <button onClick={closeBooking} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 z-10 transition-colors p-2 hover:bg-slate-50 rounded-full">✕</button>
            
            <div className="bg-teal-600 p-10 text-white">
              <h3 className="text-3xl font-bold mb-2">Agendamento Online</h3>
              <p className="text-teal-100 text-sm font-medium">Fuso horário de Brasília (São Paulo)</p>
              <div className="flex gap-4 mt-8">
                <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${bookingStep >= 1 ? 'bg-white' : 'bg-white/20'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${bookingStep >= 2 ? 'bg-white' : 'bg-white/20'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${bookingStep >= 3 ? 'bg-white' : 'bg-white/20'}`}></div>
              </div>
            </div>

            <div className="p-10">
              {isProcessing ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-pulse">
                  <div className="w-20 h-20 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">Finalizando Agendamento...</p>
                    <p className="text-slate-500 text-sm mt-2">Gerando sala virtual e enviando notificações.</p>
                  </div>
                </div>
              ) : (
                <>
                  {bookingStep === 1 && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Calendar size={18} className="text-teal-600" /> Escolha o melhor dia</label>
                        <input 
                          type="date" 
                          min={todayStr} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 outline-none font-semibold focus:ring-2 focus:ring-teal-500" 
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime('');
                          }} 
                        />
                      </div>
                      {selectedDate && (
                        <div className="space-y-5 animate-fade-in">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Clock size={18} className="text-teal-600" /> 
                            {availableTimeSlots.length > 0 ? 'Horários disponíveis' : 'Não há horários disponíveis para este dia'}
                          </label>
                          <div className="grid grid-cols-3 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            {availableTimeSlots.map(time => (
                              <button 
                                key={time} 
                                onClick={() => setSelectedTime(time)} 
                                className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${selectedTime === time ? 'bg-teal-600 border-teal-600 text-white shadow-md' : 'bg-white border-slate-100 text-slate-500 hover:border-teal-200 hover:text-teal-600'}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <button 
                        disabled={!selectedDate || !selectedTime} 
                        onClick={() => setBookingStep(2)} 
                        className="w-full bg-teal-600 text-white py-5 rounded-2xl font-bold text-lg disabled:opacity-40 shadow-lg hover:bg-teal-700 transition-all"
                      >
                        Próximo Passo
                      </button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 text-teal-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600/60 mb-1">Consulta Marcada</p>
                        <p className="font-bold text-xl">{new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR')} às {selectedTime}</p>
                      </div>
                      <div className="space-y-4">
                        <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-semibold focus:ring-2 focus:ring-teal-500 outline-none" value={clientInfo.name} onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})} placeholder="Seu Nome Completo" />
                        <input type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-semibold focus:ring-2 focus:ring-teal-500 outline-none" value={clientInfo.phone} onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})} placeholder="WhatsApp (DDD + Número)" />
                        <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-semibold focus:ring-2 focus:ring-teal-500 outline-none" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} placeholder="Seu melhor E-mail" />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setBookingStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-200">Voltar</button>
                        <button type="submit" className="flex-[2] bg-teal-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-teal-700">
                          <Send size={20} /> Confirmar
                        </button>
                      </div>
                    </form>
                  )}

                  {bookingStep === 3 && finalAppointment && (
                    <div className="text-center space-y-8 animate-fade-in py-4">
                      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><CheckCircle size={56} /></div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900">Agendado com Sucesso!</h3>
                        <p className="text-slate-500 font-medium mt-2">O link da sala foi enviado para o seu WhatsApp e E-mail.</p>
                      </div>
                      <div className="bg-slate-900 rounded-[2rem] p-8 text-left text-white relative overflow-hidden">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-5 mb-5">
                          <Video className="text-teal-400" size={32} />
                          <div>
                            <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Sua Sala no Google Meet</p>
                            <a href={finalAppointment.meetLink} target="_blank" rel="noreferrer" className="font-bold text-lg break-all hover:text-teal-300">Acessar Consulta</a>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400">Guarde este link. Ele será o portal para nossa sessão online no dia agendado.</p>
                      </div>
                      <button onClick={closeBooking} className="w-full bg-slate-100 text-slate-800 py-5 rounded-2xl font-bold">Voltar para o Início</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
