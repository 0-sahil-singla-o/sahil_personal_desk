import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Flame, Clock } from 'lucide-react';
import { PomodoroTask, Priority } from './types';
import { soundSynth } from './audioSynthesizer';

interface TasksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: PomodoroTask[];
  activeTaskId: string | null;
  onSelectActiveTask: (id: string | null) => void;
  onAddTask: (task: Omit<PomodoroTask, 'id' | 'createdAt' | 'completedPomodoros'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  accentColor: string;
}

export const TasksDrawer: React.FC<TasksDrawerProps> = ({
  isOpen,
  onClose,
  tasks,
  activeTaskId,
  onSelectActiveTask,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  accentColor,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('none');
  const [estimated, setEstimated] = useState<number>(1);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    soundSynth.playClick(0.3);
    onAddTask({
      title: newTitle.trim(),
      completed: false,
      priority,
      estimatedPomodoros: estimated,
    });
    setNewTitle('');
    setPriority('none');
    setEstimated(1);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const getPriorityBadge = (p: Priority) => {
    switch (p) {
      case 'high':
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">High</span>;
      case 'medium':
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Med</span>;
      case 'low':
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">Low</span>;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-slate-900/95 border-l border-white/10 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-wide">Tasks</h3>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: `${accentColor}33`, color: accentColor }}
            >
              {tasks.filter((t) => !t.completed).length} active
            </span>
          </div>
          <button
            onClick={() => {
              soundSynth.playClick(0.3);
              onClose();
            }}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Creation Form */}
        <form onSubmit={handleCreate} className="p-4 border-b border-white/10 bg-white/[0.01] space-y-3">
          <div className="relative">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What are you working on?"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-purple-400/60 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-xs">
            {/* Priority Selector */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/5">
              {(['none', 'low', 'medium', 'high'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    soundSynth.playClick(0.2);
                    setPriority(p);
                  }}
                  className={`px-2 py-1 rounded capitalize font-medium transition-all ${
                    priority === p ? 'bg-white/20 text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Estimated Pomodoro count */}
            <div className="flex items-center gap-1.5 text-neutral-300">
              <span className="text-[11px] text-neutral-400">Est:</span>
              <select
                value={estimated}
                onChange={(e) => setEstimated(Number(e.target.value))}
                className="bg-white/[0.05] border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num} className="bg-slate-900 text-white">
                    {num} 🍅
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-3 py-1.5 rounded-xl font-medium text-xs flex items-center gap-1 text-white disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </form>

        {/* Filter Pills */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-1">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  soundSynth.playClick(0.2);
                  setFilter(f);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
                  filter === f ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-neutral-400">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredTasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <Clock className="w-10 h-10 stroke-1 text-neutral-600 mb-2 opacity-50" />
              <p className="text-sm font-medium text-neutral-400">No tasks here</p>
              <p className="text-xs mt-1 text-neutral-500">
                {filter === 'completed'
                  ? 'Complete a focus session to check off a task!'
                  : 'Add a task above to track your focus session.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((t) => {
              const isActive = activeTaskId === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => onSelectActiveTask(isActive ? null : t.id)}
                  className={`group relative p-3 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] border-purple-500/50 shadow-md ring-1 ring-purple-500/30'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundSynth.playClick(0.35);
                        onToggleTask(t.id);
                      }}
                      className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        t.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-white/30 hover:border-white/60 bg-white/5'
                      }`}
                    >
                      {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium truncate transition-colors ${
                            t.completed
                              ? 'line-through text-neutral-500'
                              : isActive
                              ? 'text-white font-semibold'
                              : 'text-neutral-200'
                          }`}
                        >
                          {t.title}
                        </span>
                        {getPriorityBadge(t.priority)}
                      </div>

                      <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-400">
                        <span className="flex items-center gap-1 font-mono">
                          🍅 {t.completedPomodoros}/{t.estimatedPomodoros}
                        </span>
                        {isActive && (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 animate-pulse">
                            <Flame className="w-3 h-3" /> Focus Target
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundSynth.playClick(0.2);
                        onDeleteTask(t.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
