import Button from '@moon-ui/button';
import Typography from '@moon-ui/typography';

import millisecondsToMinutes from 'date-fns/millisecondsToMinutes';

import styles from './index.module.scss';

type Props = {
  title: string;
  duration?: number;
  project?: string;
  onCopy: () => void;
};

export default function RecommendedTaskItem({ project, title, onCopy, duration }: Props) {
  console.log("DURATION", duration)
  return (
    <div className={styles.container}>
      <Typography.Title level={5} noMargin>
        {title}
      </Typography.Title>
      <div className={styles.footer}>
        <Typography.Text>
          <Typography.Text
            className={styles.project}
            underline
            isDescription
          >{`#${project}`}</Typography.Text>
          {` `}
          {duration ? <Typography.Text
            className={styles.project}
            underline
            isDescription
          >{`#${millisecondsToMinutes(duration)}-minutes`}</Typography.Text> : ''}
        </Typography.Text>
        <Button type="ghost" size={'sm'} onClick={onCopy}>
          Copy
        </Button>
      </div>
    </div>
  );
}
