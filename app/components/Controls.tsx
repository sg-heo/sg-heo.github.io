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
    <div className="flex flex-col items-center gap-6 mt-8 w-full">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:shadow-blue-500/50 active:scale-95"
          title={phase === PHASE.IDLE ? '시작' : '재개'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1">
            <path fillRule="evenodd" d="M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" clipRule="evenodd" />
          </svg>
          <span className="absolute -bottom-8 text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {phase === PHASE.IDLE ? '시작' : '재개'}
          </span>
        </button>
      ) : (
        <button
          onClick={onPause}
          className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-yellow-500 text-white shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-110 hover:bg-yellow-600 hover:shadow-yellow-500/50 active:scale-95"
          title="일시정지"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
          </svg>
          <span className="absolute -bottom-8 text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            일시정지
          </span>
        </button>
      )}
      
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        초기화
      </button>
    </div>
  );
}
