import React from 'react';

import { TaskStatus } from './enum';

import { Filter, Task, TaskFullData, TaskParams } from './type';

type TaskContextType = {
  task?: Record<string, Task>;
  createTask: (newTask: TaskParams) => void;
  currentTaskIds: string[];
  setCurrentTaskIds: (taskIds: string[]) => void;
  activeTaskId?: string;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, data: Task) => void;
  getTaskDetail: (taskId: string) => Task | undefined;
  getRecommendedTasks: (text?: string) => TaskFullData[];
  createTaskFromWeeklyHobby: () => void;
  cancelProcessingTask: () => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TaskContext = React.createContext<TaskContextType>({
  createTask: () => { },
  changeTaskStatus: () => { },
  deleteTask: () => { },
  updateTask: () => { },
  currentTaskIds: [],
  setCurrentTaskIds: () => { },
  getTaskDetail: () => undefined,
  cancelProcessingTask: () => undefined,
  createTaskFromWeeklyHobby: () => { },
  getRecommendedTasks: () => [],
  filter: {
    showDoneTask: false,
    disableAddProgressTaskAtTop: false,
    showAllTask: false
  },
  setFilter: () => { },
});
