import { LoaderCircle, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/result', { replace: true, state: location.state });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [location.state, navigate]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-white/70 bg-white/55 px-8 py-20 text-center shadow-2xl shadow-sky-200/40 backdrop-blur-xl">
      <div className="rounded-full border border-pink-300/50 bg-pink-200/50 p-5 text-pink-600">
        <LoaderCircle className="h-10 w-10 animate-spin" />
      </div>
      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/60 px-4 py-2 text-sm text-slate-500">
        <Sparkles className="h-4 w-4" />
        正在计算你的真实结果
      </div>
      <h2 className="mt-6 text-3xl font-semibold text-slate-800">正在翻阅你的恋爱剧本…</h2>
      <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
        系统会根据 24 道剧情题的选择，匹配最接近的关系原型与电视剧角色结果。
      </p>
    </section>
  );
}
