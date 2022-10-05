import React from 'react';

import styles from './BottomModal.module.scss'

type Props = {
  visible: boolean;
  content?: React.ReactNode;
  onDismiss?: () => void;
};

export default function BottomModal({ visible, content, onDismiss }: Props) {
  if (!visible) return null;
  return <>
  <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.container}>{content}</div>
  </div>
  </>
}
