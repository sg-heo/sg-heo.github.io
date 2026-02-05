export const PHASE = {
  IDLE: 'idle',
  READY: 'ready',
  STUDY: 'study',
  REST: 'rest',
  COMPLETE: 'complete'
} as const;

export type PhaseType = typeof PHASE[keyof typeof PHASE];

export interface Config {
  READY_SECONDS: number;
  STUDY_SECONDS: number;
  REST_SECONDS: number;
  TOTAL_SETS: number;
}

export interface Log {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  setNumber: number;
  comment: string;
}

export const DEFAULT_CONFIG: Config = {
  READY_SECONDS: 5,
  STUDY_SECONDS: 50 * 60,
  REST_SECONDS: 10 * 60,
  TOTAL_SETS: 10
};

export const STORAGE_KEYS = {
  LOGS: 'studyTimer_logs',
  THEME: 'studyTimer_theme',
  CONFIG: 'studyTimer_config'
};
