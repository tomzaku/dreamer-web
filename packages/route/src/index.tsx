import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@dreamer/header';
import TaskPage from '@dreamer/tasks-page-ui';
import SettingPage from '@dreamer/setting-page-ui';
import MusicControllerMobile from '@dreamer/music-controller-mobile';
import GlobalToolMobile from '@dreamer/global-tool-mobile';
import PomodoroMobile from '@dreamer/pomodoro-mobile';

// Hooks
import { useGlobalTool, GlobalTool } from '@dreamer/global-tool-common';
//
// Hocs
import { withGlobalTool, } from '@dreamer/global-tool-common';
import { withTask } from '@dreamer/tasks-page-common';

const AppRouter = () => {
  const { isToolVisible, close } = useGlobalTool()
  return (
    <BrowserRouter>
      <Header />
      <MusicControllerMobile onClickBackButton={close} visible={isToolVisible(GlobalTool.Sound)} />
      <PomodoroMobile onClickBackButton={close} visible={isToolVisible(GlobalTool.FocusMode)} />
      <GlobalToolMobile />
      <Routes>
        <Route path="/" element={<TaskPage />}></Route>
        <Route path="/setting" element={<SettingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default withTask(withGlobalTool(AppRouter));

