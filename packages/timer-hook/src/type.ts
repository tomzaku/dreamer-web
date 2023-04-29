export type UseTimerOutput = {
  time: number;
  isPlaying: boolean;
  pause: () => void;
  start: () => void;
  stop: () => void;
}
