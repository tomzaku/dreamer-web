import React from 'react'
import cx from 'classnames';
import { useSpring, animated } from '@react-spring/web';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
};

export default function Drawer({ children, visible, className }: Props) {
  const animationStyles = useSpring({ translateX: visible ? -100 : 0, opacity: visible ? 1 : 0 });
  return (
        <animated.div
          className={cx(styles.container, className)}
          style={{
            transform: animationStyles.translateX.to(x => `translateY(${x}%)`),
            opacity: animationStyles.opacity,
          }}
        >
          {children}
        </animated.div>
  );
}
