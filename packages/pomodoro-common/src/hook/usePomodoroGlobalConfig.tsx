import React from 'react';
import { PomodoroGlobalConfigContext } from '../context';

export const usePomodoroGlobalConfig = () => React.useContext(PomodoroGlobalConfigContext);
