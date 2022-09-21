import React from 'react';

import styles from './index.module.scss';

type Props = {
  max?: number;
  value?: number;
  onChange?: (value: number) => {};
};

export default function Slider({ value = 30, max = 100 }: Props) {
  const leftPercent = value;
  const rightPercent = max - value;
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div style={{ flex: leftPercent }} className={styles.leftHandle} />
        <div style={{ flex: rightPercent }} className={styles.rightHandle} />
      </div>
      <div style={{left: `calc(${leftPercent}% - 10px)`}} draggable className={styles.mark} />
    </div>
  );
}
