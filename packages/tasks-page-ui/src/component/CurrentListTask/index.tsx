// Component
import CurrentTaskItem from '../CurrentTaskItem';
import { Motion, spring } from 'react-motion';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';
// Util
import cx from 'classnames';
import { useIntl } from '@dreamer/translation';

// Enum
import { TaskStatus } from '@dreamer/tasks-page-common';

// Type
import Typography, { Paragraph } from '@moon-ui/typography';

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
          <Motion key={id} defaultStyle={{ opacity: 0, scale: 1.2 }} style={{ opacity: spring(1), scale: spring(1) }}>
            {value => (
              <CurrentTaskItem
                key={id}
                title={name}
                taskId={id}
                commit={commit}
                style={{
                  opacity: value.opacity,
                  transform: `scale(${value.scale})`
                }}
                // TODO: Add Project later
                project={'Other'}
                duration={duration}
                status={status}
                disabled={Boolean(activeTaskId && activeTaskId !== id)}
                hasDivision={
                  status === TaskStatus.Processing ||
                  index !== currentTasks.length - 1
                }
              />
            )}
          </Motion>
        ))}
      </div>
      {currentTasks.length === 0 && (
        <div className={styles.empty}>
          <Typography.Paragraph isDescription>
            Your task is empty
          </Typography.Paragraph>
        </div>
      )}
    </div>
  );
}
