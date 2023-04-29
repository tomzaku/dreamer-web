// Components
import IconPauseCircle from '@moon-ui/icon/IconPauseCircle';
import IconPlayCircle from '@moon-ui/icon/IconPlayCircle';

// Hooks
import { usePomodoro, usePomodoroTimer } from '@dreamer/pomodoro-common';

// Enums
import { PomodoroPhase } from '@dreamer/pomodoro-common';

// Utils
import cx from 'classnames';

import styles from './index.module.scss';
import Typography from '@moon-ui/typography';
import IconMusic from '@moon-ui/icon/IconMusic';

const PomodoroPlayer = () => {
  const { pomodoroPhase, pomodoroTimer, shortBreakTimer, longBreakTimer } =
    usePomodoroTimer();
  const { pomodoro, shortBreak, longBreak } = usePomodoro()
  const isPlaying =
    pomodoroTimer.isPlaying ||
    shortBreakTimer.isPlaying ||
    longBreakTimer.isPlaying;
  const onStart = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        pomodoroTimer.start();
        break;
      }
      case PomodoroPhase.ShortBreak: {
        shortBreakTimer.start();
        break;
      }
      case PomodoroPhase.LongBreak:
      default: {
        longBreakTimer.start();
        break;
      }
    }
  };
  const onPause = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        pomodoroTimer.pause();
        break;
      }
      case PomodoroPhase.ShortBreak: {
        shortBreakTimer.pause();
        break;
      }
      case PomodoroPhase.LongBreak:
      default: {
        longBreakTimer.pause();
        break;
      }
    }
  };
  const getPomodoroPhaseText = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        if (isPlaying) return 'Focusing';
        return 'Focus';
      }
      case PomodoroPhase.ShortBreak: {
        return 'Short Break';
      }
      case PomodoroPhase.LongBreak:
      default: {
        return 'Long Break';
      }
    }
  };
  const getPercentage = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        return pomodoroTimer.time / pomodoro
      }
      case PomodoroPhase.ShortBreak: {
        return shortBreakTimer.time / shortBreak
      }
      case PomodoroPhase.LongBreak: {
        return longBreakTimer.time / longBreak
      }
    }
  }
  const onClickPlayOrPauseIcon = isPlaying ? onPause : onStart;
  return (
    <div
      className={cx(
        styles.container,
        pomodoroPhase !== PomodoroPhase.Pomodoro && styles.containerBreak
      )}
    >
      <div
        className={styles.progress}
        style={{ width: `${getPercentage()}%` }}
      />
      <div className={styles.body}>
        {isPlaying ? (
          <IconPauseCircle onClick={onClickPlayOrPauseIcon} />
        ) : (
          <IconPlayCircle onClick={onClickPlayOrPauseIcon} />
        )}
        <Typography.Title level={2} className={styles.pomodoroPhaseText}>
          {getPomodoroPhaseText()}
        </Typography.Title>
        <IconMusic width="40" height="40" />
      </div>
    </div>
  );
};

export default PomodoroPlayer;
