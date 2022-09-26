import React from 'react';

import Timer from '../Timer';
import SelectTask from '../SelectTask';
import Button3D from '../Button3D';
import Button from '@moon-ui/button/src/DefaultButton';
import IconSkip from '@moon-ui/icon/IconSkip';

// Utils
import { notify } from '@dreamer/notification';

// Hooks
import { useTimer } from '@dreamer/timer-hook';

import styles from './index.module.scss';

const ONE_MINUTE = 60 * 1000;

type Props = {
  onTimeUp: () => void
}

export default function ShortBreak({ onTimeUp }: Props) {
  const timer = useTimer({ duration: 5 * ONE_MINUTE });
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
