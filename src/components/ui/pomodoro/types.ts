export type TimerMode = 'focus' | 'short' | 'long';

export type Priority = 'none' | 'low' | 'medium' | 'high';

export interface PomodoroTask {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: number;
}

export type ThemePreset = 'fantasy' | 'cyberpunk' | 'lofi' | 'pastel';

export type ParticleEffect = 'none' | 'motes' | 'stars' | 'rain' | 'bubbles';

export type AlarmSound = 'digital' | 'chime' | 'bell' | 'none';

export interface PomodoroSettings {
  focusDuration: number;      // in minutes (default: 25)
  shortBreakDuration: number; // in minutes (default: 5)
  longBreakDuration: number;  // in minutes (default: 15)
  longBreakInterval: number;  // default: 4 sessions
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  alarmSound: AlarmSound;
  alarmVolume: number;        // 0 to 1
  soundEnabled: boolean;
}

export interface PomodoroAesthetics {
  theme: ThemePreset;
  accentColor: string;
  particleEffect: ParticleEffect;
}
