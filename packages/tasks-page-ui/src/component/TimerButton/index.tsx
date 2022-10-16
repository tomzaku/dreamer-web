import { ActionButton } from '@moon-ui/button';
import IconPause from '@moon-ui/icon/IconPause';
import IconPlay from '@moon-ui/icon/IconPlay';
import IconCheck from '@moon-ui/icon/IconCheck';

// Enum
import { TaskStatus } from '@dreamer/tasks-page-common';

// Util
import { useIntl } from '@dreamer/translation';
import millisecondsToMinutes from 'date-fns/millisecondsToMinutes';
import formatDuration from 'date-fns/formatDuration';
import { timeToDuration } from './util';

type Props = {
  duration: number;
  commit?: number;
  disabled?: boolean;
  status: TaskStatus;
  onClick?: () => void;
};

export default function TimerButton({
  duration,
  commit = 0,
  status,
  disabled,
  onClick,
}: Props) {
  const intl = useIntl();
  switch (status) {
    case TaskStatus.Done: {
      return (
        <ActionButton
          type={'success'}
          leftIcon={null}
          rightIcon={<IconCheck height="20" />}
          disabled={disabled}
          onClick={onClick}
        >
          {intl.formatMessage({
            id: 'TimerButton.label-done',
            defaultMessage: 'Done',
          })}
        </ActionButton>
      );
    }
    case TaskStatus.Processing: {
      const done = commit > duration;
      return (
        <ActionButton
          type={done ? 'success' : 'processing'}
          leftIcon={null}
          rightIcon={<IconPause height="20" />}
          disabled={disabled}
          onClick={onClick}
        >
          {done
            ? intl.formatMessage({
              id: 'TimerButton.label-done',
              defaultMessage: 'Done',
            })
            : `${formatDuration(timeToDuration(duration - commit))}`}
        </ActionButton>
      );
    }
    case TaskStatus.Pending: {
      return (
        <ActionButton
          disabled={disabled}
          type={'pending'}
          leftIcon={null}
          rightIcon={<IconPlay height="20" />}
          onClick={onClick}
        >
          {`${millisecondsToMinutes(duration - commit)} minutes`}
        </ActionButton>
      );
    }
    default: {
      return (
        <ActionButton
          disabled={disabled}
          type={'pending'}
          leftIcon={null}
          rightIcon={<IconPlay height="20" />}
          onClick={onClick}
        >
          {`${formatDuration(timeToDuration(duration - commit))}`}
        </ActionButton>
      );
    }
  }
}
