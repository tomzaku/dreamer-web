import IconMusic from '@moon-ui/icon/IconMusic';
import IconSetting from '@moon-ui/icon/IconSetting';
import IconTimer from '@moon-ui/icon/IconTimer';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

// Hooks
import { GlobalTool, useGlobalTool } from '@dreamer/global-tool-common';
import styles from './index.module.scss';

export default function GlobalToolMobile() {
  const { open } = useGlobalTool();
  return (
    <Fab
      alwaysShowTitle={true}
      icon={<IconSetting fill="white" className={styles.icon} />}
      style={{ margin: 12, bottom: 0, right: 0 }}
      mainButtonStyles={{ background: '#334d6e' }}
    >
      <Action
        onClick={() => open(GlobalTool.FocusMode)}
        style={{ background: '#0b7dc2' }}
        text="Focus Mode"
      >
        <IconTimer className={styles.icon} />
      </Action>
      <Action
        onClick={() => open(GlobalTool.Sound)}
        style={{ background: '#0b7dc2' }}
        text="Sound/ Music"
      >
        <IconMusic className={styles.icon} />
      </Action>
    </Fab>
  );
}
