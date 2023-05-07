import React from 'react';
import { Theme } from '../enum/PomodoroGlobalConfig';

type GlobalToolType = {
  pomodoro: number;
  setPomodoro: (prop: number) => void;
  shortBreak: number;
  setShortBreak: (prop: number) => void;
  longBreak: number;
  setLongBreak: (prop: number) => void;
  theme: Theme;
  setTheme: (prop: Theme) => void;
};

export const PomodoroGlobalConfigContext = React.createContext<GlobalToolType>({
  pomodoro: 0,
  setPomodoro: () => {},
  shortBreak: 0,
  setShortBreak: () => {},
  longBreak: 0,
  setLongBreak: () => {},
  theme: Theme.Light,
  setTheme: () => {},
});
