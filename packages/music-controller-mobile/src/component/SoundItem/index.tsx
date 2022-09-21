import Typography from '@moon-ui/typography';
import Toggle from '@moon-ui/toggle';
import Slider from '@moon-ui/slider';

import styles from './index.module.scss';

type Props = {
  logo: React.ReactNode;
  title: string;
  active: boolean;
  onChange: () => void;
  volume?: number;
  onChangeVolume: (volume: number) => void;
};

export default function SoundItem({
  logo,
  title,
  active,
  onChange,
  volume = 0,
  onChangeVolume,
}: Props) {
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
      {active && (
        <div className={styles.slider}>
          <Slider
            min={0}
            max={100}
            value={volume * 100}
            onChange={volume => {
              if (typeof volume === 'number') {
                onChangeVolume(volume / 100);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
