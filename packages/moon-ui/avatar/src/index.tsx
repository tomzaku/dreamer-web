import cx from 'classnames';

import defaultImg from '../asserts/bee.png';
import styles from './index.module.scss';

export enum Size {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  size?: Size;
};

export default function Avatar({
  className,
  src = defaultImg,
  size,
  ...props
}: Props) {
  return (
    <img
      src={src}
      className={cx(size === Size.sm && styles.small, className)}
      {...props}
    />
  );
}
