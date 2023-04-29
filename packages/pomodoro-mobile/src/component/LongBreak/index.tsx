import React from 'react';

// Component
import Timer from '../Timer';
import Button3D from '../Button3D';
import SelectTask from '../SelectTask';
import IconSkip from '@moon-ui/icon/IconSkip';
import Button from '@moon-ui/button/src/DefaultButton';

// Utils
import { notify } from '@dreamer/notification';

// Hooks
import { usePomodoroTimer } from '@dreamer/pomodoro-common';

import styles from './index.module.scss';


type Props = {
  onTimeUp: () => void
}

export default function LongBreak({onTimeUp}: Props) {
  const { longBreakTimer } = usePomodoroTimer();
  React.useEffect(() => {
    longBreakTimer.start()
  }, [])
  React.useEffect(() => {
    if (longBreakTimer.time === 0) {
      notify("Let's continue", {});
      longBreakTimer.stop()
      onTimeUp()
    }
  }, [longBreakTimer.time]);
  return (
    <>
      <div className={styles.body}>
        <Timer time={longBreakTimer.time} />
        <SelectTask />
      </div>
      <div className={styles.footer}>
        <Button3D
          active={longBreakTimer.isPlaying}
          onClick={longBreakTimer.isPlaying ? longBreakTimer.pause : longBreakTimer.start}
        >
          {longBreakTimer.isPlaying ? 'PAUSE' : 'PLAY'}
        </Button3D>
        <Button className={styles.skipButton} onClick={onTimeUp}>
          <IconSkip className={styles.icon} />
        </Button>
      </div>
    </>
  );
}
