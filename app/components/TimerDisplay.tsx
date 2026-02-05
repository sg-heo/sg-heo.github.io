import { PhaseType, PHASE } from '../types';
import { formatTime, formatCountdown } from '../utils/time';

interface TimerDisplayProps {
  phase: PhaseType;
  remainingSeconds: number;
  totalSeconds: number;
}

export default function TimerDisplay({ phase, remainingSeconds, totalSeconds }: TimerDisplayProps) {
  const progress = remainingSeconds / totalSeconds;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const getPhaseColor = () => {
    switch (phase) {
      case PHASE.READY: return '#f59e0b'; // warning
      case PHASE.STUDY: return '#10b981'; // success
      case PHASE.REST: return '#3b82f6'; // accent
      case PHASE.COMPLETE: return '#10b981'; // success
      default: return '#3b82f6';
    }
  };

  const getPresetText = () => {
    switch (phase) {
      case PHASE.IDLE: return '준비되셨나요?';
      case PHASE.READY: return '곧 시작합니다...';
      case PHASE.STUDY: return '집중하세요!';
      case PHASE.REST: return '잠시 쉬어가세요';
      case PHASE.COMPLETE: return '수고하셨습니다!';
      default: return '';
    }
  };

  return (
    <div className="relative flex items-center justify-center w-[280px] h-[280px] my-4 mx-auto">
      {/* 배경 원 */}
      <div className="absolute inset-0 rounded-full bg-gray-50 shadow-inner"></div>
      
      <svg className="transform -rotate-90 w-full h-full relative z-10 drop-shadow-xl" viewBox="0 0 300 300">
        {/* 트랙 */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="transparent"
          className="opacity-50"
        />
        {/* 진행 바 */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          stroke={getPhaseColor()}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      
      <div className="absolute text-center flex flex-col items-center z-20">
        <div className={`text-7xl font-bold font-mono tracking-tighter mb-2 tabular-nums ${phase === PHASE.READY ? 'text-yellow-500' : 'text-gray-800'}`}>
          {phase === PHASE.READY || phase === PHASE.IDLE 
            ? formatCountdown(remainingSeconds)
            : formatTime(remainingSeconds)}
        </div>
        <span className="text-sm text-gray-500 font-medium bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
          {getPresetText()}
        </span>
      </div>
    </div>
  );
}
