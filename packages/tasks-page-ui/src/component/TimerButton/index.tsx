import { ActionButton } from '@moon-ui/button';
import IconPause from '@moon-ui/icon/IconPause';
import IconPlay from '@moon-ui/icon/IconPlay';
import IconCheck from '@moon-ui/icon/IconCheck';

// Enum
import { TaskStatus } from '@dreamer/tasks-page-common';

// Util
import { useIntl } from 'react-intl';
import { millisecondsToMinutes } from 'date-fns';

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
            : `${millisecondsToMinutes(duration - commit)} minutes remaining`}
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
          {`${millisecondsToMinutes(duration - commit)} minutes remaining`}
        </ActionButton>
      );
    }
  }
}
