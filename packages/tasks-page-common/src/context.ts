import React from 'react';

import { TaskStatus } from './enum';

import { Task, TaskFullData, TaskParams } from './type';

type TaskContextType = {
  task?: Record<string, Task>;
  createTask: (newTask: TaskParams) => void;
  currentTasks: Task[];
  activeTaskId?: string;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  getTaskDetail: (taskId: string) => Task | undefined;
  getRecommendedTasks: (text?: string) => TaskFullData[];
  cancelProcessingTask: () => void
};

export const TaskContext = React.createContext<TaskContextType>({
  createTask: () => {},
  changeTaskStatus: () => {},
  currentTasks: [],
  getTaskDetail: () => undefined,
  cancelProcessingTask: () => undefined,
  getRecommendedTasks: () => [],
});

