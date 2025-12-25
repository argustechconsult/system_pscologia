import LandingPage from '../components/LandingPage';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { appointments, registerNewBooking, settings } = useApp();

  return (
    <LandingPage
      appointments={appointments}
      onBookingComplete={registerNewBooking}
      settings={settings}
    />
  );
}
