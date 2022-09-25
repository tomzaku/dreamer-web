import Button from '@moon-ui/button';
import Typography from '@moon-ui/typography';

import { useTask } from '@dreamer/tasks-page-common';

import styles from './index.module.scss';

export default function SelectTask() {
  const { getTaskDetail, activeTaskId } = useTask();
  const task = activeTaskId && getTaskDetail(activeTaskId);
  return (
    <div className={styles.container}>
      {task && (
        <Typography.Title noMargin level={3} className={styles.task}>
          {task.name}
        </Typography.Title>
      )}
      <Button className={styles.addTaskButton} type="dash" size="lg" block>
        Select task
      </Button>
    </div>
  );
}
