import React from 'react';

import { TaskStatus } from './enum';

import { Task, TaskParams } from './type';

type TaskContextType = {
  task?: Record<string, Task>;
  createTask: (newTask: TaskParams) => void;
  currentTasks: Task[];
  activeTaskId?: string;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  getTaskDetail: (taskId: string) => Task | undefined
};

export const TaskContext = React.createContext<TaskContextType>({
  createTask: () => {},
  changeTaskStatus: () => {},
  currentTasks: [],
  getTaskDetail: () => undefined
});

