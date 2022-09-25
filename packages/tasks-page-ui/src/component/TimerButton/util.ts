export const timeToDuration = (milliseconds: number) => {
  const seconds = milliseconds / 1000;
  if (seconds < 300) {
    return {
      seconds,
    };
  }
  const minutes = Math.round(seconds / 60);
  return {
    minutes,
  };
};
