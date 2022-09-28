import React from 'react';

import styles from './index.module.scss';

type Props = {
  visible: boolean;
  primaryButtonText: string;
  primaryButtonOnClick: () => void;
  secondaryButtonText: string;
  secondaryButtonClick: () => void;
  content?: React.ReactNode;
};

export default function Modal({ visible, content }: Props) {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.body}>{content}</div>
    </div>
  );
}
