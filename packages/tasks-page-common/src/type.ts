import { TaskStatus } from "./enum";

export type TaskParams = {
  name: string;
  duration?: number;
  projectId: string;
}

export type Task = {
  name: string;
  duration?: number;
  commit?: number;
  projectId: string;
  status: TaskStatus
  createdAt: string;
  id: string;
}

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
