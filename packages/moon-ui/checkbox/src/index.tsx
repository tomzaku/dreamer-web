import cx from 'classnames';
import style from './index.module.scss';

type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'size'
> & {
  size?: 'md' | 'lg';
};

export default function Checkbox({ size, className, disabled }: Props) {
  return (
    <input
      className={cx(style.container, size === 'lg' && style.lg, className)}
      type="checkbox"
      disabled={disabled}
    />
  );
}
