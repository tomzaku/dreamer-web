
import { TaskStatus } from '@dreamer/tasks-page-common';
import CurrentProcessTaskItem from './components/CurrentProcessTaskItem';
import CommonTaskItem from './components/CommonTaskItem';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';


type Props = {
  disabled?: boolean;
  hasDivision: boolean;
  taskId: string;
  style?: React.CSSProperties;
  onLongPress?: (taskId: string) => void;
};

export default function CurrentTaskItem({
  disabled,
  hasDivision,
  taskId,
  style,
  onLongPress
}: Props) {
  const { task } = useTask();
  if (!task) return null;
  const { status } = task[taskId];
  return (
    <div style={style}>
      {status === TaskStatus.Processing ? (
        <CurrentProcessTaskItem taskId={taskId} disabled={disabled} />
      ) : (
        <CommonTaskItem
          disabled={disabled}
          hasDivision={hasDivision}
          taskId={taskId}
          onLongPress={onLongPress}
        />
      )}
    </div>
  );
}
