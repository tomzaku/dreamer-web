import React from 'react';

// Context
import { PomodoroGlobalConfigContext } from '../context';

// Hooks
import { useLocalStorage } from '@dreamer/global';

// Enums
import { Theme } from '../enum/PomodoroGlobalConfig';

const ONE_MINUTE = 60 * 1000;

export const withPomodoroGlobalConfig = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function (props: P) {
    const [pomodoro, setPomodoro] = useLocalStorage('pomodoro', {
      pomodoro: 25 * ONE_MINUTE,
      shortBreak: 5 * ONE_MINUTE,
      longBreak: 10 * ONE_MINUTE,
      theme: Theme.Light,
    });
    return (
      <PomodoroGlobalConfigContext.Provider
        value={{
          ...pomodoro,
          setPomodoro: value => setPomodoro({ ...pomodoro, pomodoro: value }),
          setShortBreak: value =>
            setPomodoro({ ...pomodoro, shortBreak: value }),
          setLongBreak: value => setPomodoro({ ...pomodoro, longBreak: value }),
          setTheme: value => setPomodoro({ ...pomodoro, theme: value }),
        }}
      >
        <WrapComponent {...props} />
      </PomodoroGlobalConfigContext.Provider>
    );
  };
};
