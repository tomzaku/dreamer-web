import React from 'react';

// Component
import Timer from '../Timer';
import Button3D from '../Button3D';
import SelectTask from '../SelectTask';

// Utils
import { notify } from '@dreamer/notification';

// Hooks
import { useTimer } from '@dreamer/timer-hook';

import styles from './index.module.scss';
import { ONE_MINUTE } from '../../constant';


type Props = {
  onTimeUp: () => void
}

export default function LongBreak({onTimeUp}: Props) {
  const timer = useTimer({ duration: 15 * ONE_MINUTE });
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
      </div>
    </>
  );
}
