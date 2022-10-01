/// <reference types="vite-plugin-pwa/client" />
import styles from './index.module.scss';
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  console.log(">offlineReady", offlineReady, needRefresh,)
  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className={styles.container}>
      {(offlineReady || needRefresh) && (
        <div className={styles.toast}>
          <div className={styles.toastMessage}>
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className={styles.toastButton}
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className={styles.toastButton} onClick={() => close()}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ReloadPrompt;
