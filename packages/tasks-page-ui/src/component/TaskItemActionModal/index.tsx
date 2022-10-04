import BottomModal from '@moon-ui/modal/src/BottomModal';
import Typography from '@moon-ui/typography';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';

import styles from './index.module.scss';
import Division from '@moon-ui/division';

type Props = {
  taskId: string;
  visible: boolean;
  onDismiss: () => void;
};
const TaskItemActionModal = ({ taskId, visible, onDismiss }: Props) => {
  const { task, deleteTask } = useTask();
  if (!task) return null;

  const { name } = task[taskId] || {};
  return (
    <BottomModal
      onDismiss={onDismiss}
      visible={visible}
      content={
        <div className={styles.container}>
          <Typography.Title level={4} className={styles.title}>
            {name}
          </Typography.Title>
          <Division />
          <div className={styles.body}>
            <div onClick={() => {
              deleteTask(taskId);
              onDismiss()
            }} className={styles.card}>Delete</div>
            <Division />
          </div>
        </div>
      }
    />
  );
};

export default TaskItemActionModal;
