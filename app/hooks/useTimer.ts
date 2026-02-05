import { useState, useEffect, useRef, useCallback } from 'react';
import { PHASE, PhaseType, Config, Log, STORAGE_KEYS } from '../types';
import { generateId } from '../utils/time';

export function useTimer(config: Config) {
  const [phase, setPhase] = useState<PhaseType>(PHASE.IDLE);
  const [currentSet, setCurrentSet] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(config.READY_SECONDS);
  const [totalSeconds, setTotalSeconds] = useState(config.READY_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseStartTimeRef = useRef<string | null>(null);

  // Load logs from storage
  useEffect(() => {
    const savedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveLogs = useCallback((newLogs: Log[]) => {
    setLogs(newLogs);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(newLogs));
  }, []);

  const playAlarm = useCallback(() => {
    const audio = new Audio('/alarm.mp3'); // Make sure to add an alarm sound file
    audio.play().catch(() => {});
  }, []);

  const showNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '📚' });
    }
  }, []);

  const completePhase = useCallback(() => {
    const endTime = new Date().toISOString();
    playAlarm();

    switch (phase) {
      case PHASE.READY:
        setPhase(PHASE.STUDY);
        setTotalSeconds(config.STUDY_SECONDS);
        setRemainingSeconds(config.STUDY_SECONDS);
        phaseStartTimeRef.current = new Date().toISOString();
        break;

      case PHASE.STUDY:
        if (phaseStartTimeRef.current) {
          const newLog: Log = {
            id: generateId(),
            startTime: phaseStartTimeRef.current,
            endTime,
            duration: config.STUDY_SECONDS,
            setNumber: currentSet,
            comment: ''
          };
          saveLogs([newLog, ...logs]);
        }
        
        setPhase(PHASE.REST);
        setTotalSeconds(config.REST_SECONDS);
        setRemainingSeconds(config.REST_SECONDS);
        showNotification('공부 완료!', `${currentSet}세트 공부 완료! 휴식 시간입니다.`);
        break;

      case PHASE.REST:
        if (currentSet >= config.TOTAL_SETS) {
          setPhase(PHASE.COMPLETE);
          setIsRunning(false);
          showNotification('모든 세트 완료!', '수고하셨습니다!');
        } else {
          setCurrentSet(prev => prev + 1);
          setPhase(PHASE.READY);
          setTotalSeconds(config.READY_SECONDS);
          setRemainingSeconds(config.READY_SECONDS);
          showNotification('휴식 완료!', `${currentSet + 1}세트를 시작합니다.`);
        }
        break;
    }
  }, [phase, currentSet, config, logs, saveLogs, playAlarm, showNotification]);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds(prev => prev - 1);
      }, 1000);
    } else if (isRunning && remainingSeconds <= 0) {
      completePhase();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remainingSeconds, completePhase]);

  const start = useCallback(() => {
    if (phase === PHASE.IDLE) {
      setPhase(PHASE.READY);
      setTotalSeconds(config.READY_SECONDS);
      setRemainingSeconds(config.READY_SECONDS);
    }
    setIsRunning(true);
  }, [phase, config]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setPhase(PHASE.IDLE);
    setCurrentSet(1);
    setTotalSeconds(config.READY_SECONDS);
    setRemainingSeconds(config.READY_SECONDS);
  }, [config]);

  return {
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
  };
}
