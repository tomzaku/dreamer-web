import { TaskStatus } from '@dreamer/tasks-page-common';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';

import CurrentProcessTaskItem from './components/CurrentProcessTaskItem';
import CommonTaskItem from './components/CommonTaskItem';

type Props = {
  disabled?: boolean;
  hasDivision: boolean;
  taskId: string;
  style?: React.CSSProperties;
};

export default function CurrentTaskItem({
  disabled,
  hasDivision,
  taskId,
  style,
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
        />
      )}
    </div>
  );
}
