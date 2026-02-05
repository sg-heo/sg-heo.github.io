'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_CONFIG, STORAGE_KEYS, Config, PHASE } from './types';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import Settings from './components/Settings';
import SetProgress from './components/SetProgress';

export default function Home() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (savedConfig) {
      setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) });
    }
  }, []);

  const {
    phase,
    currentSet,
    remainingSeconds,
    totalSeconds,
    isRunning,
    start,
    pause,
    reset,
  } = useTimer(config);

  const handleSaveConfig = (newConfig: Config) => {
    if (isRunning) {
      if (!confirm('타이머가 진행 중입니다. 설정을 적용하면 리셋됩니다. 계속하시겠습니까?')) {
        return;
      }
    }
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(newConfig));
    reset();
    setIsSettingsOpen(false);
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case PHASE.IDLE: return '대기 중';
      case PHASE.READY: return '준비 시간';
      case PHASE.STUDY: return '공부 시간';
      case PHASE.REST: return '휴식 시간';
      case PHASE.COMPLETE: return '모두 완료';
      default: return '';
    }
  };

  const getPhaseColorClass = () => {
    switch (phase) {
      case PHASE.IDLE: return 'bg-gray-100 text-gray-600';
      case PHASE.READY: return 'bg-yellow-100 text-yellow-700';
      case PHASE.STUDY: return 'bg-green-100 text-green-700';
      case PHASE.REST: return 'bg-blue-100 text-blue-700';
      case PHASE.COMPLETE: return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 transition-colors duration-300 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        
        {/* 메인 카드 */}
        <section className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${isRunning ? 'shadow-2xl scale-[1.02]' : ''}`}>
          
          {/* 상단 헤더 영역 */}
          <div className="px-8 pt-8 pb-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Study Timer</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">오늘도 힘내세요! 🔥</p>
            </div>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all active:scale-95"
              title="설정"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* 설정 패널 (조건부 렌더링) */}
          {isSettingsOpen && (
            <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">타이머 설정</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <Settings config={config} onSave={handleSaveConfig} />
            </div>
          )}

          {/* 메인 컨텐츠 */}
          <div className="px-8 pb-10">
            {/* 상태 표시줄 */}
            <div className="flex justify-between items-center mb-6">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${getPhaseColorClass()}`}>
                {getPhaseLabel()}
              </span>
              <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                {currentSet} <span className="text-gray-400">/</span> {config.TOTAL_SETS} SET
              </span>
            </div>
            
            <TimerDisplay
              phase={phase}
              remainingSeconds={remainingSeconds}
              totalSeconds={totalSeconds}
            />

            <SetProgress 
              currentSet={currentSet} 
              totalSets={config.TOTAL_SETS}
              phase={phase}
            />

            <Controls
              isRunning={isRunning}
              phase={phase}
              onStart={start}
              onPause={pause}
              onReset={reset}
            />
          </div>
        </section>

        <footer className="text-center text-xs text-gray-400 font-medium">
          © 2026 Study Timer. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
