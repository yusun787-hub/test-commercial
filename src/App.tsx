import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

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

export default function App() {
  return <AppShell />;
}
