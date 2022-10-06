import React from 'react';

// Component
import CurrentTaskItem from '../CurrentTaskItem';
import { Motion } from 'react-motion';
import TaskItemActionModal from '../TaskItemActionModal';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';
import { useIntl } from '@dreamer/translation';

// Util
import { spring } from 'react-motion';

// Type
import Typography from '@moon-ui/typography';

import styles from './index.module.scss';
import Checkbox from '@moon-ui/checkbox';
import EditTaskModal from '../EditTaskModal';

type Props = {
  className?: string;
};

export default function CurrentListTask({ className }: Props) {
  const intl = useIntl();
  const [modalMobileVisible, setModalMobileVisible] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState({ taskId: '' });
  const [modalEditTaskVisible, setModalEditTaskVisible] = React.useState(false);
  const { activeTaskId, currentTaskIds, filter, setFilter } = useTask();
  return (
    <div className={className}>
      <TaskItemActionModal
        visible={modalMobileVisible}
        taskId={modalInfo.taskId}
        onDismiss={() => setModalMobileVisible(false)}
        onClickEdit={() => setModalEditTaskVisible(true)} 
      />
      <EditTaskModal
        onDismiss={() => setModalEditTaskVisible(false)}
        visible={modalEditTaskVisible}
        taskId={modalInfo.taskId}
      />
      <div className={styles.header}>
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
              defaultMessage: 'Show Done Tasks',
            })}
          </Typography.Text>
        </div>
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
                onLongPress={taskId => {
                  setModalMobileVisible(true);
                  setModalInfo({ taskId });
                }}
                taskId={id}
                style={{
                  opacity: value.opacity,
                  transform: `scale(${value.scale})`,
                }}
                disabled={Boolean(activeTaskId && activeTaskId !== id)}
                hasDivision={index !== currentTaskIds.length - 1}
                onClickEdit={taskId => {
                  setModalEditTaskVisible(true);
                  setModalInfo({ taskId });
                }}
              />
            )}
          </Motion>
        ))}
      </div>
      {currentTaskIds.length === 0 && (
        <div className={styles.empty}>
          <Typography.Paragraph isDescription>
            {intl.formatMessage({
              id: 'msg_task_empty',
              defaultMessage: 'Your task is empty',
            })}
          </Typography.Paragraph>
        </div>
      )}
    </div>
  );
}
