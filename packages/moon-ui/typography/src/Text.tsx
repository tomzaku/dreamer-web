import cx from 'classnames';

import styles from './Paragraph.module.scss';

type Props = {
  children?: React.ReactNode;
  isDescription?: boolean;
  underline?: boolean;
  className?: string;
};

export default function Text({
  children,
  isDescription,
  underline,
  className,
}: Props) {
  return (
    <span
      className={cx(
        styles.default,
        isDescription && styles.description,
        underline && styles.underline,
        className
      )}
    >
      {children}
    </span>
  );
}
