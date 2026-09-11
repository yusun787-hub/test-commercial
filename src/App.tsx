import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ExpiredAccessPage from './pages/ExpiredAccessPage';
import {
  clearStoredToken,
  getStoredToken,
  readTokenFromUrl,
  storeToken,
  stripTokenParamFromUrl,
  validateAccessToken,
} from './lib/accessControl';

function AppShell() {
  return (
    <div className="min-h-dvh text-slate-700">
      <main className="mx-auto max-w-6xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </main>
    </div>
  );
}

function AccessGate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'granted' | 'denied'>('checking');

  useEffect(() => {
    let alive = true;

    async function run() {
      const urlToken = readTokenFromUrl(location.search);
      const storedToken = getStoredToken();
      const tokenToCheck = urlToken ?? storedToken;

      if (!tokenToCheck) {
        setStatus('denied');
        return;
      }

      const result = await validateAccessToken(tokenToCheck);
      if (!alive) return;

      if (result.ok) {
        storeToken(tokenToCheck);
        setStatus('granted');

        // 通过验证后，把 token 从 URL 里“擦掉”，避免二次分享泄露。
        if (urlToken) {
          const next = stripTokenParamFromUrl(window.location.href);
          navigate(next, { replace: true });
        }
      } else {
        clearStoredToken();
        setStatus('denied');
      }
    }

    run();

    return () => {
      alive = false;
    };
  }, [location.search, navigate]);

  if (status === 'checking') {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <div className="rounded-2xl border border-white/70 bg-white/55 px-6 py-5 text-sm text-slate-600 shadow-2xl shadow-sky-200/40 backdrop-blur-xl">
          正在验证访问权限…
        </div>
      </div>
    );
  }

  if (status === 'denied') return <ExpiredAccessPage />;

  return <AppShell />;
}

export default function App() {
  return <AccessGate />;
}
