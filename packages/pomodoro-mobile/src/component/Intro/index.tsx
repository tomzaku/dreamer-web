import IconBack from '@moon-ui/icon/IconBack';
import ChristmasTreeImg from '@dreamer/global/assert/image/christmas-tree.png';
import Typography from '@moon-ui/typography';
import Timer from '../Timer';

// Hooks
import styles from './index.module.scss';
import SelectTask from '../SelectTask';
import SlideToPass from '@dreamer/slide-to-pass';

type Props = {
  onClickBackButton?: () => void;
  onSubmit: () => void;
};
export default function Intro({ onClickBackButton, onSubmit }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.headerBackground} />
        <IconBack className={styles.icon} onClick={onClickBackButton} />
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
        <Timer className={styles.time} time={25000} />
        <SelectTask />
      </div>
      <div className={styles.footer}>
        <SlideToPass text="Let's start" onSuccess={onSubmit} />
      </div>
    </div>
  );
}
