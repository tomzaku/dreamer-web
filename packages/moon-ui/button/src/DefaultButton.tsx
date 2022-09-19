import cx from 'classnames';

import styles from './DefaultButton.module.scss';

export type DefaultButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'type'
> & {
  disabled?: boolean;
  type?: 'primary' | 'ghost';
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
};

export default function Button({
  onClick,
  children,
  type,
  className,
  size,
  ...props
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cx(
        styles.default,
        type === 'ghost' && styles.ghost,
        size === 'sm' && styles.sm,
        size === 'lg' && styles.lg,
        size === 'md' && styles.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
