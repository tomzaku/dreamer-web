import React from 'react';

// Components
import Timer from '../Timer';
import SelectTask from '../SelectTask';
import Button3D from '../Button3D';
import Button from '@moon-ui/button/src/DefaultButton';
import IconSkip from '@moon-ui/icon/IconSkip';

// Utils
import { notify } from '@dreamer/notification';

// Hooks
import { usePomodoroTimer } from '@dreamer/pomodoro-common';
import { useIntl } from '@dreamer/translation';

import styles from './index.module.scss';

type Props = {
  onTimeUp: () => void;
};

export default function ShortBreak({ onTimeUp }: Props) {
  const { shortBreakTimer } = usePomodoroTimer();
  const intl = useIntl();
  React.useEffect(() => {
    shortBreakTimer.start()
  }, [])
  React.useEffect(() => {
    if (shortBreakTimer.time === 0) {
      notify("Let's continue", {});
      shortBreakTimer.stop()
      onTimeUp();
    }
  }, [shortBreakTimer.time]);
  return (
    <>
      <div className={styles.body}>
        <Timer time={shortBreakTimer.time} />
        <SelectTask />
      </div>
      <div className={styles.footer}>
        <Button3D
          active={shortBreakTimer.isPlaying}
          onClick={shortBreakTimer.isPlaying ? shortBreakTimer.pause : shortBreakTimer.start}
        >
          {shortBreakTimer.isPlaying
            ? intl.formatMessage({
                id: 'pomodoro-mobile.label-pomodoro-pause',
                defaultMessage: 'PAUSE',
              })
            : intl.formatMessage({
                id: 'pomodoro-mobile.label-pomodoro-pause',
                defaultMessage: 'PLAY',
              })}
        </Button3D>
        <Button className={styles.skipButton} onClick={onTimeUp}>
          <IconSkip className={styles.icon} />
        </Button>
      </div>
    </>
  );
}
