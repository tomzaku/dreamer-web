import React from 'react';

import { PomodoroContext } from './context';

// Hooks
import { useLocalStorage } from '@dreamer/global';

const ONE_MINUTE = 60 * 1000;

export const withPomodoro = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function (props: P) {
    const [pomodoro, setPomodoro] = useLocalStorage('pomodoro', {
      pomodoro: 25 * ONE_MINUTE,
      shortBreak: 5 * ONE_MINUTE,
      longBreak: 10 * ONE_MINUTE,
    });
    return (
      <PomodoroContext.Provider
        value={{
          ...pomodoro,
          setPomodoro: (value) => setPomodoro({...pomodoro, pomodoro: value}),
          setShortBreak: (value) => setPomodoro({...pomodoro, shortBreak: value}),
          setLongBreak: (value) => setPomodoro({...pomodoro, longBreak: value}),
        }}
      >
        <WrapComponent {...props} />
      </PomodoroContext.Provider>
    );
  };
};
