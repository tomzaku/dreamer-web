// Components
import IconPauseCircle from '@moon-ui/icon/IconPauseCircle';
import IconPlayCircle from '@moon-ui/icon/IconPlayCircle';
import Typography from '@moon-ui/typography';
import IconMusic from '@moon-ui/icon/IconMusic';

// Hooks
import { usePomodoro, usePomodoroTimer } from '@dreamer/pomodoro-common';
import { useGlobalTool } from '@dreamer/global-tool-common';

// Enums
import { PomodoroPhase } from '@dreamer/pomodoro-common';
import { GlobalTool } from '@dreamer/global-tool-common';

// Utils
import cx from 'classnames';

import styles from './index.module.scss';
import Pomodoro from '@dreamer/pomodoro-mobile/src/component/Pomodoro';
import { requireNotifyPermission } from '@dreamer/notification';

type Props = {
  className?: string;
};

const PomodoroPlayer = ({ className }: Props) => {
  const { pomodoroPhase, pomodoroTimer, shortBreakTimer, longBreakTimer } =
    usePomodoroTimer();
  const { open, visibleTool } = useGlobalTool();
  const { pomodoro, shortBreak, longBreak } = usePomodoro();
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
  const getProgress = () => {
    switch (pomodoroPhase) {
      case PomodoroPhase.Pomodoro: {
        return (pomodoro - pomodoroTimer.time) / pomodoro;
      }
      case PomodoroPhase.ShortBreak: {
        return (shortBreak - shortBreakTimer.time) / shortBreak;
      }
      case PomodoroPhase.LongBreak: {
        return (longBreak - longBreakTimer.time) / longBreak;
      }
    }
  };
  const onClickPlayOrPauseIcon = () => {
    requireNotifyPermission();
    if (isPlaying) {
      onPause();
    } else {
      onStart();
    }
  };
  const progress = getProgress();
  return (
    <div
      className={cx(
        styles.container,
        pomodoroPhase !== PomodoroPhase.Pomodoro && styles.containerBreak,
        className
      )}
    >
      {progress > 0 && (
        <div>
          <div
            className={styles.progress}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
      <div className={styles.body}>
        {isPlaying ? (
          <IconPauseCircle
            className={styles.icon}
            onClick={onClickPlayOrPauseIcon}
          />
        ) : (
          <IconPlayCircle
            className={styles.icon}
            onClick={onClickPlayOrPauseIcon}
          />
        )}
        <Typography.Title
          onClick={() => open(GlobalTool.FocusMode)}
          level={3}
          className={styles.pomodoroPhaseText}
        >
          {getPomodoroPhaseText()}
        </Typography.Title>
        <IconMusic
          className={styles.icon}
          onClick={() => open(GlobalTool.Sound)}
          width="40"
          height="40"
        />
      </div>
    </div>
  );
};

export default PomodoroPlayer;
