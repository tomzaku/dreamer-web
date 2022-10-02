import React from 'react';
import { PomodoroContext } from './context';

export const usePomodoro = () => React.useContext(PomodoroContext);
