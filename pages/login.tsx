import LoginPage from '../components/LoginPage';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { login, isAuthenticated } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    login();
  };

  return <LoginPage onLogin={handleLogin} />;
}
