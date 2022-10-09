import React from 'react';

import Division from '@moon-ui/division';
import Typography from '@moon-ui/typography';

import styles from './Modal.module.scss';

type Props = {
  visible: boolean;
  title?: string;
  content?: React.ReactNode;
  onDismiss?: () => void;
};

export default function Modal({ visible, content, onDismiss, title }: Props) {
  if (!visible) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.container} onClick={e => {
        e.preventDefault();
        e.stopPropagation()
      }}>
          {title && (
            <>
              <Typography.Title level={3} className={styles.title} noMargin>
                {title}
              </Typography.Title>
              <Division />
            </>
          )}

          {content}
        </div>
      </div>
    </>
  );
}
