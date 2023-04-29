import React from 'react';
import { PomodoroTimerContext } from '../context';

export const usePomodoroTimer = () => React.useContext(PomodoroTimerContext);
