import React from 'react'

// Component
import Timer from '../Timer';
import Button from '@moon-ui/button/src/DefaultButton';
import Division from '@moon-ui/division';
import Typography from '@moon-ui/typography';

// Utils
import { notify } from '@dreamer/notification';

// Hooks
import { useTimer } from '@dreamer/timer-hook';
import { useTask } from '@dreamer/tasks-page-common';

import styles from './index.module.scss';


const ONE_MINUTE = 60 * 1000;

export default function Pomodoro() {
  const timer = useTimer({ duration: 25 * ONE_MINUTE });
  const { getTaskDetail, activeTaskId } = useTask();
  const task = activeTaskId && getTaskDetail(activeTaskId);
  React.useEffect(() => {
    if(timer.time ===0) {
      notify("Let's break up", {})
    }
  },[timer.time])
  return (
    <>
      <div className={styles.body}>
        <Timer time={timer.time} />
        {task && 
        <div>
          <Division />
          <Typography.Title noMargin level={4}>
            {task?.name}
          </Typography.Title>
        </div>
        }
      </div>
      <div className={styles.footer}>
        <Button
          onClick={
            timer.isPlaying ? timer.pause : timer.start
          }
          size="lg"
          className={styles.button}
        >
          {timer.isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
    </>
  );
}

