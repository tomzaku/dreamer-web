import { TaskStatus } from '@dreamer/tasks-page-common';
import CurrentProcessTaskItem from './components/CurrentProcessTaskItem';
import CommonTaskItem from './components/CommonTaskItem';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';

// Utils
import cx from 'classnames';

import styles from './index.module.scss';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

type Props = {
  disabled?: boolean;
  hasDivision: boolean;
  taskId: string;
  style?: React.CSSProperties;
  onLongPress?: (taskId: string) => void;
  onClickEdit?: (taskId: string) => void;
  handlerBind: ReactDOMAttributes;
};

export default function CurrentTaskItem({
  disabled,
  hasDivision,
  taskId,
  style,
  onLongPress,
  onClickEdit,
  handlerBind,
}: Props) {
  const { task } = useTask();
  if (!task || !task[taskId]) return null;
  const { status } = task[taskId];
  return (
    <div
      className={cx(styles.container, disabled && styles.disabled)}
      style={style}
    >
      {status === TaskStatus.Processing ? (
        <CurrentProcessTaskItem taskId={taskId} disabled={disabled} />
      ) : (
        <CommonTaskItem
          disabled={disabled}
          handlerBind={handlerBind}
          hasDivision={hasDivision}
          taskId={taskId}
          onLongPress={onLongPress}
          onClickEdit={onClickEdit}
        />
      )}
    </div>
  );
}
