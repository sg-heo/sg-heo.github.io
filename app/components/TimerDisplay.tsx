import { PhaseType, PHASE } from '../types';
import { formatTime, formatCountdown } from '../utils/time';

interface TimerDisplayProps {
  phase: PhaseType;
  remainingSeconds: number;
  totalSeconds: number;
}

export default function TimerDisplay({ phase, remainingSeconds, totalSeconds }: TimerDisplayProps) {
  const progress = remainingSeconds / totalSeconds;
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const getPhaseColor = () => {
    switch (phase) {
      case PHASE.READY: return 'var(--warning-color)';
      case PHASE.STUDY: return 'var(--success-color)';
      case PHASE.REST: return 'var(--accent-color)';
      case PHASE.COMPLETE: return 'var(--success-color)';
      default: return 'var(--accent-color)';
    }
  };

  const getPresetText = () => {
    switch (phase) {
      case PHASE.IDLE: return '시작을 눌러주세요';
      case PHASE.READY: return '곧 시작합니다...';
      case PHASE.STUDY: return '집중하세요!';
      case PHASE.REST: return '잠시 쉬어가세요';
      case PHASE.COMPLETE: return '수고하셨습니다!';
      default: return '';
    }
  };

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] my-8">
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 300 300">
        <circle
          cx="150"
          cy="150"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="150"
          cy="150"
          r={radius}
          stroke={getPhaseColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute text-center flex flex-col items-center">
        <div className={`text-6xl font-bold font-mono mb-2 ${phase === PHASE.READY ? 'text-yellow-500' : ''}`}>
          {phase === PHASE.READY || phase === PHASE.IDLE 
            ? formatCountdown(remainingSeconds)
            : formatTime(remainingSeconds)}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {getPresetText()}
        </span>
      </div>
    </div>
  );
}
