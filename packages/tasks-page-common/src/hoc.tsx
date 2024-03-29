import React from 'react';

// Utils
import { pipe, uniqueId, useLocalStorage } from '@dreamer/global';
import getDay from 'date-fns/getDay';
import isToday from 'date-fns/isToday';

// Context
import { TaskContext } from './context';

// Enums
import { TaskStatus } from './enum';

// Constants
import { DAYS } from './constant';

// Types
import { Filter, ListTask, Task, TaskParams } from './type';

const sortTasks = (tasks: Task[]) => {
  return tasks.sort((a, b) => {
    const aDate = a.createdAt && new Date(a.createdAt);
    const bDate = b.createdAt && new Date(b.createdAt);

    if (aDate && bDate) {
      return bDate.getTime() - aDate.getTime();
    }
    return 0;
  });
};

const getTaskIds = (task: Task[]) => task.map(t => t.id);

export const withTask = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function(props: P) {
    const [task, setTask] = useLocalStorage<ListTask>('tasks', {});
    const [saveCurrentTaskIds, setSavedCurrentTaskIds] = useLocalStorage<string[]>(
      'currentTasksIds',
      pipe<string[]>(sortTasks, getTaskIds)(Object.values(task || {}))
    );
    const [filter, setFilter] = React.useState<Filter>({
      showDoneTask: false,
      disableAddProgressTaskAtTop: false,
      showAllTask: false
    });
    // This to get the true data when run setInterval
    const activeTask = React.useRef<Task>();
    const createTask = (newTask: TaskParams) => {
      const id = uniqueId();
      setTask({
        ...task,
        [id]: {
          ...newTask,
          status: TaskStatus.Pending,
          createdAt: new Date().toISOString(),
          eisenhowerMatrix: newTask.eisenhowerMatrix,
          id,
        },
      });
      setSavedCurrentTaskIds([id, ...saveCurrentTaskIds]);
    };

    const activeTaskId = Object.values(task).find(
      ({ status }) => status === TaskStatus.Processing
    )?.id;

    const addProgressTaskAtTop = (tasks: Task[]) => {
      if (filter.disableAddProgressTaskAtTop) return task;
      return activeTaskId
        ? [task[activeTaskId], ...tasks.filter(t => t.id !== activeTaskId)]
        : tasks;
    };
    const removeDoneTask = (tasks: Task[]) => {
      if (filter.showDoneTask) return tasks;
      return tasks.filter(t => t.status !== TaskStatus.Done);
    };

    const addAllTask = (tasks: Task[]) => {
      if (!filter.showAllTask) return tasks
      return Object.values(task)
    }

    const getCurrentTaskIds = (tasks: Task[]) => {
      return pipe<string[]>(
        addProgressTaskAtTop,
        removeDoneTask,
        addAllTask,
        getTaskIds
      )(tasks);
    };

    const changeTaskStatus = (taskId: string, newStatus: TaskStatus) => {
      setTask({
        ...task,
        [taskId]: {
          ...task[taskId],
          status: newStatus,
          statusHistory: [
            ...(task[taskId].statusHistory || []),
            {
              from: task[taskId].status,
              to: newStatus,
              createdAt: new Date(),
            },
          ],
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

    const deleteTask = (taskId: string) => {
      const { [taskId]: _, ...restTask } = task;
      setTask(restTask);
      setSavedCurrentTaskIds(saveCurrentTaskIds.filter(id => id !== taskId));
    };

    const updateTask = (taskId: string, data: Task) => {
      setTask({
        ...task,
        [taskId]: data,
      });
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
      if (!text) return [];
      return Object.values(task)
        .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
        .map(i => ({ ...i, project: 'Other' }));
    };

    const getTasksHasTodayHobby = (tasks: Task[]) => {
      return tasks.filter(
        task =>
          task.weeklyHobbies &&
          task.weeklyHobbies.length > 0 &&
          task.weeklyHobbies.includes(DAYS[getDay(new Date())])
      );
    };
    const getTaskDone = (tasks: Task[]) => {
      return tasks.filter(task => {
        const lastStatusHistory =
          task.statusHistory?.[task.statusHistory?.length - 1];
        return (
          task.status === TaskStatus.Done &&
          lastStatusHistory?.createdAt &&
          !isToday(new Date(lastStatusHistory.createdAt))
        );
      });
    };
    const currentTaskIds = getCurrentTaskIds(saveCurrentTaskIds.map(id => task[id]))
    const createTaskFromWeeklyHobby = () => {
      const taskShouldCreateIds = pipe<string[]>(
        getTasksHasTodayHobby,
        getTaskDone,
        getTaskIds,
      )(Object.values(task || {}));
      taskShouldCreateIds.forEach(taskId => {
        if (!currentTaskIds.includes(taskId)) {
          changeTaskStatus(taskId, TaskStatus.Pending);
        }
      });
      setSavedCurrentTaskIds([...taskShouldCreateIds, ...saveCurrentTaskIds])
    };

    return (
      <TaskContext.Provider
        value={{
          task,
          currentTaskIds,
          setCurrentTaskIds: setSavedCurrentTaskIds,
          createTask,
          activeTaskId,
          changeTaskStatus,
          deleteTask,
          updateTask,
          createTaskFromWeeklyHobby,
          getTaskDetail,
          cancelProcessingTask,
          getRecommendedTasks,
          filter,
          setFilter,
        }}
      >
        <WrapComponent {...props} />
      </TaskContext.Provider>
    );
  };
};
