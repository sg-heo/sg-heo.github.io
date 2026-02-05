import { Log } from '../types';
import { formatDateTime, formatDuration } from '../utils/time';

interface LogListProps {
  logs: Log[];
  onDelete: (id: string) => void;
  onUpdateComment: (id: string, comment: string) => void;
}

export default function LogList({ logs, onDelete, onUpdateComment }: LogListProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        아직 기록된 로그가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map(log => (
        <div key={log.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDateTime(log.startTime)}
              </div>
              <div className="font-semibold">
                {formatDuration(log.duration)} 완료
              </div>
            </div>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded">
              {log.setNumber}세트
            </span>
          </div>
          
          {log.comment && (
            <div className="text-gray-700 dark:text-gray-300 mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              {log.comment}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                const comment = prompt('코멘트를 입력하세요:', log.comment);
                if (comment !== null) {
                  onUpdateComment(log.id, comment);
                }
              }}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              {log.comment ? '수정' : '코멘트'}
            </button>
            <button
              onClick={() => {
                if (confirm('이 로그를 삭제하시겠습니까?')) {
                  onDelete(log.id);
                }
              }}
              className="text-sm text-red-500 hover:text-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
