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
          close: () => setVisibleTool(visibleTool.slice(0, -1)),
          isToolVisible: tool => visibleTool.includes(tool),
          visibleTool,
        }}
      >
        <WrapComponent {...props} />
      </GlobalToolContext.Provider>
    );
  };
};
