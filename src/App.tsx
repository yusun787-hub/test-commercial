import { Sparkles, Theater, HeartHandshake, Shapes } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function AppShell() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: '封面页', icon: Theater },
    { to: '/quiz', label: '答题页', icon: Shapes },
    { to: '/loading', label: '过渡页', icon: Sparkles },
    { to: '/result', label: '结果页', icon: HeartHandshake },
  ];

  return (
    <div className="min-h-screen text-stone-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-stone-950/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-orange-200/70">人生测测局 · vibe coding skeleton</p>
            <h1 className="mt-1 text-lg font-semibold text-white">电视剧角色恋爱测试页面</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    active
                      ? 'border-rose-300/50 bg-rose-300/20 text-white'
                      : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
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
