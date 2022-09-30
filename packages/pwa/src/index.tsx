import { useCallback } from 'react';
import { usePwa } from '@dotmind/react-use-pwa';

const PwaInstallation = () => {
  const { installPrompt, isInstalled, isStandalone, isOffline, canInstall } =
    usePwa();

  const handleInstallPrompt = useCallback(() => {
    if (canInstall) {
      installPrompt();
    }
  }, [canInstall, installPrompt]);

  if (isOffline) {
    return <p>Please check your network 📶</p>;
  }

  if (!isInstalled || !isStandalone) {
    return (
      null
    );
  }

  return null;
};

export default PwaInstallation;
