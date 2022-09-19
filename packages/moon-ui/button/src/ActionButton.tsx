import Button, { DefaultButtonProps } from './DefaultButton';

import cx from 'classnames';

import styles from './ActionButton.module.scss';

type Props = Omit<DefaultButtonProps, 'type'> & {
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  type: 'processing' | 'pending' | 'success';
};

export default function ActionButton({
  children,
  type,
  className,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: Props) {
  return (
    <Button
      className={cx(
        styles.container,
        type === 'success' && styles.success,
        type === 'pending' && styles.pending,
        type === 'processing' && styles.processing,
        disabled && styles.disabled,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon}
      <div className={styles.body}>{children}</div>
      <div className={styles.verticalLine} />
      {rightIcon}
    </Button>
  );
}
