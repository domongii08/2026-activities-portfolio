import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activity1Page from './pages/Activity1Page';
import Activity2Page from './pages/Activity2Page';
import MainPage from './pages/MainPage';

// Suggested libs for deeper visuals: framer-motion, lucide-react, recharts, @react-spring/web.

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-cyan-400 text-slate-950 shadow-glow'
      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
  }`;

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">CS Visual Portfolio</p>
              <h1 className="text-xl font-bold text-white">동아리 활동 시각화 포트폴리오</h1>
            </div>
            <nav className="flex flex-wrap gap-2">
              <NavLink to="/" className={navLinkClass} end>
                Main
              </NavLink>
              <NavLink to="/activity1" className={navLinkClass}>
                Activity 1
              </NavLink>
              <NavLink to="/activity2" className={navLinkClass}>
                Activity 2
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/activity1" element={<Activity1Page />} />
            <Route path="/activity2" element={<Activity2Page />} />
            <Route
              path="*"
              element={
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-10 text-center">
                  <p className="text-lg font-semibold">페이지를 찾을 수 없습니다.</p>
                  <p className="mt-2 text-sm text-slate-400">상단 네비게이션으로 이동해 주세요.</p>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-slate-800/70 py-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-500">
            <span>React + TypeScript + Tailwind 기반 시각화 포트폴리오</span>
            <span>GitHub Pages 배포 대비: HashRouter + BASE URL 구성</span>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
