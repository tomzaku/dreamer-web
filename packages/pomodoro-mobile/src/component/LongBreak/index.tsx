import React from 'react';

// Component
import Timer from '../Timer';
import Button3D from '../Button3D';
import SelectTask from '../SelectTask';
import IconSkip from '@moon-ui/icon/IconSkip';
import Button from '@moon-ui/button/src/DefaultButton';

// Hooks
import { usePomodoroTimer } from '@dreamer/pomodoro-common';

import styles from './index.module.scss';
import { PomodoroPhase } from '../../enum';

export default function LongBreak() {
  const { longBreakTimer, setPomodoroPhase } = usePomodoroTimer();
  React.useEffect(() => {
    longBreakTimer.start();
  }, []);
  return (
    <>
      <div className={styles.body}>
        <Timer time={longBreakTimer.time} />
        <SelectTask />
      </div>
      <div className={styles.footer}>
        <Button3D
          active={longBreakTimer.isPlaying}
          onClick={
            longBreakTimer.isPlaying
              ? longBreakTimer.pause
              : longBreakTimer.start
          }
        >
          {longBreakTimer.isPlaying ? 'PAUSE' : 'PLAY'}
        </Button3D>
        <Button
          className={styles.skipButton}
          onClick={() => {
            longBreakTimer.stop();
            setPomodoroPhase(PomodoroPhase.Pomodoro);
          }}
        >
          <IconSkip className={styles.icon} />
        </Button>
      </div>
    </>
  );
}
