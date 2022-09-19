import React from 'react'

export const useTimer = ({
  duration,
  step = 1000,
  shouldStop = (timer, step) => timer - step < 0,
}: {
  duration: number;
  step?: number;
  shouldStop?: (timer: number, step: number) => boolean;
}) => {
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
    }, 1000);
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
    start: startTimer
  }
};

