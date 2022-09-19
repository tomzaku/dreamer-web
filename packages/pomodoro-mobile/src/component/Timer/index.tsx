import Typography from '@moon-ui/typography';

// Utils
import { formatMinuteAndSecond } from '@dreamer/tasks-page-common';

import styles from './index.module.scss'

export default function Timer({ time }: { time: number }) {
  return (
    <Typography.Title className={styles.time} level={1}>
      {formatMinuteAndSecond(time)}
    </Typography.Title>
  );
}

