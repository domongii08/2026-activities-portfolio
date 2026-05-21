import { useEffect, useMemo, useRef, useState } from 'react';

type FlowState = 'idle' | 'clientToServer' | 'serverToAi' | 'returning';

const sdlcSteps = [
  {
    id: 'define',
    title: '서비스 정의',
    summary: '사용자 불편을 정량화하고 요구사항을 명세화',
    leadership: [
      '학생 사용자 페인포인트 수집 및 우선순위 매핑',
      'AI 필터링이 필요한 콘텐츠 기준 수립',
      '성과 지표(정확도/응답속도) 목표치 합의',
    ],
  },
  {
    id: 'stack',
    title: '기술 스택 선정',
    summary: 'React + Java + Flask AI 파이프라인 구성',
    leadership: [
      '프론트엔드 상태/라우팅 구조 설계',
      'Java API Gateway와 AI 서버 간 비동기 큐 설계',
      'Gemma + CLIP 결합으로 멀티모달 필터링 적용',
    ],
  },
  {
    id: 'ux',
    title: '화면 설계 (UI/UX)',
    summary: '사용자 여정 기반의 프로토타입 제작',
    leadership: [
      '디자인 시스템(컬러/타입/컴포넌트) 초안 정의',
      '실제 피드백을 반영한 정보 구조 개선',
      '접근성 체크리스트 도입',
    ],
  },
  {
    id: 'schedule',
    title: '개발 일정 수립',
    summary: 'SDLC 일정과 리스크 관리 체계화',
    leadership: [
      '스프린트 단위 목표 설정 및 회고',
      '테스트 데이터 생성 파이프라인 구축',
      '핵심 모듈 우선순위/완료 기준 설정',
    ],
  },
];

const Activity1Page = () => {
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [result, setResult] = useState<'pass' | 'blocked' | null>(null);
  const [logEntries, setLogEntries] = useState<string[]>([
    '대기 중: 테스트 데이터를 준비합니다.',
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(sdlcSteps[0].id);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const activeStepData = useMemo(
    () => sdlcSteps.find((step) => step.id === activeStep) ?? sdlcSteps[0],
    [activeStep]
  );

  const pushLog = (entry: string) =>
    setLogEntries((prev) => [entry, ...prev].slice(0, 6));

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setResult(null);
    setLogEntries([
      '테스트 데이터 전송을 시작합니다.',
      '필터링 기준 세트를 로드합니다.',
      '프론트엔드 → 백엔드: 텍스트/이미지 패킷 전달',
    ]);

    setFlowState('clientToServer');

    timersRef.current.push(
      window.setTimeout(() => {
        setFlowState('serverToAi');
        pushLog('백엔드 → AI 서버: 멀티모달 필터링 요청');
      }, 1200)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        const isPass = Math.random() > 0.35;
        setResult(isPass ? 'pass' : 'blocked');
        setFlowState('returning');
        pushLog(isPass ? 'AI 서버: 정책 통과 ✅' : 'AI 서버: 정책 위반 ⛔');
      }, 2400)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setFlowState('idle');
        pushLog('백엔드 → 프론트엔드: 결과 응답 반환');
        setIsRunning(false);
      }, 3600)
    );
  };

  const renderPacket = (direction: 'forward' | 'reverse', active: boolean) => (
    <span
      className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-glow ${
        active ? (direction === 'forward' ? 'flow-forward' : 'flow-reverse') : 'opacity-0'
      }`}
    />
  );

  return (
    <section className="space-y-12">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Activity 1</p>
        <h2 className="mt-4 text-3xl font-bold text-white">Sollu 프로젝트 아키텍처 & SDLC 리더십</h2>
        <p className="mt-4 text-slate-300">
          학생 사용자 안전을 보장하기 위해 프론트엔드-백엔드-AI 서버를 통합한 필터링 아키텍처를 설계하고,
          SDLC 전 과정에서 리더십과 문제 해결 역량을 발휘한 과정을 시각화했습니다.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">인터랙티브 아키텍처 맵</h3>
            <button
              type="button"
              onClick={runSimulation}
              disabled={isRunning}
              className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              테스트 데이터 전송
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-center">
                <p className="text-xs text-slate-400">Frontend</p>
                <p className="text-lg font-semibold text-white">React UI</p>
              </div>

              <div className="relative h-2 w-32 rounded-full bg-slate-700/80">
                {renderPacket('forward', flowState === 'clientToServer')}
                {renderPacket('reverse', flowState === 'returning')}
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-center">
                <p className="text-xs text-slate-400">Backend</p>
                <p className="text-lg font-semibold text-white">Java API</p>
              </div>

              <div className="relative h-2 w-32 rounded-full bg-slate-700/80">
                {renderPacket('forward', flowState === 'serverToAi')}
                {renderPacket('reverse', flowState === 'returning')}
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-center">
                <p className="text-xs text-slate-400">AI Server</p>
                <p className="text-lg font-semibold text-white">Flask · Gemma · CLIP</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
                <p className="text-xs uppercase text-slate-500">Flow State</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {flowState === 'idle' && '대기'}
                  {flowState === 'clientToServer' && '데이터 전송'}
                  {flowState === 'serverToAi' && 'AI 필터링'}
                  {flowState === 'returning' && '결과 응답'}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
                <p className="text-xs uppercase text-slate-500">Filter Result</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {result === null && '—'}
                  {result === 'pass' && <span className="text-emerald-300">통과</span>}
                  {result === 'blocked' && <span className="text-rose-300">차단</span>}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
                <p className="text-xs uppercase text-slate-500">Policy Pack</p>
                <p className="mt-2 text-sm text-slate-300">
                  텍스트 유해성 0.78 이상 차단 · 이미지 NSFW 0.62 이상 차단
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6">
          <h3 className="text-lg font-semibold text-white">실시간 로그</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {logEntries.map((entry, index) => (
              <div
                key={`${entry}-${index}`}
                className="rounded-2xl border border-slate-800/60 bg-slate-950/50 px-4 py-3"
              >
                {entry}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">리더십 포인트</p>
            <p className="mt-2">
              데이터 흐름/필터링 기준을 직접 정의하고, 팀 내 API 계약과 테스트 절차를 표준화했습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">SDLC 프로세스 대시보드</h3>
          <p className="text-sm text-slate-400">단계를 선택하면 리더십 스토리가 업데이트됩니다.</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.45fr_0.55fr]">
          <div className="space-y-3">
            {sdlcSteps.map((step) => {
              const isActive = step.id === activeStep;
              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    isActive
                      ? 'border-cyan-400/80 bg-cyan-400/10 text-white'
                      : 'border-slate-800/60 bg-slate-950/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <p className="text-sm uppercase text-slate-400">{step.title}</p>
                  <p className="mt-2 text-base font-semibold">{step.summary}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6">
            <p className="text-xs uppercase text-slate-500">현재 단계</p>
            <h4 className="mt-3 text-2xl font-semibold text-white">{activeStepData.title}</h4>
            <p className="mt-2 text-sm text-slate-300">{activeStepData.summary}</p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {activeStepData.leadership.map((item) => (
                <div key={item} className="rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activity1Page;
