import React from 'react'
import cx from 'classnames';
import { Motion, spring } from 'react-motion';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
};
export default function Drawer({ children, visible, className }: Props) {
  const rendered = React.useRef(false)
  React.useEffect(() => {
    rendered.current = true
  }, [])
  return (
    <Motion
      key={visible ? '1' : '0'}
      defaultStyle={rendered.current ? {
        translateY: 0,
        opacity: 0,
      } : {}}
      style={{
        translateY: spring(100),
        opacity: spring(1),
      }}
    >
      {value => (
        <div
          className={cx(styles.container, className)}
          style={{
            transform: `translateY(${
              visible ? -value.translateY : value.translateY - 100
            }%)`,
            opacity: visible ? value.opacity: 1 - value.opacity,
          }}
        >
          {children}
        </div>
      )}
    </Motion>
  );
}
