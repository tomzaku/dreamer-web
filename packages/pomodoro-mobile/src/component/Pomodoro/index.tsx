import React from 'react';

// Component
import Timer from '../Timer';

// Utils
import { notify } from '@dreamer/notification';

// Hooks
import { usePomodoro } from '@dreamer/pomodoro-common';
import { useTimer } from '@dreamer/timer-hook';

import styles from './index.module.scss';
import SelectTask from '../SelectTask';
import Button3D from '../Button3D';

type Props = {
  onTimeUp: () => void
}

export default function Pomodoro({onTimeUp}: Props) {
  const { pomodoro: duration } = usePomodoro()
  const timer = useTimer({ duration });
  React.useEffect(() => {
    if (timer.time === 0) {
      notify("Let's break up", {});
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
      </div>
    </>
  );
}
