import { PhaseType, PHASE } from '../types';

interface SetProgressProps {
  currentSet: number;
  totalSets: number;
  phase: PhaseType;
}

export default function SetProgress({ currentSet, totalSets, phase }: SetProgressProps) {
  return (
    <div className="w-full mt-8 px-4">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        세트 진행
      </div>
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div className="absolute w-full h-full flex justify-between items-center px-1">
          {Array.from({ length: totalSets }).map((_, index) => {
            const setNum = index + 1;
            let statusClass = '';
            
            if (setNum < currentSet) {
              statusClass = 'completed';
            } else if (setNum === currentSet && phase !== PHASE.IDLE) {
              statusClass = 'active';
            }

            return (
              <div
                key={setNum}
                className={`set-dot ${statusClass}`}
                title={`${setNum}세트`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
