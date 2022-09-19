import React from 'react';
import { GlobalTool } from './type';

type GlobalToolType = {
  open: (tool: GlobalTool) => void;
  close: () => void;
  isToolVisible: (tool: GlobalTool) => boolean;
};
export const GlobalToolContext = React.createContext<GlobalToolType>({
  open: () => {},
  close: () => {},
  isToolVisible: () => false,
});
