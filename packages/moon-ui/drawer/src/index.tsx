import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
};
export default function Drawer({ children, visible, className }: Props) {
  return (
    <div className={cx(styles.container,className, !visible && styles.hidden)}>
      {children}
    </div>
  );
}

