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
  return function (props: P) {
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
        pomodoroTimer.start();
      }
    }, [longBreakTimer.time]);
    React.useEffect(() => {
      if (shortBreakTimer.time === 0) {
        notify("Let's continue", {});
        shortBreakTimer.stop();
        setPomodoroPhase(PomodoroPhase.Pomodoro);
        pomodoroTimer.start();
      }
    }, [shortBreakTimer.time]);
    React.useEffect(() => {
      if (pomodoroTimer.time === 0) {
        notify("Let's break up", {});
        pomodoroTimer.stop();
        setPomodoroPhase(PomodoroPhase.ShortBreak);
        shortBreakTimer.start();
      }
    }, [pomodoroTimer.time]);
    const autoStartTimerWhenChangePomodoroPhase = (nextPhase: PomodoroPhase) => {
      // currentPhase
      switch(pomodoroPhase) {
        case PomodoroPhase.Pomodoro: {
          pomodoroTimer.stop()
          break;
        }
        case PomodoroPhase.ShortBreak: {
          shortBreakTimer.stop()
          break
        }
        case PomodoroPhase.LongBreak: {
          longBreakTimer.stop()
        }
      }
      switch(nextPhase) {
        case PomodoroPhase.Pomodoro: {
          pomodoroTimer.start()
          break;
        }
        case PomodoroPhase.ShortBreak: {
          shortBreakTimer.start()
          break;
        }
        case PomodoroPhase.LongBreak: {
          return longBreakTimer.start()
        }
      }

    }
    return (
      <PomodoroTimerContext.Provider
        value={{
          pomodoroTimer,
          shortBreakTimer,
          longBreakTimer,
          pomodoroPhase,
          setPomodoroPhase,
          autoStartTimerWhenChangePomodoroPhase,
        }}
      >
        <WrapComponent {...props} />
      </PomodoroTimerContext.Provider>
    );
  };
};
