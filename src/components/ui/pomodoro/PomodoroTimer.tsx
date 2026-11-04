import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Palette,
  Settings as SettingsIcon,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  ListTodo,
  Pencil,
  Check,
} from 'lucide-react';
import {
  TimerMode,
  PomodoroTask,
  PomodoroSettings,
  PomodoroAesthetics,
} from './types';
import { soundSynth } from './audioSynthesizer';
import { ParticleCanvas } from './ParticleCanvas';
import { TasksDrawer } from './TasksDrawer';
import { AestheticsModal } from './AestheticsModal';
import { SettingsModal } from './SettingsModal';

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  alarmSound: 'digital',
  alarmVolume: 0.8,
  soundEnabled: true,
};

const DEFAULT_AESTHETICS: PomodoroAesthetics = {
  theme: 'fantasy',
  accentColor: '#a855f7',
  particleEffect: 'motes',
};

const QUOTES = [
  '“It always seems impossible until it’s done.”',
  '“Focus on being productive instead of busy.”',
  '“Deep work is the superpower of the 21st century.”',
  '“Small daily improvements over time lead to stunning results.”',
  '“One pomodoro at a time.”',
  '“Action cures fear and hesitation.”',
];

const STORAGE_KEYS = {
  TASKS: 'sahil_desk_pomodoro_tasks',
  SETTINGS: 'sahil_desk_pomodoro_settings',
  AESTHETICS: 'sahil_desk_pomodoro_aesthetics',
  STREAK: 'sahil_desk_pomodoro_streak',
  QUOTE: 'sahil_desk_pomodoro_custom_quote',
};

export const PomodoroTimer: React.FC = () => {
  // 1. Settings & Aesthetics State with LocalStorage
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [aesthetics, setAesthetics] = useState<PomodoroAesthetics>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AESTHETICS);
      return saved ? { ...DEFAULT_AESTHETICS, ...JSON.parse(saved) } : DEFAULT_AESTHETICS;
    } catch {
      return DEFAULT_AESTHETICS;
    }
  });

  // 2. Tasks State
  const [tasks, setTasks] = useState<PomodoroTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback initial sample tasks
    }
    return [
      {
        id: '1',
        title: 'Complete 3D desk interactive experience',
        completed: false,
        priority: 'high',
        estimatedPomodoros: 4,
        completedPomodoros: 1,
        createdAt: Date.now() - 3600000,
      },
      {
        id: '2',
        title: 'Review clean code architecture & tests',
        completed: false,
        priority: 'medium',
        estimatedPomodoros: 2,
        completedPomodoros: 0,
        createdAt: Date.now() - 1800000,
      },
    ];
  });
  const [activeTaskId, setActiveTaskId] = useState<string | null>('1');

  // 3. Streak & Quote
  const [streak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK);
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [customQuote, setCustomQuote] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.QUOTE) || '';
    } catch {
      return '';
    }
  });
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [editingQuoteText, setEditingQuoteText] = useState('');

  // 4. Modals & Drawers state
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isAestheticsOpen, setIsAestheticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 5. Timer Core State
  const [mode, setMode] = useState<TimerMode>('focus');
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [modeCounts, setModeCounts] = useState({ focus: 0, short: 0, long: 0 });

  // Calculate duration in seconds for current mode
  const getModeDurationSeconds = (m: TimerMode): number => {
    switch (m) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'short':
        return settings.shortBreakDuration * 60;
      case 'long':
        return settings.longBreakDuration * 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState<number>(() => settings.focusDuration * 60);
  const totalDuration = getModeDurationSeconds(mode);

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AESTHETICS, JSON.stringify(aesthetics));
    } catch {}
  }, [aesthetics]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTE, customQuote);
    } catch {}
  }, [customQuote]);

  // Adjust timeLeft if current duration settings change while paused
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getModeDurationSeconds(mode));
    }
  }, [settings.focusDuration, settings.shortBreakDuration, settings.longBreakDuration, mode]);

  // Timer Tick Interval
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, cycleCount, settings, activeTaskId]);

  // Handler when timer countdown finishes
  const handleTimerComplete = () => {
    setIsRunning(false);

    // Play completion alarm
    soundSynth.playAlarm(settings.alarmSound, settings.alarmVolume);

    // Increment mode count
    setModeCounts((prev) => ({ ...prev, [mode]: prev[mode] + 1 }));

    if (mode === 'focus') {
      const nextCycle = cycleCount + 1;
      setCycleCount(nextCycle);

      // Increment active task pomodoro
      if (activeTaskId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeTaskId
              ? { ...t, completedPomodoros: t.completedPomodoros + 1 }
              : t
          )
        );
      }

      // Check if time for long break or short break
      if (nextCycle % settings.longBreakInterval === 0) {
        switchMode('long', settings.autoStartBreaks);
      } else {
        switchMode('short', settings.autoStartBreaks);
      }
    } else {
      // Break completed -> back to focus
      switchMode('focus', settings.autoStartFocus);
    }
  };

  const switchMode = (newMode: TimerMode, autoStart: boolean = false) => {
    setMode(newMode);
    const newDuration = getModeDurationSeconds(newMode);
    setTimeLeft(newDuration);
    setIsRunning(autoStart);
  };

  const handleTogglePlay = () => {
    soundSynth.playClick(0.3);
    if (timeLeft === 0) {
      setTimeLeft(getModeDurationSeconds(mode));
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    soundSynth.playClick(0.3);
    setIsRunning(false);
    setTimeLeft(getModeDurationSeconds(mode));
  };

  const handleSkip = () => {
    soundSynth.playClick(0.3);
    setIsRunning(false);
    if (mode === 'focus') {
      const nextCycle = cycleCount + 1;
      setCycleCount(nextCycle);
      if (nextCycle % settings.longBreakInterval === 0) {
        switchMode('long', false);
      } else {
        switchMode('short', false);
      }
    } else {
      switchMode('focus', false);
    }
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG Progress calculation
  // Radius = 132 => Circumference = 2 * PI * 132 = 829.38
  const CIRCUMFERENCE = 829.38;
  const progressRatio = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progressRatio);

  // Background gradient based on theme
  const getThemeBackgroundClass = () => {
    switch (aesthetics.theme) {
      case 'cyberpunk':
        return 'bg-[radial-gradient(ellipse_at_top,_#0e263d_0%,_#081220_50%,_#03070d_100%)]';
      case 'lofi':
        return 'bg-[radial-gradient(ellipse_at_top,_#382017_0%,_#1f110c_50%,_#0c0604_100%)]';
      case 'pastel':
        return 'bg-[radial-gradient(ellipse_at_top,_#361530_0%,_#1f0a1b_50%,_#0d040b_100%)]';
      default:
        // Fantasy
        return 'bg-[radial-gradient(ellipse_at_top,_#241242_0%,_#0f071f_50%,_#07030e_100%)]';
    }
  };

  const currentDisplayQuote = customQuote || QUOTES[quoteIndex % QUOTES.length];

  return (
    <div
      className={`relative w-full h-full min-h-[620px] rounded-3xl overflow-hidden flex flex-col justify-between text-white select-none ${getThemeBackgroundClass()}`}
    >
      {/* Particle background canvas */}
      <ParticleCanvas effect={aesthetics.particleEffect} accentColor={aesthetics.accentColor} />

      {/* Subtle background grain & vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

      {/* TOP HEADER BAR */}
      <header className="relative z-10 px-8 py-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full animate-pulse shadow-md"
            style={{ backgroundColor: aesthetics.accentColor }}
          />
          <h1 className="text-base font-bold tracking-wider text-white flex items-center gap-2">
            <span>Pomodoro Timer</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
              Desk Tablet
            </span>
          </h1>
        </div>

        {/* Top dock buttons */}
        <div className="flex items-center gap-2">
          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-amber-300"
            title="Daily Focus Streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{streak}</span>
          </div>

          {/* Aesthetics Palette */}
          <button
            type="button"
            onClick={() => {
              soundSynth.playClick(0.3);
              setIsAestheticsOpen(true);
            }}
            title="Theme & Aesthetics"
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => {
              soundSynth.playClick(0.3);
              setIsSettingsOpen(true);
            }}
            title="Timer Settings"
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CENTER STAGE */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-xl mx-auto w-full">
        {/* SEGMENTED MODE SELECTOR */}
        <div className="flex items-center p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-inner gap-1.5 mb-8">
          {(
            [
              { id: 'focus', label: 'Focus', count: modeCounts.focus },
              { id: 'short', label: 'Short Break', count: modeCounts.short },
              { id: 'long', label: 'Long Break', count: modeCounts.long },
            ] as const
          ).map((m) => {
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  soundSynth.playClick(0.3);
                  switchMode(m.id, false);
                }}
                className={`relative px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                }`}
                style={isActive ? { backgroundColor: `${aesthetics.accentColor}cc` } : {}}
              >
                <span>{m.label}</span>
                <span className="ml-1.5 opacity-60 text-[10px] font-mono">[{m.count}]</span>
              </button>
            );
          })}
        </div>

        {/* CIRCULAR SVG PROGRESS DIAL */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="pomodoroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor={aesthetics.accentColor} />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Track */}
            <circle
              cx="150"
              cy="150"
              r="132"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="9"
            />

            {/* Glowing Active Ring Fill */}
            <circle
              cx="150"
              cy="150"
              r="132"
              fill="none"
              stroke="url(#pomodoroGrad)"
              strokeWidth="9"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#glow)"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Centered Dial Information */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            {/* Digital Countdown Time */}
            <div className="text-5xl sm:text-6xl font-black tracking-tight font-mono text-white drop-shadow-md">
              {formattedTime}
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md">
              <span
                className={`w-2 h-2 rounded-full ${isRunning ? 'animate-ping' : ''}`}
                style={{ backgroundColor: aesthetics.accentColor }}
              />
              <span className="text-xs font-medium tracking-wide text-neutral-300 capitalize">
                {mode === 'focus' ? 'Focus session' : mode === 'short' ? 'Short break' : 'Long break'}
              </span>
            </div>
          </div>
        </div>

        {/* MOTIVATIONAL QUOTE */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center max-w-md px-4">
          {isEditingQuote ? (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={editingQuoteText}
                onChange={(e) => setEditingQuoteText(e.target.value)}
                placeholder="Enter personal motivational phrase..."
                className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/20 text-xs text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  soundSynth.playClick(0.3);
                  setCustomQuote(editingQuoteText.trim());
                  setIsEditingQuote(false);
                }}
                className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <p
                onClick={() => setQuoteIndex((prev) => prev + 1)}
                className="text-xs sm:text-sm italic font-light text-neutral-300 hover:text-white cursor-pointer transition-colors"
                title="Click for next quote"
              >
                {currentDisplayQuote}
              </p>
              <button
                type="button"
                onClick={() => {
                  soundSynth.playClick(0.2);
                  setEditingQuoteText(currentDisplayQuote.replace(/^[“”]|["”]$/g, ''));
                  setIsEditingQuote(true);
                }}
                title="Edit motivational phrase"
                className="text-neutral-500 hover:text-neutral-300 p-1"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </main>

      {/* BOTTOM ACTION BAR / CONTROLS DOCK */}
      <footer className="relative z-10 px-8 py-5 border-t border-white/5 flex items-center justify-between">
        {/* Left: Reset / Stop */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            title="Reset timer to beginning"
            className="p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Big Play / Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="group px-9 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 hover:brightness-110"
          style={{
            backgroundColor: aesthetics.accentColor,
            boxShadow: `0 8px 32px ${aesthetics.accentColor}55`,
          }}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-white" />
              <span>Start</span>
            </>
          )}
        </button>

        {/* Right: Skip & Tasks Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSkip}
            title="Skip to next session"
            className="p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundSynth.playClick(0.3);
              setIsTasksOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
          >
            <ListTodo className="w-4 h-4 text-purple-400" />
            <span>Tasks</span>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${aesthetics.accentColor}40`, color: aesthetics.accentColor }}
            >
              {tasks.filter((t) => !t.completed).length}
            </span>
          </button>
        </div>
      </footer>

      {/* SLIDE-OVER TASKS DRAWER */}
      <TasksDrawer
        isOpen={isTasksOpen}
        onClose={() => setIsTasksOpen(false)}
        tasks={tasks}
        activeTaskId={activeTaskId}
        onSelectActiveTask={(id) => setActiveTaskId(id)}
        onAddTask={(newTask) =>
          setTasks((prev) => [
            {
              ...newTask,
              id: Date.now().toString(),
              completedPomodoros: 0,
              createdAt: Date.now(),
            },
            ...prev,
          ])
        }
        onToggleTask={(id) =>
          setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
          )
        }
        onDeleteTask={(id) =>
          setTasks((prev) => prev.filter((t) => t.id !== id))
        }
        accentColor={aesthetics.accentColor}
      />

      {/* AESTHETICS MODAL */}
      <AestheticsModal
        isOpen={isAestheticsOpen}
        onClose={() => setIsAestheticsOpen(false)}
        aesthetics={aesthetics}
        onChange={(updates) => setAesthetics((prev) => ({ ...prev, ...updates }))}
      />

      {/* SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={(updates) => setSettings((prev) => ({ ...prev, ...updates }))}
        onResetDefaults={() => setSettings(DEFAULT_SETTINGS)}
        accentColor={aesthetics.accentColor}
      />
    </div>
  );
};
