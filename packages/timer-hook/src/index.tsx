import React from 'react'

// Types
import type { UseTimerOutput } from './type';

export const useTimer = ({
  duration,
  step = 1000,
  shouldStop = (timer, step) => timer - step < 0,
}: {
  duration: number;
  step?: number;
  shouldStop?: (timer: number, step: number) => boolean;
}): UseTimerOutput => {
  const [time, setTimer] = React.useState(duration);
  const [isPlaying, setIsPlaying] = React.useState(true)
  let timerInterval = React.useRef<NodeJS.Timer>();
  const startTimer = () => {
    setIsPlaying(true)
    timerInterval.current = setInterval(() => {
      setTimer(timer => {
        if (shouldStop(timer, step)) {
          clearInterval(timerInterval.current);
          return timer;
        } else {
          return timer - step;
        }
      });
    }, step);
  }
  const stopTimer = () => {
    setIsPlaying(false)
    setTimer(duration)
    clearInterval(timerInterval.current)
  }

  React.useEffect(() => {
    startTimer()
    return () => {
      clearInterval(timerInterval.current);
    };
  }, []);
  return {
    time,
    isPlaying,
    pause: () => {
      setIsPlaying(false)
      clearInterval(timerInterval.current)
    },
    start: startTimer,
    stop: stopTimer,
  }
};

export {
  UseTimerOutput
}
