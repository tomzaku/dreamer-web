import React from 'react';

import { TaskStatus } from './enum';

import { Filter, Task, TaskFullData, TaskParams } from './type';

type TaskContextType = {
  task?: Record<string, Task>;
  createTask: (newTask: TaskParams) => void;
  currentTaskIds: string[],
  activeTaskId?: string;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  getTaskDetail: (taskId: string) => Task | undefined;
  getRecommendedTasks: (text?: string) => TaskFullData[];
  cancelProcessingTask: () => void
  filter: Filter
  setFilter: (filter: Filter) => void
};

export const TaskContext = React.createContext<TaskContextType>({
  createTask: () => {},
  changeTaskStatus: () => {},
  deleteTask: () => {},
  currentTaskIds: [],
  getTaskDetail: () => undefined,
  cancelProcessingTask: () => undefined,
  getRecommendedTasks: () => [],
  filter: {
    showDoneTask: false,
    disableAddProgressTaskAtTop: false
  },
  setFilter: () => {}
});

