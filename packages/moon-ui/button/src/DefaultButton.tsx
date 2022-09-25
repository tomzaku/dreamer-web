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
  type?: 'primary' | 'ghost' | 'dash';
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  children?: React.ReactNode;
};

export default function Button({
  onClick,
  children,
  type,
  className,
  block,
  size,
  ...props
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cx(
        styles.default,
        type === 'ghost' && styles.ghost,
        type === 'dash' && styles.dash,
        block && styles.block,
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
