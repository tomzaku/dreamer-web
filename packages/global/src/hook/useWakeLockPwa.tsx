import React from 'react';

export const useWakeLockPwa = () => {
  const [isSupported, setIsSupported] = React.useState(false);
  const [activeWakeLock, setActiveWakeLock] = React.useState(false);

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        setIsSupported(true);
      } else {
        return null;
      }
      const wakeLock = await (navigator as any)?.wakeLock?.request('screen');
      setActiveWakeLock(true);
      wakeLock.release()
    } catch (err) {
      setActiveWakeLock(false);
    }
  };
  React.useEffect(() => {
    requestWakeLock();
  }, []);
  return {
    activeWakeLock,
    isSupported
  };
};
