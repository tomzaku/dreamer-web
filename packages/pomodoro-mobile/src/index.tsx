import React from 'react';
import Drawer from '@moon-ui/drawer';
import ShortBreak from './component/ShortBreak';
import LongBreak from './component/LongBreak';
import Typography from '@moon-ui/typography';
import Pomodoro from './component/Pomodoro';
import Intro from './component/Intro';
import Header from './component/Header';
import IconMusic from '@moon-ui/icon/IconMusic';
import Modal from '@moon-ui/modal';

import cx from 'classnames';

// Hooks
import { useIntl } from '@dreamer/translation';
import { useTask } from '@dreamer/tasks-page-common';
import { useGlobalTool } from '@dreamer/global-tool-common';

import styles from './index.module.scss';

// Enum
import { PomodoroPhase } from './enum';
import { GlobalTool } from '@dreamer/global-tool-common';

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
  const [state, setState] = React.useState<State>(State.Intro);
  const [pomodoroPhase, setPomodoroPhase] = React.useState<PomodoroPhase>(
    PomodoroPhase.Pomodoro
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState<PomodoroPhase>(PomodoroPhase.Pomodoro);
  const { activeTaskId } = useTask();
  const { open } = useGlobalTool();

  React.useEffect(() => {
    setState(State.Intro);
  }, [activeTaskId]);
  const renderBody = () => {
    if (state === State.Intro) {
      return (
        <Intro
          onClickBackButton={onClickBackButton}
          onSubmit={() => setState(State.Pomodoro)}
        />
      );
    }

    return (
      <>
        <Modal
          title={intl.formatMessage({
            defaultMessage: 'STOP PROGRESS?',
            id: 'music-controller-mobile.label-stop-progress',
          })}
          primaryButtonText={intl.formatMessage({
            defaultMessage: 'NO',
            id: 'label-no',
          })}
          primaryButtonOnClick={() => {
            setModalVisible(false);
          }}
          secondaryButtonText={intl.formatMessage({
            defaultMessage: 'YES',
            id: 'label-yes',
          })}
          secondaryButtonClick={() => {
            setModalVisible(false);
            setPomodoroPhase(modalInfo);
          }}
          visible={modalVisible}
          content={
            <>
              {intl.formatMessage({
                id: 'music-controller-mobile.label-modal-confirm',
                defaultMessage:
                  'The timer is running, are you sure you want to switch',
              })}
            </>
          }
        />
        <Header onClickBackButton={onClickBackButton}>
          <div className={styles.tabContainer}>
            <div className={styles.tab}>
              <Typography.Text
                className={cx(
                  styles.tabName,
                  pomodoroPhase === PomodoroPhase.Pomodoro &&
                  styles.tabNameActive
                )}
                onClick={() => {
                  if (pomodoroPhase !== PomodoroPhase.Pomodoro) {
                    setModalVisible(true);
                    setModalInfo(PomodoroPhase.Pomodoro);
                  }
                }}
              >
                {intl.formatMessage({
                  id: 'music-controller-mobile.label-pomodoro-tab',
                  defaultMessage: 'Pomodoro',
                })}
              </Typography.Text>
              <Typography.Text
                className={cx(
                  styles.tabName,
                  pomodoroPhase === PomodoroPhase.ShortBreak &&
                  styles.tabNameActive
                )}
                onClick={() => {
                  if (pomodoroPhase !== PomodoroPhase.ShortBreak) {
                    setModalVisible(true);
                    setModalInfo(PomodoroPhase.ShortBreak);
                  }
                }}
              >
                {intl.formatMessage({
                  id: 'music-controller-mobile.label-pomodoro-short-break',
                  defaultMessage: 'Short Break',
                })}
              </Typography.Text>
              <Typography.Text
                className={cx(
                  styles.tabName,
                  pomodoroPhase === PomodoroPhase.LongBreak &&
                  styles.tabNameActive
                )}
                onClick={() => {
                  if (pomodoroPhase !== PomodoroPhase.LongBreak) {
                    setModalVisible(true);
                    setModalInfo(PomodoroPhase.LongBreak);
                  }
                }}
              >
                {intl.formatMessage({
                  id: 'music-controller-mobile.label-pomodoro-long-break',
                  defaultMessage: 'Long Break',
                })}
              </Typography.Text>
            </div>
            <div className={styles.app}>
              <IconMusic onClick={() => open(GlobalTool.Sound)} />
            </div>
          </div>
        </Header>
        {(() => {
          switch (pomodoroPhase) {
            case PomodoroPhase.Pomodoro: {
              return (
                <Pomodoro
                  onTimeUp={() => setPomodoroPhase(PomodoroPhase.ShortBreak)}
                />
              );
            }
            case PomodoroPhase.ShortBreak: {
              return (
                <ShortBreak
                  onTimeUp={() => setPomodoroPhase(PomodoroPhase.Pomodoro)}
                />
              );
            }
            case PomodoroPhase.LongBreak:
            default: {
              return (
                <LongBreak
                  onTimeUp={() => setPomodoroPhase(PomodoroPhase.Pomodoro)}
                />
              );
            }
          }
        })()}
      </>
    );
  };
  return (
    <Drawer className={styles.drawer} visible={visible}>
      {renderBody()}
    </Drawer>
  );
}
