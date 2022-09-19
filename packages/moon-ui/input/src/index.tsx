import cx from 'classnames';

import styles from './index.module.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  border?: 'dash' | 'solid';
};

export default function Input({ className, border, ...restProps }: Props) {
  return (
    <input
      className={cx(
        styles.container,
        border === 'dash' && styles.dash,
        border === 'solid' && styles.solid,
        className
      )}
      {...restProps}
    />
  );
}
