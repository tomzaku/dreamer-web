import PomodoroPlayer from '../../pomodoro-player-ui/src';
import CreateTask from './component/CreateTask';
import CurrentListTask from './component/CurrentListTask';

import styles from './index.module.scss';

export default function TaskPage() {
  return (
    <div className={styles.container}>
      <CreateTask className={styles.section} />
      <CurrentListTask className={styles.section} />
      <PomodoroPlayer />
    </div>
  );
}
