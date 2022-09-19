import React from 'react';
import { GlobalToolContext } from './context';
import { GlobalTool } from './type';

export const withGlobalTool = <P extends {}>(
  WrapComponent: React.ComponentType<P>
) => {
  return function(props: P) {
    const [visibleTool, setVisibleTool] = React.useState<GlobalTool[]>([]);
    return (
      <GlobalToolContext.Provider
        value={{
          open: tool => {
            setVisibleTool([...visibleTool, tool])
          },
          close: () => setVisibleTool([]),
          isToolVisible: tool => visibleTool.includes(tool),
        }}
      >
        <WrapComponent {...props} />
      </GlobalToolContext.Provider>
    );
  };
};
