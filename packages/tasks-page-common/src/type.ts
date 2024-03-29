import { Day, EisenhowerMatrix, TaskStatus } from "./enum";

export type TaskParams = {
  name: string;
  duration?: number;
  projectId: string;
  eisenhowerMatrix?: EisenhowerMatrix
  weeklyHobbies?: Day[];
}

export type TaskStatusHistory = {
  from: TaskStatus,
  to: TaskStatus,
  createdAt: Date,
}

export type Task = {
  name: string;
  duration?: number;
  commit?: number;
  projectId: string;
  status: TaskStatus;
  statusHistory?: TaskStatusHistory[];
  weeklyHobbies?: Day[];
  createdAt: string;
  eisenhowerMatrix?: EisenhowerMatrix
  id: string;
}

export type ListTask = Record<string, Task>

export type TaskFullData = {
  name: string;
  duration?: number;
  commit?: number;
  projectId: string;
  project?: string;
  status: TaskStatus
  createdAt: string;
  id: string;
}

export type Filter = {
  showDoneTask: boolean,
  disableAddProgressTaskAtTop: boolean,
  showAllTask: boolean,
}

