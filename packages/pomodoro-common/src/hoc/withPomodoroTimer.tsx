import React from 'react';

// Context
import { PomodoroTimerContext } from '../context';

// Hooks
import { usePomodoro } from '../hook';
import { useTimer } from '@dreamer/timer-hook';

export const withPomodoroTimer = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function (props: P) {
  const { pomodoro, shortBreak, longBreak } = usePomodoro()
    const pomodoroTimer = useTimer({ duration: pomodoro });
    const shortBreakTimer = useTimer({ duration: shortBreak });
    const longBreakTimer = useTimer({ duration: longBreak });
    return (
      <PomodoroTimerContext.Provider
        value={{
          pomodoroTimer,
          shortBreakTimer,
          longBreakTimer
        }}
      >
        <WrapComponent {...props} />
      </PomodoroTimerContext.Provider>
    );
  };
};




