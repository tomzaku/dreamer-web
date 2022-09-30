import React from 'react';

// Utils
import { uniqueId, useLocalStorage } from '@dreamer/global';

// Context
import { TaskContext } from './context';

// Constants
import { TaskStatus } from './enum';

// Types
import { Task, TaskParams } from './type';

export const withTask = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function (props: P) {
    const [task, setTask] = useLocalStorage<Record<string, Task>>('tasks', {});
    const activeTask = React.useRef<Task>();
    const createTask = (newTask: TaskParams) => {
      const id = uniqueId();
      setTask({
        ...task,
        [id]: {
          ...newTask,
          status: TaskStatus.Pending,
          createdAt: new Date().toISOString(),
          id,
        },
      });
    };
    const orderedTasks = Object.values(task).sort((a, b) => {
      const aDate = a.createdAt && new Date(a.createdAt);
      const bDate = b.createdAt && new Date(b.createdAt);

      if (aDate && bDate) {
        return bDate.getTime() - aDate.getTime();
      }
      return 0;
    });

    const activeTaskId = Object.values(task).find(
      ({ status }) => status === TaskStatus.Processing
    )?.id;

    const currentTasks = activeTaskId
      ? [task[activeTaskId], ...orderedTasks.filter(t => t.id !== activeTaskId)]
      : orderedTasks;

    const changeTaskStatus = (taskId: string, newStatus: TaskStatus) => {
      setTask({
        ...task,
        [taskId]: {
          ...task[taskId],
          status: newStatus,
        },
      });
      if (
        activeTask.current?.id === taskId ||
        newStatus === TaskStatus.Processing
      ) {
        activeTask.current = {
          ...task[taskId],
          status: newStatus,
        };
      }
      if (newStatus === TaskStatus.Processing) {
        startTask(taskId);
      }
    };

    const getTaskDetail = (taskId: string) => task[taskId];

    const INTERVAL = 1000;
    const startTask = (taskId: string) => {
      // Commit Task to server every 5 seconds.
      const interval = setInterval(() => {
        if (activeTask.current?.status === TaskStatus.Processing) {
          setTask({
            ...task,
            [taskId]: {
              ...activeTask.current,
              commit: (activeTask.current.commit || 0) + INTERVAL,
            },
          });
          activeTask.current = {
            ...activeTask.current,
            commit: (activeTask.current.commit || 0) + INTERVAL,
          };
        } else {
          clearInterval(interval);
        }
      }, INTERVAL);
    };

    const cancelProcessingTask = () => {
      activeTaskId && changeTaskStatus(activeTaskId, TaskStatus.Pause);
    };

    const getRecommendedTasks = (text?: string) => {
      if (Object.values(task).length === 0) {
        return [
          {
            name: 'Read Hackernews',
            duration: 30 * 60 * 1000,
            projectId: '-999',
            status: TaskStatus.Pending,
            createdAt: '',
            project: 'Other',
            id: '-1',
          },
          {
            name: 'Learn piano',
            duration: 30 * 60 * 1000,
            projectId: '-999',
            status: TaskStatus.Pending,
            project: 'Other',
            createdAt: '',
            id: '-2',
          },
        ];
      }
      if (!text)
        return Object.values(task).map(t => ({ ...t, project: 'Other' }));
      return Object.values(task)
        .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
        .map(i => ({ ...i, project: 'Other' }));
    };

    return (
      <TaskContext.Provider
        value={{
          task,
          currentTasks,
          createTask,
          activeTaskId,
          changeTaskStatus,
          getTaskDetail,
          cancelProcessingTask,
          getRecommendedTasks,
        }}
      >
        <WrapComponent {...props} />
      </TaskContext.Provider>
    );
  };
};
