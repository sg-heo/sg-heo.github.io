import { PhaseType, PHASE } from '../types';

interface ControlsProps {
  isRunning: boolean;
  phase: PhaseType;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function Controls({ isRunning, phase, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-8 w-full">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="control-btn start"
        >
          <span className="text-xl">▶</span>
          <span>{phase === PHASE.IDLE ? '시작' : '재개'}</span>
        </button>
      ) : (
        <button
          onClick={onPause}
          className="control-btn pause"
        >
          <span className="text-xl">⏸</span>
          <span>일시정지</span>
        </button>
      )}
      <button
        onClick={onReset}
        className="control-btn reset"
      >
        <span className="text-xl">↺</span>
        <span>리셋</span>
      </button>
    </div>
  );
}
