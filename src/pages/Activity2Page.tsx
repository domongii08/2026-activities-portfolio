import { useMemo, useState } from 'react';

type AttackAnalysis = {
  sql: boolean;
  xss: boolean;
  severity: 'safe' | 'warning' | 'critical';
  summary: string;
};

const analyzePayload = (value: string): AttackAnalysis => {
  const normalized = value.toLowerCase();
  const sqlSignals =
    /union\s+select/.test(normalized) ||
    /or\s+1=1/.test(normalized) ||
    /'?\s*or\s*'?\d+'?\s*=\s*'?\d+'?/.test(normalized);
  const xssSignals = /<script|onerror=|onload=|<img|<svg|javascript:/.test(normalized);

  if (sqlSignals && xssSignals) {
    return {
      sql: true,
      xss: true,
      severity: 'critical',
      summary: 'SQL 인젝션 + XSS 복합 시나리오가 감지되었습니다.',
    };
  }
  if (sqlSignals) {
    return {
      sql: true,
      xss: false,
      severity: 'warning',
      summary: 'SQL 인젝션 패턴이 탐지되었습니다.',
    };
  }
  if (xssSignals) {
    return {
      sql: false,
      xss: true,
      severity: 'warning',
      summary: 'XSS 페이로드가 탐지되었습니다.',
    };
  }
  return {
    sql: false,
    xss: false,
    severity: 'safe',
    summary: '안전한 입력으로 판단됩니다.',
  };
};

const safeRows = [
  { id: 'U-021', user: 'hanbit', role: 'student' },
  { id: 'U-032', user: 'dayeon', role: 'mentor' },
  { id: 'U-047', user: 'soyeon', role: 'student' },
];

const leakedRows = [
  { id: 'SYS-001', user: 'admin', role: 'root' },
  { id: 'SYS-013', user: 'session_keys', role: 'internal' },
];

const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '계산 범위 초과';
  if (seconds < 1) return '1초 미만';
  if (seconds < 60) return `${seconds.toFixed(1)}초`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)}분`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}시간`;
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)}일`;
  return `${(seconds / 31536000).toFixed(1)}년`;
};

const Activity2Page = () => {
  const [payload, setPayload] = useState("' OR '1'='1");
  const [analysis, setAnalysis] = useState<AttackAnalysis>(() => analyzePayload(''));
  const [runCount, setRunCount] = useState(0);
  const [length, setLength] = useState(8);

  const handleSimulate = () => {
    setAnalysis(analyzePayload(payload));
    setRunCount((prev) => prev + 1);
  };

  const chartData = useMemo(() => {
    const charsetSize = 62;
    const guessesPerSecond = 1e9;
    return Array.from({ length: 9 }, (_, index) => {
      const len = index + 4;
      const combos = Math.pow(charsetSize, len);
      const seconds = combos / guessesPerSecond;
      const score = Math.log10(seconds + 1);
      return { len, seconds, score };
    });
  }, []);

  const maxScore = Math.max(...chartData.map((item) => item.score));
  const selected = chartData.find((item) => item.len === length) ?? chartData[0];

  return (
    <section className="space-y-12">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Activity 2</p>
        <h2 className="mt-4 text-3xl font-bold text-white">웹 취약점 샌드박스 & 암호학 시뮬레이터</h2>
        <p className="mt-4 text-slate-300">
          DVWA 기반 보안 실험을 토대로 SQL 인젝션/XSS의 공격 흐름을 시각화하고, 수학 I 지수 함수로
          공개키 암호학의 안전성을 설명합니다.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">SQL 인젝션 & XSS 샌드박스</h3>
            <button
              type="button"
              onClick={handleSimulate}
              className="rounded-full bg-indigo-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              시뮬레이션 실행
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>https://sandbox.local/login</span>
              <span className="rounded-full border border-slate-700/60 px-3 py-1">DVWA Mock</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <input
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                className="w-full flex-1 rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
                placeholder="Payload 입력"
              />
              <button
                type="button"
                onClick={handleSimulate}
                className="rounded-xl border border-slate-700/60 bg-slate-800/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-400/60"
              >
                Submit
              </button>
            </div>
          </div>

          <div
            key={runCount}
            className={`mt-6 rounded-2xl border px-4 py-4 text-sm ${
              analysis.severity === 'critical'
                ? 'border-rose-500/60 bg-rose-500/10 text-rose-200'
                : analysis.severity === 'warning'
                ? 'border-amber-400/60 bg-amber-400/10 text-amber-100'
                : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
            }`}
          >
            {analysis.summary}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
              <p className="text-xs uppercase text-slate-500">가상 데이터베이스</p>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                {[...safeRows, ...(analysis.sql ? leakedRows : [])].map((row) => (
                  <div
                    key={row.id}
                    className={`flex justify-between rounded-lg border px-3 py-2 ${
                      analysis.sql && row.id.startsWith('SYS')
                        ? 'border-rose-500/60 bg-rose-500/10 text-rose-100'
                        : 'border-slate-800/60 bg-slate-900/50'
                    }`}
                  >
                    <span>{row.id}</span>
                    <span>{row.user}</span>
                    <span>{row.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
              <p className="text-xs uppercase text-slate-500">세션/스크립트 결과</p>
              <div className="mt-3 space-y-3 text-sm text-slate-300">
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 px-4 py-3">
                  사용자 세션 ID: <span className="font-semibold">S-9982-AX</span>
                </div>
                <div
                  className={`rounded-xl border px-4 py-3 ${
                    analysis.xss
                      ? 'border-rose-500/60 bg-rose-500/10 text-rose-100'
                      : 'border-slate-800/60 bg-slate-900/50 text-slate-300'
                  }`}
                >
                  {analysis.xss
                    ? 'XSS 실행 → 세션 ID가 공격자 스크립트로 노출됨'
                    : '클라이언트 스크립트 무결성 정상'}
                </div>
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 px-4 py-3 text-xs text-slate-400">
                  입력 검증, CSP, Prepared Statement 적용 시 해당 공격 벡터 차단 가능
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8">
          <h3 className="text-xl font-semibold text-white">암호학 그래프 시뮬레이터</h3>
          <p className="mt-3 text-sm text-slate-400">
            비밀번호 길이가 1자리 증가할 때마다 지수적으로 증가하는 탐색 공간을 시각화합니다.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>비밀번호 길이</span>
              <span className="text-lg font-semibold text-white">{length} 자리</span>
            </div>
            <input
              type="range"
              min={4}
              max={12}
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
              className="mt-4 w-full accent-cyan-400"
            />
            <div className="mt-3 text-xs text-slate-400">
              추정 해킹 시간: <span className="text-cyan-200">{formatDuration(selected.seconds)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {chartData.map((item) => {
              const width = `${(item.score / maxScore) * 100}%`;
              const isActive = item.len === length;
              return (
                <div key={item.len} className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="w-10 text-right">{item.len}자리</span>
                  <div className="h-3 flex-1 rounded-full bg-slate-800/70">
                    <div
                      className={`h-3 rounded-full transition ${
                        isActive ? 'bg-cyan-400 shadow-glow' : 'bg-slate-600/80'
                      }`}
                      style={{ width }}
                    />
                  </div>
                  <span className="w-20 text-right text-slate-400">
                    log10≈{item.score.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-sm text-slate-300">
            공개키 암호화는 지수·로그 함수의 성질을 활용해, 공격자가 동일 시간 안에 모든 키를 대입하지 못하도록
            방어합니다. 길이 증가가 곧 기하급수적 안전성 상승으로 연결됩니다.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activity2Page;
