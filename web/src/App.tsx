import AppRouter from '@dreamer/route';
import { withTranslation } from '@dreamer/translation';

import './normalize.css';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <AppRouter />
      </div>
    </div>
  );
}

export default withTranslation(App);
