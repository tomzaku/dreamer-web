import styles from './index.module.scss';

import Typography from '@moon-ui/typography';
import IconMoreVertical from '@moon-ui/icon/IconMoreVertical';
import IconLaunch from '@moon-ui/icon/IconLaunch';
import TimerButton from '../../../TimerButton';

// Utils
import { formatMinuteAndSecond } from '@dreamer/tasks-page-common';
import { getNextTaskStatus } from '../../util';

// Enums
import { GlobalTool } from '@dreamer/global-tool-common';

// Hooks
import { useGlobalTool } from '@dreamer/global-tool-common';
import { useTask } from '@dreamer/tasks-page-common';
import { useIntl } from '@dreamer/translation';

type Props = {
  disabled?: boolean;
  taskId: string;
};

export default function CurrentProcessTaskItem({ taskId, disabled }: Props) {
  const { task, changeTaskStatus } = useTask();
  const intl = useIntl();
  const { open } = useGlobalTool();

  if (!task) return null;

  const { duration, status, name, commit = 0 } = task[taskId];
  const projectName = 'Other';

  if (!duration) return null;

  const nextStatus = getNextTaskStatus(status, { duration, commit });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title noMargin level={5}>
          {name}
        </Typography.Title>
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
          <IconMoreVertical className={styles.more} width="20" height="20" />
        </div>
      </div>
      <div>
        <Typography.Paragraph
          className={styles.project}
          underline
          noMargin
          isDescription
        >{`#${projectName}`}</Typography.Paragraph>
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
      </div>
      <div
        className={styles.progress}
        style={{ width: `${Math.min((commit / duration) * 100, 100)}%` }}
      />
    </div>
  );
}