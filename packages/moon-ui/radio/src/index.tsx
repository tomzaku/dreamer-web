// Components
import Button from '@moon-ui/button';

// Utils
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  isButton?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChangeValue?: (value: any) => void;
};
export default function Radio({
  isButton,
  options,
  value,
  onChangeValue,
}: Props) {
  if (isButton) {
    return (
      <>
        {options.map(({ label: currentLabel, value: currentValue }, index) => (
          <Button
            key={`${value}-${index}`}
            type="ghost"
            size="md"
            onClick={() => onChangeValue && onChangeValue(currentValue)}
            className={cx(
              styles.button,
              index === 0 && styles.firstButton,
              index === options.length - 1 && styles.lastButton,
              index !== options.length - 1 &&
                index !== 0 &&
                styles.middleButton,
              currentValue === value && styles.active
            )}
          >
            {currentLabel}
          </Button>
        ))}
      </>
    );
  }
  // TODO: Add the default radio
  return null;
}
