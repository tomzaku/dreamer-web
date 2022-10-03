import { TaskStatus } from '@dreamer/tasks-page-common';

export const getNextTaskStatus = (
  currentTaskStatus: TaskStatus,
  { duration = 0, commit }: { duration?: number; commit: number }
) => {
  switch (currentTaskStatus) {
    case TaskStatus.Pending: {
      if (duration) {
        return TaskStatus.Processing;
      } else {
        return TaskStatus.Done;
      }
    }
    case TaskStatus.Processing: {
      if (commit >= duration) {
        return TaskStatus.Done;
      } else {
        return TaskStatus.Pause;
      }
    }
    case TaskStatus.Pause: {
      return TaskStatus.Processing;
    }
    case TaskStatus.Overdue:
    case TaskStatus.Done:
    case TaskStatus.Close:
    default:
      return null;
  }
};
