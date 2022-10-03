import Checkbox from '@moon-ui/checkbox';
import Typography from '@moon-ui/typography';
import TimerButton from '../../../TimerButton';

// Utils
import { getNextTaskStatus } from '../../util';

// Hooks
import { useGlobalTool } from '@dreamer/global-tool-common';
import { TaskStatus, useTask } from '@dreamer/tasks-page-common';

import styles from './index.module.scss';

type Props = {
  hasDivision: boolean;
  taskId: string;
  disabled?: boolean;
};

export default function CommonTaskItem({
  taskId,
  hasDivision,
  disabled,
}: Props) {
  const { task, changeTaskStatus } = useTask();
  const { open } = useGlobalTool();

  if (!task) return null;

  const { duration, status, name, commit = 0 } = task[taskId];
  const projectName = 'Other';
  const nextStatus = getNextTaskStatus(status, { duration, commit });
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography.Title noMargin level={5}>
            {name}
          </Typography.Title>
        </div>
        <div className={styles.body}>
          <Typography.Paragraph
            className={styles.project}
            underline
            noMargin
            isDescription
          >{`#${projectName}`}</Typography.Paragraph>
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
              checked={status === TaskStatus.Done}
              onChange={() => {
                nextStatus && changeTaskStatus(taskId, nextStatus);
              }}
              size="lg"
            />
          )}
        </div>
      </div>
      {hasDivision && <div className={styles.division} />}
    </div>
  );
}
