import CreateTask from './component/CreateTask';
import CurrentListTask from './component/CurrentListTask';

import styles from './index.module.scss';

export default function TaskPage() {
  return (
    <div>
      <CreateTask className={styles.section} />
      <CurrentListTask className={styles.section} />
    </div>
  );
}
