import { Sparkles, Theater, HeartHandshake, Shapes } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function AppShell() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: '封面', icon: Theater },
    { to: '/quiz', label: '答题', icon: Shapes },
    { to: '/loading', label: '过渡', icon: Sparkles },
    { to: '/result', label: '结果', icon: HeartHandshake },
  ];

  return (
    <div className="min-h-dvh text-slate-700">
      {/* 顶部导航 - 移动端精简 */}
      <header className="sticky top-0 z-20 border-b border-sky-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3">
          <p className="text-xs font-medium tracking-wide text-slate-500 sm:text-sm">蓝瞳测评局</p>
          <nav className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs transition sm:gap-2 sm:px-3 sm:py-2 sm:text-sm ${
                    active
                      ? 'border-pink-300/70 bg-pink-200/50 text-pink-700'
                      : 'border-sky-200/60 bg-white/50 text-slate-500 hover:border-sky-300/80 hover:bg-white/80'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 主内容 - 移动端去掉多余 padding */}
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

export default function App() {
  return <AppShell />;
}
