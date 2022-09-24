import cx from 'classnames';

import styles from './Paragraph.module.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
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
  ...restProps
}: Props) {
  return (
    <span
      className={cx(
        styles.default,
        isDescription && styles.description,
        underline && styles.underline,
        className
      )}
      {...restProps}
    >
      {children}
    </span>
  );
}
