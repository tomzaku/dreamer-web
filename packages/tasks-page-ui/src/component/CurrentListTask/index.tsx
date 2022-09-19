// Component
import CurrentTaskItem from '../CurrentTaskItem';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';
// Util
import cx from 'classnames';
import { useIntl } from 'react-intl';

// Enum
import { TaskStatus } from '@dreamer/tasks-page-common';

// Type
import { Paragraph } from '@moon-ui/typography';

import styles from './index.module.scss';

type Props = {
  className?: string;
};

export default function CurrentListTask({ className }: Props) {
  const intl = useIntl();
  const { currentTasks, activeTaskId } = useTask();
  return (
    <div className={cx(className)}>
      <Paragraph className={styles.title}>
        {intl.formatMessage({
          id: 'ListTask.label-your-list-tasks',
          defaultMessage: 'Your List Task',
        })}
      </Paragraph>
      <div className={styles.body}>
        {currentTasks.map(({ commit, id, name, duration, status }, index) => (
          <CurrentTaskItem
            key={id}
            title={name}
            taskId={id}
            commit={commit}
            // TODO: Add Project later
            project={'Other'}
            duration={duration}
            status={status}
            disabled={Boolean(activeTaskId && activeTaskId !== id)}
            hasDivision={
              status === TaskStatus.Processing || index !== currentTasks.length - 1
            }
          />
        ))}
      </div>
    </div>
  );
}

