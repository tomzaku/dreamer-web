import Drawer from '@moon-ui/drawer';
import { MobileHeader } from '@dreamer/header';
import Typography from '@moon-ui/typography';

import cx from 'classnames';

// Hooks
import { useIntl } from '@dreamer/translation';
import { useTask } from '@dreamer/tasks-page-common';

import styles from './index.module.scss';
import Pomodoro from './component/Pomodoro';

export default function PomodoroMobile({
  visible,
  onClickBackButton,
}: {
  visible: boolean;
  onClickBackButton?: () => void;
}) {
  const intl = useIntl();
  const { getTaskDetail, activeTaskId } = useTask();
  const task = activeTaskId && getTaskDetail(activeTaskId);

  if (!task) return null;
  return (
    <Drawer className={styles.drawer} visible={visible}>
      <MobileHeader
        onClickBackButton={onClickBackButton}
        title={intl.formatMessage({
          id: 'music-controller-mobile.label-pomodoro-title',
          defaultMessage: 'Pomodoro',
        })}
      />
      <div className={styles.body}>
        <div className={styles.tab}>
          <Typography.Text className={styles.tabName}>
            {intl.formatMessage({
              id: 'music-controller-mobile.label-pomodoro-tab',
              defaultMessage: 'Pomodoro',
            })}
          </Typography.Text>
          <Typography.Text className={cx(styles.tabName, styles.tabNameActive)}>
            {intl.formatMessage({
              id: 'music-controller-mobile.label-pomodoro-short-break',
              defaultMessage: 'Short Break',
            })}
          </Typography.Text>
          <Typography.Text className={styles.tabName}>
            {intl.formatMessage({
              id: 'music-controller-mobile.label-pomodoro-long-break',
              defaultMessage: 'Long Break',
            })}
          </Typography.Text>
        </div>
      </div>
      <Pomodoro />
    </Drawer>
  );
}


