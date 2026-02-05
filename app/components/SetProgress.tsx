import { PhaseType, PHASE } from '../types';

interface SetProgressProps {
  currentSet: number;
  totalSets: number;
  phase: PhaseType;
}

export default function SetProgress({ currentSet, totalSets, phase }: SetProgressProps) {
  return (
    <div className="w-full mt-6 px-2">
      <div className="flex justify-between items-end mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Progress</span>
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
          {Math.round(((currentSet - 1) / totalSets) * 100)}%
        </span>
      </div>
      
      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        {/* 전체 진행 바 배경 */}
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500/20 transition-all duration-500"
          style={{ width: `${((currentSet - 1) / totalSets) * 100}%` }}
        />
        
        <div className="absolute w-full h-full flex justify-between items-center px-1">
          {Array.from({ length: totalSets }).map((_, index) => {
            const setNum = index + 1;
            let statusClass = 'bg-gray-300';
            let scaleClass = 'scale-75';
            
            if (setNum < currentSet) {
              statusClass = 'bg-blue-500';
              scaleClass = 'scale-90';
            } else if (setNum === currentSet && phase !== PHASE.IDLE) {
              statusClass = 'bg-blue-600 ring-4 ring-blue-200';
              scaleClass = 'scale-110';
            }

            return (
              <div
                key={setNum}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${statusClass} ${scaleClass}`}
                title={`${setNum}세트`}
              />
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
        <span>Start</span>
        <span>Goal</span>
      </div>
    </div>
  );
}
