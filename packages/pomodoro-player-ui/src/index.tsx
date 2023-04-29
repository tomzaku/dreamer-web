// Hooks
import { usePomodoro } from '@dreamer/pomodoro-common';
import { useTimer } from '@dreamer/timer-hook';

const PomodoroPlayer = () => {
  const { pomodoro: duration } = usePomodoro()
  // const timer = useTimer({ duration });
  return null

}

export default PomodoroPlayer
