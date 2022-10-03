// Component
import CurrentTaskItem from '../CurrentTaskItem';
import { Motion } from 'react-motion';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';
import { useIntl } from '@dreamer/translation';

// Util
import cx from 'classnames';
import { spring } from 'react-motion';

// Type
import Typography from '@moon-ui/typography';

import styles from './index.module.scss';
import Checkbox from '@moon-ui/checkbox';

type Props = {
  className?: string;
};

export default function CurrentListTask({ className }: Props) {
  const intl = useIntl();
  const { activeTaskId, currentTaskIds, filter, setFilter } = useTask();
  return (
    <div className={className}>
      <Typography.Paragraph noMargin>
        {intl.formatMessage({
          id: 'ListTask.label-your-list-tasks',
          defaultMessage: 'Your List Task',
        })}
      </Typography.Paragraph>
      <div className={styles.heading}>
        <Checkbox
          checked={filter.showDoneTask}
          onChange={() => {
            setFilter({
              ...filter,
              showDoneTask: !filter.showDoneTask,
            });
          }}
        />
        <Typography.Text isDescription>
          {intl.formatMessage({
            id: 'ListTask.label-show-done-task',
            defaultMessage: 'Show Done Task',
          })}
        </Typography.Text>
      </div>
      <div className={styles.body}>
        {currentTaskIds.map((id, index) => (
          <Motion
            key={id}
            defaultStyle={{ opacity: 0, scale: 1.2 }}
            style={{ opacity: spring(1), scale: spring(1) }}
          >
            {value => (
              <CurrentTaskItem
                key={id}
                taskId={id}
                style={{
                  opacity: value.opacity,
                  transform: `scale(${value.scale})`,
                }}
                disabled={Boolean(activeTaskId && activeTaskId !== id)}
                hasDivision={index !== currentTaskIds.length - 1}
              />
            )}
          </Motion>
        ))}
      </div>
      {currentTaskIds.length === 0 && (
        <div className={styles.empty}>
          <Typography.Paragraph isDescription>
            Your task is empty
          </Typography.Paragraph>
        </div>
      )}
    </div>
  );
}
