import IconMusic from '@moon-ui/icon/IconMusic';
import IconApp from '@moon-ui/icon/IconApp';
import IconTimer from '@moon-ui/icon/IconTimer';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

// Hooks
import { GlobalTool, useGlobalTool } from '@dreamer/global-tool-common';
import styles from './index.module.scss';
import { requireNotifyPermission } from '@dreamer/notification';

export default function GlobalToolMobile() {
  const { open, visibleTool } = useGlobalTool();
  if (visibleTool.length > 0) return null;
  return (
    <Fab
      alwaysShowTitle={true}
      icon={<IconApp className={styles.icon} />}
      style={{ margin: 12, bottom: 0, right: 0 }}
      mainButtonStyles={{ background: '#334d6e' }}
    >
      <Action
        onClick={() => {
          open(GlobalTool.FocusMode);
          requireNotifyPermission();
        }}
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
