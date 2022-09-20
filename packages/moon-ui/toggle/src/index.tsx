import cx from 'classnames'
import { motion } from 'framer-motion';

import styles from './index.module.scss'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export default function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className={cx(styles.container, checked && styles.checkedContainer)} onClick={onChange}>
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  );
}
