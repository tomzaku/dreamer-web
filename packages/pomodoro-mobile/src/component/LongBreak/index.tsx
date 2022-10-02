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
import { useTimer } from '@dreamer/timer-hook';
import { usePomodoro } from '@dreamer/pomodoro-common';

import styles from './index.module.scss';


type Props = {
  onTimeUp: () => void
}

export default function LongBreak({onTimeUp}: Props) {
  const { longBreak: duration } = usePomodoro()
  const timer = useTimer({ duration });
  React.useEffect(() => {
    if (timer.time === 0) {
      notify("Let's continue", {});
      onTimeUp()
    }
  }, [timer.time]);
  return (
    <>
      <div className={styles.body}>
        <Timer time={timer.time} />
        <SelectTask />
      </div>
      <div className={styles.footer}>
        <Button3D
          active={timer.isPlaying}
          onClick={timer.isPlaying ? timer.pause : timer.start}
        >
          {timer.isPlaying ? 'PAUSE' : 'PLAY'}
        </Button3D>
        <Button className={styles.skipButton} onClick={onTimeUp}>
          <IconSkip className={styles.icon} />
        </Button>
      </div>
    </>
  );
}
