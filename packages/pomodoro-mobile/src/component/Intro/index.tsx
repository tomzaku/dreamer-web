import ChristmasTreeImg from '@dreamer/global/assert/image/christmas-tree.png';
import Typography from '@moon-ui/typography';
import Timer from '../Timer';
import SelectTask from '../SelectTask';
import SlideToPass from '@dreamer/slide-to-pass';

import styles from './index.module.scss';

// Hooks
import { usePomodoroGlobalConfig } from '@dreamer/pomodoro-common';

// Constants
import Header from '../Header';

type Props = {
  onClickBackButton?: () => void;
  onSubmit: () => void;
};

export default function Intro({ onClickBackButton, onSubmit }: Props) {
  const { pomodoro: duration } = usePomodoroGlobalConfig()
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {/* <div className={styles.headerBackground} /> */}
        <Header onClickBackButton={onClickBackButton} />
        <div className={styles.imgContainer}>
          <img src={ChristmasTreeImg} className={styles.christmasTree} />
          <Typography.Paragraph
            className={styles.text}
            noMargin
            bold
            isDescription
          >
            Christmas is Coming
          </Typography.Paragraph>
          <Typography.Paragraph className={styles.text} noMargin isDescription>
            Grow your tree
          </Typography.Paragraph>
        </div>
        <Timer className={styles.time} time={duration} />
        <SelectTask />
      </div>
      <div className={styles.footer}>
        <SlideToPass text="Let's start" onSuccess={onSubmit} />
      </div>
    </div>
  );
}
