'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_CONFIG, STORAGE_KEYS, Config, PHASE } from './types';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import LogList from './components/LogList';
import Settings from './components/Settings';
import SetProgress from './components/SetProgress';

export default function Home() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (savedConfig) {
      setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) });
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const {
    phase,
    currentSet,
    remainingSeconds,
    totalSeconds,
    isRunning,
    logs,
    start,
    pause,
    reset,
    saveLogs
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

  const handleDeleteLog = (id: string) => {
    const newLogs = logs.filter(l => l.id !== id);
    saveLogs(newLogs);
  };

  const handleUpdateComment = (id: string, comment: string) => {
    const newLogs = logs.map(l => l.id === id ? { ...l, comment } : l);
    saveLogs(newLogs);
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case PHASE.IDLE: return '대기';
      case PHASE.READY: return '준비';
      case PHASE.STUDY: return '공부';
      case PHASE.REST: return '휴식';
      case PHASE.COMPLETE: return '완료';
      default: return '';
    }
  };

  const getPhaseClass = () => {
    switch (phase) {
      case PHASE.IDLE: return 'phase-idle';
      case PHASE.READY: return 'phase-ready';
      case PHASE.STUDY: return 'phase-study';
      case PHASE.REST: return 'phase-rest';
      case PHASE.COMPLETE: return 'phase-complete';
      default: return '';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-300">
      <div className="max-w-md mx-auto space-y-8">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">공부 타이머</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-xl"
            title="다크/라이트 모드 전환"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>

        <section className={`timer-section ${isRunning ? 'running' : ''} ${phase === PHASE.COMPLETE ? 'completed' : ''}`}>
          <div className="phase-indicator">
            <span className={`phase-label ${getPhaseClass()}`}>
              {getPhaseLabel()}
            </span>
            <span className="set-label">
              {currentSet} / {config.TOTAL_SETS} 세트
            </span>
          </div>
          
          <TimerDisplay
            phase={phase}
            remainingSeconds={remainingSeconds}
            totalSeconds={totalSeconds}
          />

          <Controls
            isRunning={isRunning}
            phase={phase}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />

          <SetProgress 
            currentSet={currentSet} 
            totalSets={config.TOTAL_SETS}
            phase={phase}
          />
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">설정</h2>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {isSettingsOpen ? '닫기' : '열기'}
            </button>
          </div>
          
          {isSettingsOpen && (
            <Settings config={config} onSave={handleSaveConfig} />
          )}
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">공부 로그</h2>
          <LogList
            logs={logs}
            onDelete={handleDeleteLog}
            onUpdateComment={handleUpdateComment}
          />
        </section>
      </div>
    </main>
  );
}
