import React from 'react';
import { UseTimerOutput } from '@dreamer/timer-hook';

type PomodoroTimer = {
  pomodoroTimer: UseTimerOutput;
  shortBreakTimer: UseTimerOutput;
  longBreakTimer: UseTimerOutput;
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
});
