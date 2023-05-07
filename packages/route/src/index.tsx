import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@dreamer/header';
import TaskPage from '@dreamer/tasks-page-ui';
import SettingPage from '@dreamer/setting-page-ui';
import MusicControllerMobile from '@dreamer/music-controller-mobile';
import PomodoroMobile from '@dreamer/pomodoro-mobile';
import PomodoroPip from '@dreamer/pomodoro-pip';

// Hooks
import { useGlobalTool, GlobalTool } from '@dreamer/global-tool-common';

// Hocs
import { withGlobalTool } from '@dreamer/global-tool-common';
import { useTask, withTask } from '@dreamer/tasks-page-common';
import { withPomodoroTimer } from '@dreamer/pomodoro-common';

const AppRouter = () => {
  const { isToolVisible, close } = useGlobalTool();
  const { cancelProcessingTask, createTaskFromWeeklyHobby } = useTask();
  React.useEffect(() => {
    cancelProcessingTask();
    createTaskFromWeeklyHobby();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <MusicControllerMobile
        onClickBackButton={close}
        visible={isToolVisible(GlobalTool.Sound)}
      />
      <PomodoroMobile
        onClickBackButton={close}
        visible={isToolVisible(GlobalTool.FocusMode)}
      />
      <PomodoroPip />
      <Routes>
        <Route path="/" element={<TaskPage />}></Route>,
        <Route path="/setting" element={<SettingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default withPomodoroTimer(withTask(withGlobalTool(AppRouter)))
