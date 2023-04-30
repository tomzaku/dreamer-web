import React from 'react';

// Context
import { PomodoroTimerContext } from '../context';

// Hooks
import { usePomodoro } from '../hook';
import { useTimer } from '@dreamer/timer-hook';

// Enums
import { PomodoroPhase } from '../enum';

// Utils
import { notify } from '@dreamer/notification';

export const withPomodoroTimer = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function(props: P) {
    const [pomodoroPhase, setPomodoroPhase] = React.useState(
      PomodoroPhase.Pomodoro
    );
    const { pomodoro, shortBreak, longBreak } = usePomodoro();
    const pomodoroTimer = useTimer({ duration: pomodoro });
    const shortBreakTimer = useTimer({ duration: shortBreak });
    const longBreakTimer = useTimer({ duration: longBreak });
    React.useEffect(() => {
      if (longBreakTimer.time === 0) {
        notify("Let's continue", {});
        longBreakTimer.stop();
        setPomodoroPhase(PomodoroPhase.Pomodoro);
      }
    }, [longBreakTimer.time]);
    React.useEffect(() => {
      if (shortBreakTimer.time === 0) {
        notify("Let's continue", {});
        shortBreakTimer.stop();
        setPomodoroPhase(PomodoroPhase.Pomodoro);
      }
    }, [shortBreakTimer.time]);
    React.useEffect(() => {
      if (pomodoroTimer.time === 0) {
        notify("Let's break up", {});
        pomodoroTimer.stop()
        setPomodoroPhase(PomodoroPhase.ShortBreak);
      }
    }, [pomodoroTimer.time]);
    return (
      <PomodoroTimerContext.Provider
        value={{
          pomodoroTimer,
          shortBreakTimer,
          longBreakTimer,
          pomodoroPhase,
          setPomodoroPhase,
        }}
      >
        <WrapComponent {...props} />
      </PomodoroTimerContext.Provider>
    );
  };
};
