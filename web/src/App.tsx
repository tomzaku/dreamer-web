import AppRouter from '@dreamer/route';
import { withTranslation } from '@dreamer/translation';

import './normalize.css';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <AppRouter />
    </div>
  );
}

export default withTranslation(App);
