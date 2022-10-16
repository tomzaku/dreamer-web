// Components
import Button from '@moon-ui/button';

// Utils
import cx from 'classnames';

import styles from './index.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  isButton?: boolean;
  options: Option[];
  value?: string;
  onChangeValue?: (value: any) => void;
  classNameOption?: string;
  getClassNameActiveOption?: (option: Option) => string;
};
export default function Radio({
  isButton,
  options,
  value,
  onChangeValue,
  classNameOption,
  getClassNameActiveOption = () => '',
}: Props) {
  if (isButton) {
    return (
      <>
        {options.map(({ label: currentLabel, value: currentValue }, index) => {
          const isLeftActive = index > options.length - 1 && options[index + 1].value === value;
          const isRightActive =
            index > 0 && options[index -1].value === value;
          return (
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
                currentValue === value && styles.active,
                currentValue === value &&
                isLeftActive &&
                styles.leftActiveBorder,
                isRightActive && styles.rightActiveBorder,
                isRightActive &&
                index === options.length - 1 &&
                styles.rightActiveAndLastBorder,
                classNameOption,
                currentValue === value &&
                getClassNameActiveOption({
                  label: currentLabel,
                  value: currentValue,
                })
              )}
            >
              {currentLabel}
            </Button>
          );
        })}
      </>
    );
  }
  // TODO: Add the default radio
  return null;
}
