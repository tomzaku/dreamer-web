import Typography from '@moon-ui/typography';
import Toggle from '@moon-ui/toggle';

import styles from './index.module.scss';

type Props = {
  logo: React.ReactNode;
  title: string;
  active: boolean;
  onChange: () => void;
};

export default function SoundItem({ logo, title, active, onChange }: Props) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {logo}
          <Typography.Paragraph className={styles.title}>
            {title}
          </Typography.Paragraph>
        </div>
        <Toggle checked={active} onChange={onChange} />
      </div>
    </div>
  );
}
