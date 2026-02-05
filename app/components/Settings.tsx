import { useState } from 'react';
import { Config } from '../types';

interface SettingsProps {
  config: Config;
  onSave: (newConfig: Config) => void;
}

export default function Settings({ config, onSave }: SettingsProps) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleChange = (key: keyof Config, value: number) => {
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleTimeChange = (key: 'STUDY_SECONDS' | 'REST_SECONDS', minutes: number, seconds: number) => {
    setLocalConfig(prev => ({
      ...prev,
      [key]: minutes * 60 + seconds
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">설정</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">공부 시간</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={Math.floor(localConfig.STUDY_SECONDS / 60)}
              onChange={(e) => handleTimeChange('STUDY_SECONDS', parseInt(e.target.value) || 0, localConfig.STUDY_SECONDS % 60)}
              className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="self-center">분</span>
            <input
              type="number"
              value={localConfig.STUDY_SECONDS % 60}
              onChange={(e) => handleTimeChange('STUDY_SECONDS', Math.floor(localConfig.STUDY_SECONDS / 60), parseInt(e.target.value) || 0)}
              className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="self-center">초</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">휴식 시간</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={Math.floor(localConfig.REST_SECONDS / 60)}
              onChange={(e) => handleTimeChange('REST_SECONDS', parseInt(e.target.value) || 0, localConfig.REST_SECONDS % 60)}
              className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="self-center">분</span>
            <input
              type="number"
              value={localConfig.REST_SECONDS % 60}
              onChange={(e) => handleTimeChange('REST_SECONDS', Math.floor(localConfig.REST_SECONDS / 60), parseInt(e.target.value) || 0)}
              className="w-20 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="self-center">초</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">준비 시간 (초)</label>
          <input
            type="number"
            value={localConfig.READY_SECONDS}
            onChange={(e) => handleChange('READY_SECONDS', parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">총 세트 수</label>
          <input
            type="number"
            value={localConfig.TOTAL_SETS}
            onChange={(e) => handleChange('TOTAL_SETS', parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          onClick={() => onSave(localConfig)}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
