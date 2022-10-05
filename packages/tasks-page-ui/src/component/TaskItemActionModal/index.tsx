import BottomModal from '@moon-ui/modal/src/BottomModal';
import Division from '@moon-ui/division';
import IconCreate from '@moon-ui/icon/IconCreate';
import IconTrashBin from '@moon-ui/icon/IconTrashBin';
import Typography from '@moon-ui/typography';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';
import { useIntl } from '@dreamer/translation';

import styles from './index.module.scss';

type Props = {
  taskId: string;
  visible: boolean;
  onDismiss: () => void;
};
const TaskItemActionModal = ({ taskId, visible, onDismiss }: Props) => {
  const { task, deleteTask } = useTask();
  const intl = useIntl();
  if (!task) return null;

  const { name } = task[taskId] || {};
  return (
    <BottomModal
      onDismiss={onDismiss}
      visible={visible}
      content={
        <div className={styles.container}>
          <Typography.Title level={4} className={styles.title}>
            Task name: {name}
          </Typography.Title>
          <Division />
          <div className={styles.body}>
            <div
              onClick={() => {
                deleteTask(taskId);
                onDismiss();
              }}
              className={styles.card}
            >
              <IconTrashBin className={styles.icon} />
              {intl.formatMessage({
                defaultMessage: 'Delete',
                id: 'label-delete',
              })}
            </div>
            <Division />
            <div
              onClick={() => {
                /* deleteTask(taskId); */
                onDismiss();
              }}
              className={styles.card}
            >
              <IconCreate className={styles.icon} />
              {intl.formatMessage({
                defaultMessage: 'Edit',
                id: 'label-Edit',
              })}
            </div>
            <Division />
          </div>
        </div>
      }
    />
  );
};

export default TaskItemActionModal;
