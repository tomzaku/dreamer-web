import React from 'react';
import Checkbox from '@moon-ui/checkbox';
import Typography from '@moon-ui/typography';
import TimerButton from '../../../TimerButton';

// Utils
import { getNextTaskStatus } from '../../util';
import cx from 'classnames';

// Hooks
import { detectMobile, useLongPress } from '@dreamer/global';
import { TaskStatus, useTask } from '@dreamer/tasks-page-common';
import { useIntl } from '@dreamer/translation';

// Enums
import { LongPressDetectEvents } from '@dreamer/global';

import styles from './index.module.scss';
import IconTrashBin from '@moon-ui/icon/IconTrashBin';
import IconCreate from '@moon-ui/icon/IconCreate';
import IconDrag from '@moon-ui/icon/IconDrag';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

type Props = {
  hasDivision: boolean;
  taskId: string;
  disabled?: boolean;
  onLongPress?: (taskId: string) => void;
  onClickEdit?: (taskId: string) => void;
  handlerBind: ReactDOMAttributes;
};

export default function CommonTaskItem({
  taskId,
  hasDivision,
  disabled,
  onLongPress,
  onClickEdit,
  handlerBind,
}: Props) {
  const { task, changeTaskStatus, deleteTask } = useTask();
  const intl = useIntl();
  const [isHover, setIsHover] = React.useState(false);

  if (!task) return null;

  const { duration, status, name, commit = 0 } = task[taskId];
  const projectName = 'Other';
  const nextStatus = getNextTaskStatus(status, { duration, commit });
  const cardLongPress = useLongPress(
    () => {
      onLongPress && onLongPress(taskId);
    },
    {
      detect: LongPressDetectEvents.TOUCH,
      cancelOnMovement: true,
      threshold: 250,
    }
  );
  return (
    <div
      {...cardLongPress()}
      onMouseEnter={() => !detectMobile() && setIsHover(true)}
      onMouseLeave={() => !detectMobile() && setIsHover(false)}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div {...handlerBind} className={styles.section}>
            <IconDrag
              onTouchStart={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={cx(styles.dragIcon)}
              onClick={e => e.preventDefault()}
            />
            <Typography.Title noMargin level={5}>
              {name}
            </Typography.Title>
          </div>
          {isHover && (
            <div className={styles.section}>
              <div
                onClick={() => onClickEdit && onClickEdit(taskId)}
                className={styles.actionContainer}
              >
                <IconCreate className={styles.icon} />
                <Typography.Text>
                  {intl.formatMessage({
                    id: 'label_edit',
                    defaultMessage: 'Edit',
                  })}
                </Typography.Text>
              </div>
              <div
                onClick={() => deleteTask(taskId)}
                className={styles.actionContainer}
              >
                <IconTrashBin className={styles.icon} />
                <Typography.Text>
                  {intl.formatMessage({
                    id: 'label_delete',
                    defaultMessage: 'Delete',
                  })}
                </Typography.Text>
              </div>
            </div>
          )}
        </div>
        <div className={styles.body}>
          <Typography.Paragraph
            className={styles.project}
            underline
            noMargin
            isDescription
          >{`#${projectName}`}</Typography.Paragraph>
          {duration ? (
            <TimerButton
              disabled={disabled}
              duration={duration}
              commit={commit}
              status={status}
              onClick={() => {
                nextStatus && changeTaskStatus(taskId, nextStatus);
              }}
            />
          ) : (
            <Checkbox
              disabled={disabled}
              className={styles.checkbox}
              checked={status === TaskStatus.Done}
              onChange={() => {
                nextStatus && changeTaskStatus(taskId, nextStatus);
              }}
              size="lg"
            />
          )}
        </div>
      </div>
      {hasDivision && <div className={styles.division} />}
    </div>
  );
}
