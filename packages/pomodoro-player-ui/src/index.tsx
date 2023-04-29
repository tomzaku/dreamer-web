// Hooks
import { usePomodoroTimer } from '@dreamer/pomodoro-common';

const PomodoroPlayer = () => {
  const { pomodoroTimer, shortBreakTimer, longBreakTimer } = usePomodoroTimer()
  // console.log(">>>>", pomodoroTimer, shortBreakTimer, longBreakTimer)
  return null

}

export default PomodoroPlayer
