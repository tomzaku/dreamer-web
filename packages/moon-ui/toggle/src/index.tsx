import cx from 'classnames';
/* import { m, LazyMotion, domMax } from 'framer-motion'; */
import { Motion, spring } from 'react-motion';

import styles from './index.module.scss';

const MAX_WIDTH = 26;
export default function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      className={cx(styles.container, checked && styles.checkedContainer)}
      onClick={onChange}
    >
      <Motion
        defaultStyle={{ translateX: checked ? 0 : MAX_WIDTH }}
        style={{ translateX: spring(checked ? MAX_WIDTH : 0) }}
      >
        {value => (
          <div
            style={{
              transform: `translateX(${value.translateX}px)`,
            }}
            className={styles.handle}
          />
        )}
      </Motion>
    </div>
  );
}
