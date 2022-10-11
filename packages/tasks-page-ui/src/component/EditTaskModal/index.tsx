import React from 'react';

import Modal from '@moon-ui/modal/src/Modal';
import Input from '@moon-ui/input';
import TextareaAutosize from 'react-textarea-autosize';

// Hooks
import { useIntl } from '@dreamer/translation';
import { useTask } from '@dreamer/tasks-page-common';
import Button from '@moon-ui/button/src/DefaultButton';

import styles from './index.module.scss';
import Typography from '@moon-ui/typography';
import ReactTextareaAutosize from 'react-textarea-autosize';

type Props = {
  visible: boolean;
  taskId: string;
  onDismiss?: () => void;
};

export const ONE_MINUTE = 60 * 1000;

export default function EditTaskModal({ visible, taskId, onDismiss }: Props) {
  const intl = useIntl();
  const { task, updateTask } = useTask();
  if (!task) return null;
  const taskDetail = task[taskId] || {};
  const [name, setName] = React.useState(taskDetail.name);
  const [duration, setDuration] = React.useState(
    (taskDetail.duration || 0) / ONE_MINUTE
  );
  React.useEffect(() => {
    setName(taskDetail.name);
    setDuration((taskDetail.duration || 0) / ONE_MINUTE);
  }, [taskDetail]);
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      title={intl.formatMessage({
        id: 'label_edit_task',
        defaultMessage: 'EDIT TASK',
      })}
      content={
        <div>
          <div className={styles.item}>
          <Typography.Text isDescription>Name:</Typography.Text>
            <ReactTextareaAutosize
              value={name}
              maxRows={3}
              onChange={e => setName(e.currentTarget.value)}
              className={styles.nameInput}
            />
          </div>
          <div>
          <Typography.Text isDescription>Duration:</Typography.Text>
          <br />
            <Input
              type="number"
              border="dash"
              value={duration}
              className={styles.durationInput}
              onChange={e =>
                setDuration(parseInt(e.currentTarget.value || '0', 10))
              }
            />
            <Typography.Text>
              {intl.formatMessage({
                id: 'label_minutes',
                defaultMessage: 'minutes',
              })}
            </Typography.Text>
          </div>
          <Button
            size="lg"
            onClick={() => {
              updateTask(taskId, {
                ...taskDetail,
                name,
                duration: duration * ONE_MINUTE,
              });
              onDismiss && onDismiss();
            }}
            className={styles.submitButton}
          >
            {intl.formatMessage({
              id: 'label_save',
              defaultMessage: 'Save',
            })}
          </Button>
        </div>
      }
    />
  );
}
