import cx from 'classnames';
import { useSpring, animated } from '@react-spring/web';

import styles from './index.module.scss';

const MAX_WIDTH = 26;
export default function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const animationStyles = useSpring({ translateX: checked ? MAX_WIDTH : 0 });

  return (
    <div
      className={cx(styles.container, checked && styles.checkedContainer)}
      onClick={() => onChange(!checked)}
    >
      <animated.div
        style={{
          transform: animationStyles.translateX.to(
            x => `translateX(${x}px)`
          )
        }}
        className={styles.handle}
      />
    </div>
  );
}
