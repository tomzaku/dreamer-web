import styles from './index.module.scss';

import Typography from '@moon-ui/typography';
import IconMoreVertical from '@moon-ui/icon/IconMoreVertical';
import IconLaunch from '@moon-ui/icon/IconLaunch';
import TimerButton from '../../../TimerButton';

// Utils
import {
  EisenhowerMatrix,
  formatMinuteAndSecond,
} from '@dreamer/tasks-page-common';
import { getNextTaskStatus } from '../../util';
import cx from 'classnames';

// Enums
import { GlobalTool } from '@dreamer/global-tool-common';

// Hooks
import { useGlobalTool } from '@dreamer/global-tool-common';
import { useTask } from '@dreamer/tasks-page-common';
import { useIntl } from '@dreamer/translation';
import IconDrag from '@moon-ui/icon/IconDrag';

type Props = {
  disabled?: boolean;
  taskId: string;
};

export default function CurrentProcessTaskItem({ taskId, disabled }: Props) {
  const { task, changeTaskStatus } = useTask();
  const intl = useIntl();
  const { open } = useGlobalTool();

  if (!task) return null;

  const { duration, eisenhowerMatrix, status, name, commit = 0 } = task[taskId];
  const projectName = 'Other';

  if (!duration) return null;

  const eisenhowerMatrixBarStyle = {
    [EisenhowerMatrix.Do]: styles.do,
    [EisenhowerMatrix.Schedule]: styles.schedule,
    [EisenhowerMatrix.Delegate]: styles.delegate,
    [EisenhowerMatrix.Eliminate]: styles.eliminate,
  };
  const nextStatus = getNextTaskStatus(status, { duration, commit });
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div
          className={cx(
            styles.bar,
            eisenhowerMatrix && eisenhowerMatrixBarStyle[eisenhowerMatrix]
          )}
        />
        <div className={styles.main}>
          <div className={styles.header}>
            <div
              className={styles.section}
            >
          
            <IconDrag className={cx(styles.dragIcon)} />
            <Typography.Title noMargin level={5}>
              {name}
            </Typography.Title>
            </div>
            <div className={styles.actionGroup}>
              <div
                onClick={() => open(GlobalTool.FocusMode)}
                className={styles.actionButton}
              >
                <IconLaunch className={styles.actionIcon} />
                <Typography.Text className={styles.actionText}>
                  {intl.formatMessage({
                    defaultMessage: 'Focus',
                    id: 'label-focus',
                  })}
                </Typography.Text>
              </div>
              {/* <IconMoreVertical */}
              {/*   className={styles.more} */}
              {/*   width="20" */}
              {/*   height="20" */}
              {/* /> */}
            </div>
          </div>
            <div className={styles.bodyProcessing}>
              <Typography.Paragraph noMargin>
                {formatMinuteAndSecond(commit)}
              </Typography.Paragraph>
              <TimerButton
                disabled={disabled}
                duration={duration}
                commit={commit}
                status={status}
                onClick={() => {
                  nextStatus && changeTaskStatus(taskId, nextStatus);
                }}
              />
          </div>
          <div
            className={styles.progress}
            style={{ width: `${Math.min((commit / duration) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
