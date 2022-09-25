import Typography from '@moon-ui/typography';

// Utils
import { formatMinuteAndSecond } from '@dreamer/tasks-page-common';
import cx from 'classnames'

import styles from './index.module.scss'

export default function Timer({ time, className }: { time: number, className?: string }) {
  return (
    <Typography.Title noMargin className={cx(styles.time, className)} level={1}>
      {formatMinuteAndSecond(time)}
    </Typography.Title>
  );
}

