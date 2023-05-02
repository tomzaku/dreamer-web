import React from 'react';

// Hooks
import {
  PomodoroPhase,
  usePomodoro,
  usePomodoroTimer,
} from '@dreamer/pomodoro-common';
import { formatMinuteAndSecond } from '@dreamer/tasks-page-common';

// Utils
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  placeholderStroke?: number;
  progressStroke?: number;
  background?: string;
  timeTextColor?: string;
  titleTextColor?: string;
};

export const LIGHT_THEME_PROPS = {
  background: '#FFFFFF',
  timeTextColor: '#000000',
  titleTextColor: '#8F8F8F',
}

export const DARK_THEME_PROPS = {
  background: '#000000',
  timeTextColor: '#FFFFFF',
  titleTextColor: '#8F8F8F',
}

const PomodoroPip = ({
  children,
  width = 1000,
  height = 1000,
  placeholderStroke = 20,
  progressStroke = 40,
  background = '#FFFFFF',
  timeTextColor = '#000000',
  titleTextColor = '#8F8F8F',
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { pomodoroTimer, pomodoroPhase, shortBreakTimer, longBreakTimer } =
    usePomodoroTimer();
  const { pomodoro, shortBreak, longBreak } = usePomodoro();

  const getPercentageOfProgress = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        return pomodoroTimer.time / pomodoro;
      }
      case PomodoroPhase.ShortBreak: {
        return shortBreakTimer.time / shortBreak;
      }
      case PomodoroPhase.LongBreak: {
        return longBreakTimer.time / longBreak;
      }
    }
  };
  const getTime = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        return formatMinuteAndSecond(pomodoroTimer.time);
      }
      case PomodoroPhase.ShortBreak: {
        return formatMinuteAndSecond(shortBreakTimer.time);
      }
      case PomodoroPhase.LongBreak: {
        return formatMinuteAndSecond(longBreakTimer.time);
      }
    }
  };
  const getText = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        return 'FOCUS'
      }
      case PomodoroPhase.ShortBreak: {
        return 'SHORT BREAK'
      }
      case PomodoroPhase.LongBreak: {
        return 'LONG BREAK'
      }
    }
  };

  // Draw Canvas
  React.useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const bufferStroke = 10;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        // Draw time
        ctx.fillStyle = timeTextColor;
        ctx.font = '300px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(getTime(), width / 2, height / 2 + 70);

        // Draw title
        ctx.fillStyle = titleTextColor;
        ctx.font = '100px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(getText(), width / 2, height / 2 + 180);

        // Draw the placeholder circle
        ctx.strokeStyle = '#606060';
        ctx.lineWidth = placeholderStroke;
        ctx.beginPath();
        ctx.arc(
          width / 2,
          width / 2,
          width / 2 - progressStroke / 2 - bufferStroke,
          0,
          2 * Math.PI
        );
        ctx.stroke();

        // Draw the progress circle
        ctx.strokeStyle = '#0b7dc2';
        ctx.lineWidth = progressStroke;
        ctx.beginPath();

        // Full
        ctx.arc(
          width / 2,
          width / 2,
          width / 2 - progressStroke / 2 - bufferStroke,
          (-1 / 2) * Math.PI,
          (-1 / 2) * Math.PI + 2 * Math.PI * getPercentageOfProgress()
        );
        ctx.stroke();
      }
    }
  }, [pomodoroTimer.time]);

  // Video config
  React.useEffect(() => {
    if (canvasRef.current && videoRef.current) {
      const stream = canvasRef.current.captureStream();
      videoRef.current.srcObject = stream;
      videoRef.current.autoplay = false;
      videoRef.current.controls = true;
    }
  }, []);
  return (
    <div className={styles.container}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={width}
        height={height}
      />
      <video
        className={cx(styles.video, !isVisible && styles.hidden)}
        ref={videoRef}
        width={width}
        height={height}
      />
      <div
        className={styles.body}
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.play();
            // setIsVisible(true);
            document.pictureInPictureEnabled &&
              videoRef.current.requestPictureInPicture();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PomodoroPip;
