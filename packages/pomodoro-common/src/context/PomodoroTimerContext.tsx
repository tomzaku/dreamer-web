import React from 'react';

// Hooks
import { UseTimerOutput } from '@dreamer/timer-hook';

// Enums
import { PomodoroPhase } from '../enum';

type PomodoroTimer = {
  pomodoroTimer: UseTimerOutput;
  shortBreakTimer: UseTimerOutput;
  longBreakTimer: UseTimerOutput;
  pomodoroPhase: PomodoroPhase;
  setPomodoroPhase: (p: PomodoroPhase) => void
  autoStartTimerWhenChangePomodoroPhase: (p: PomodoroPhase) => void
};

const TIMER_DEFAULT = {
  time: 0,
  isPlaying: false,
  pause: () => {},
  start: () => {},
  stop: () => {},
};

export const PomodoroTimerContext = React.createContext<PomodoroTimer>({
  pomodoroTimer: TIMER_DEFAULT,
  shortBreakTimer: TIMER_DEFAULT,
  longBreakTimer: TIMER_DEFAULT,
  pomodoroPhase: PomodoroPhase.Pomodoro,
  setPomodoroPhase: () => {},
  autoStartTimerWhenChangePomodoroPhase: () => {}
});
