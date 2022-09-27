import Checkbox from '@moon-ui/checkbox';
import IconLaunch from '@moon-ui/icon/IconLaunch';
import IconMoreVertical from '@moon-ui/icon/IconMoreVertical';
import TimerButton from '../TimerButton';
import Typography, { Paragraph, Title } from '@moon-ui/typography';
import { formatMinuteAndSecond, TaskStatus } from '@dreamer/tasks-page-common';

// Utils
import cx from 'classnames';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';

import styles from './index.module.scss';
import { useGlobalTool, GlobalTool } from '@dreamer/global-tool-common';

type Props = {
  title: string;
  project?: string;
  duration?: number;
  commit?: number;
  status: TaskStatus;
  disabled?: boolean;
  hasDivision: boolean;
  taskId: string;
};

const getNextTaskStatus = (
  currentTaskStatus: TaskStatus,
  { duration, commit }: { duration: number; commit: number }
) => {
  switch (currentTaskStatus) {
    case TaskStatus.Pending: {
      if (duration) {
        return TaskStatus.Processing;
      } else {
        return TaskStatus.Done;
      }
    }
    case TaskStatus.Processing: {
      if (commit >= duration) {
        return TaskStatus.Done;
      } else {
        return TaskStatus.Pause;
      }
    }
    case TaskStatus.Pause: {
      return TaskStatus.Processing;
    }
    case TaskStatus.Overdue:
    case TaskStatus.Done:
    case TaskStatus.Close:
    default:
      return null;
  }
};

export default function CurrentTaskItem({
  duration = 0,
  status,
  title,
  project,
  commit = 0,
  disabled,
  hasDivision,
  taskId,
}: Props) {
  const { changeTaskStatus } = useTask();
  const { open } = useGlobalTool();
  const nextStatus = getNextTaskStatus(status, { duration, commit });
  return (
    <div>
      <div className={cx(styles.container, disabled && styles.disabled)}>
        <div className={styles.header}>
          <Title noMargin level={5}>
            {title}
          </Title>
          <div className={styles.actionGroup}>
            {status === TaskStatus.Processing && (
              <>
                <div
                  onClick={() => open(GlobalTool.FocusMode)}
                  className={styles.actionButton}
                >
                  <IconLaunch className={styles.actionIcon} />
                  <Typography.Text className={styles.actionText}>
                    Focus
                  </Typography.Text>
                </div>
                <IconMoreVertical
                  className={styles.more}
                  width="20"
                  height="20"
                />
              </>
            )}
          </div>
        </div>
        {status !== TaskStatus.Processing && (
          <div className={styles.body}>
            <Paragraph
              className={styles.project}
              underline
              noMargin
              isDescription
            >{`#${project}`}</Paragraph>
            {duration ? (
              <TimerButton
                disabled={disabled}
                duration={duration}
                commit={commit}
                status={status}
                onClick={() => {
                  nextStatus && changeTaskStatus(taskId, nextStatus);
                }}
              />
            ) : (
              <Checkbox
                disabled={disabled}
                className={styles.checkbox}
                size="lg"
              />
            )}
          </div>
        )}
        {status === TaskStatus.Processing && (
          <div>
            <Paragraph
              className={styles.project}
              underline
              noMargin
              isDescription
            >{`#${project}`}</Paragraph>
            <div className={styles.bodyProcessing}>
              <Paragraph noMargin>{formatMinuteAndSecond(commit)}</Paragraph>
              {duration ? (
                <TimerButton
                  disabled={disabled}
                  duration={duration}
                  commit={commit}
                  status={status}
                  onClick={() => {
                    nextStatus && changeTaskStatus(taskId, nextStatus);
                  }}
                />
              ) : (
                <Checkbox
                  disabled={disabled}
                  className={styles.checkbox}
                  size="lg"
                />
              )}
            </div>
          </div>
        )}
      </div>
      {hasDivision && (
        <div
          className={
            status === TaskStatus.Processing ? styles.progress : styles.division
          }
          style={
            status !== TaskStatus.Processing
              ? {}
              : { width: `${Math.min((commit / duration) * 100, 100)}%` }
          }
        />
      )}
    </div>
  );
}
