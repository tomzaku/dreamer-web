import cx from 'classnames';

import styles from './Title.module.scss';

type Props = {
  level: 1 | 2 | 3 | 4 | 5;
  primary?: boolean;
  className?: string;
  children?: React.ReactNode;
  noMargin?: boolean;
  onClick?: () => void;
};
export default function Title({
  level,
  children,
  primary,
  noMargin,
  className,
  onClick,
}: Props) {
  const commonStyle = [
    styles.default,
    primary && styles.primary,
    noMargin && styles.noMargin,
    className,
  ];
  switch (level) {
    case 1:
      return <h1 onClick={onClick} className={cx(...commonStyle)}>{children}</h1>;
    case 2:
      return <h2 onClick={onClick} className={cx(...commonStyle)}>{children}</h2>;
    case 3:
      return <h3 onClick={onClick} className={cx(...commonStyle)}>{children}</h3>;
    case 4:
      return <h4 onClick={onClick} className={cx(...commonStyle)}>{children}</h4>;
    default:
      return <h5 onClick={onClick} className={cx(...commonStyle)}>{children}</h5>;
  }
}
