import Button from '@moon-ui/button';
import Typography from '@moon-ui/typography';

import styles from './index.module.scss';

type Props = {
  title: string;
  /* duration: number; */
  project: string;
};

export default function RecommendedTaskItem({ project, title }: Props) {
  return (
    <div className={styles.container}>
      <Typography.Title level={5} noMargin>
        {title}
      </Typography.Title>
      <div className={styles.footer}>
        <Typography.Text
          className={styles.project}
          underline
          isDescription
        >{`#${project}`}</Typography.Text>
        <Button type="ghost" size={'sm'}>
          Copy
        </Button>
      </div>
    </div>
  );
}
