import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <section className="space-y-12">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-slate-950 p-8 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Intro</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
            실험을 설계하고, 시스템을 구조화하는
            <br />
            <span className="text-cyan-300">CS 기반 동아리 활동 포트폴리오</span>
          </h2>
          <p className="mt-4 text-slate-300">
            고등학교 생활기록부에 기록된 활동을 단순 요약이 아닌, 실제 서비스 설계·보안 실험·암호학 원리를
            인터랙티브하게 시각화하여 기술적 역량과 리더십을 증명합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
              SDLC 리더십 증명
            </span>
            <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1">
              보안 취약점 샌드박스
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">
              암호학 그래프 시뮬레이션
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">확장 제안</h3>
          <p className="mt-2 text-sm text-slate-400">
            이후 더 정교한 모션과 데이터 시각화를 위해 아래 라이브러리 도입을 권장합니다.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>framer-motion: 마이크로 인터랙션, 데이터 흐름 애니메이션 고도화</li>
            <li>lucide-react: 보안·네트워크 아이콘 패턴 통일</li>
            <li>recharts 또는 visx: 암호학/보안 그래프 시각화 확장</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          to="/activity1"
          className="group rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900/80"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Activity 1</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Sollu 프로젝트 아키텍처</h3>
          <p className="mt-3 text-sm text-slate-400">
            프론트엔드·백엔드·AI 서버 간 데이터 흐름을 시뮬레이션하고, SDLC 리더십을 구조화합니다.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
            상세 보기 →
          </span>
        </Link>

        <Link
          to="/activity2"
          className="group rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-indigo-400/60 hover:bg-slate-900/80"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Activity 2</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">웹 취약점 & 암호학 실험실</h3>
          <p className="mt-3 text-sm text-slate-400">
            SQL 인젝션/XSS 샌드박스와 암호학 그래프를 통해 보안 연구 과정을 시각화합니다.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">
            상세 보기 →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default MainPage;
