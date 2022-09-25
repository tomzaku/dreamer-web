import React from 'react';
import Drawer from '@moon-ui/drawer';
import ShortBreak from './component/ShortBreak';
import LongBreak from './component/LongBreak';
import { MobileHeader } from '@dreamer/header';
import Typography from '@moon-ui/typography';
import Pomodoro from './component/Pomodoro';

import cx from 'classnames';

// Hooks
import { useIntl } from '@dreamer/translation';

import styles from './index.module.scss';

// Enum
import { PomodoroPhase } from './enum';
import Intro from './component/Intro';

enum State {
  Intro,
  Pomodoro,
}
export default function PomodoroMobile({
  visible,
  onClickBackButton,
}: {
  visible: boolean;
  onClickBackButton?: () => void;
}) {
  const intl = useIntl();
  const [state, setState] = React.useState(State.Intro);
  const [pomodoroPhase, setPomodoroPhase] = React.useState<PomodoroPhase>(
    PomodoroPhase.Pomodoro
  );
  const renderBody = () => {
    if (state === State.Intro) {
      return <Intro onClickBackButton={onClickBackButton} onSubmit={() => setState(State.Pomodoro)} />;
    }

    return (
      <>
        <MobileHeader
          onClickBackButton={onClickBackButton}
          title={intl.formatMessage({
            id: 'music-controller-mobile.label-pomodoro-title',
            defaultMessage: 'Pomodoro',
          })}
        />
        <div className={styles.tab}>
          <Typography.Text
            className={cx(
              styles.tabName,
              pomodoroPhase === PomodoroPhase.Pomodoro && styles.tabNameActive
            )}
            onClick={() => setPomodoroPhase(PomodoroPhase.Pomodoro)}
          >
            {intl.formatMessage({
              id: 'music-controller-mobile.label-pomodoro-tab',
              defaultMessage: 'Pomodoro',
            })}
          </Typography.Text>
          <Typography.Text
            className={cx(
              styles.tabName,
              pomodoroPhase === PomodoroPhase.ShortBreak && styles.tabNameActive
            )}
            onClick={() => setPomodoroPhase(PomodoroPhase.ShortBreak)}
          >
            {intl.formatMessage({
              id: 'music-controller-mobile.label-pomodoro-short-break',
              defaultMessage: 'Short Break',
            })}
          </Typography.Text>
          <Typography.Text
            className={cx(
              styles.tabName,
              pomodoroPhase === PomodoroPhase.LongBreak && styles.tabNameActive
            )}
            onClick={() => setPomodoroPhase(PomodoroPhase.LongBreak)}
          >
            {intl.formatMessage({
              id: 'music-controller-mobile.label-pomodoro-long-break',
              defaultMessage: 'Long Break',
            })}
          </Typography.Text>
        </div>
        {pomodoroPhase === PomodoroPhase.Pomodoro && <Pomodoro />}
        {pomodoroPhase === PomodoroPhase.ShortBreak && <ShortBreak />}
        {pomodoroPhase === PomodoroPhase.LongBreak && <LongBreak />}
      </>
    );
  };
  return (
    <Drawer className={styles.drawer} visible={visible}>
      {renderBody()}
    </Drawer>
  );
}
