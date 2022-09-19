import React from 'react'
import { TaskContext } from './context';

export const useTask = () => {
  return React.useContext(TaskContext)
};

