// Component
import IconTranslate from '@moon-ui/icon/IconTranslate';
import List from '@moon-ui/list/src';
import Radio from '@moon-ui/radio';
import Input from '@moon-ui/input';
import IconTimer from '@moon-ui/icon/IconTimer';
import Typography from '@moon-ui/typography';

// Enum
import { Language } from '@dreamer/global';

// Hooks
import { useIntl } from '@dreamer/translation';
import { usePomodoroGlobalConfig } from '@dreamer/pomodoro-common';

import styles from './index.module.scss';

const version = '1.0.1';

const ONE_MINUTE = 60 * 1000;

export default function SettingPage() {
  const {
    shortBreak,
    setShortBreak,
    pomodoro,
    setPomodoro,
    longBreak,
    setLongBreak,
  } = usePomodoroGlobalConfig();
  const { language, changeLanguage } = useIntl();
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <List.ItemMeta
          logo={<IconTranslate />}
          title={'Language'}
          description={'Config language for whole page'}
          rightComponent={
            <Radio
              isButton
              value={language}
              onChangeValue={(language: Language) => changeLanguage(language)}
              options={[
                { label: 'VN', value: Language.Vi },
                { label: 'EN', value: Language.En },
              ]}
            />
          }
        />
        <List.ItemMeta
          logo={<IconTimer className={styles.icon} />}
          title={'Pomodoro Time'}
          description={'Set Pomodoro time in Focus mode'}
          rightComponent={
            <>
              <Input
                type="number"
                border="dash"
                className={styles.durationInput}
                value={pomodoro / ONE_MINUTE}
                onChange={e =>
                  Number(e.target.value) &&
                  setPomodoro(Number(e.target.value) * ONE_MINUTE)
                }
              />
              <Typography.Text isDescription> minutes</Typography.Text>
            </>
          }
        />
        <List.ItemMeta
          logo={<IconTimer className={styles.icon} />}
          title={'Short Break'}
          description={'Set Short Break time in Focus mode'}
          rightComponent={
            <>
              <Input
                border="dash"
                type="number"
                className={styles.durationInput}
                value={shortBreak / ONE_MINUTE}
                onChange={e =>
                  Number(e.target.value) &&
                  setShortBreak(Number(e.target.value) * ONE_MINUTE)
                }
              />
              <Typography.Text isDescription> minutes</Typography.Text>
            </>
          }
        />
        <List.ItemMeta
          logo={<IconTimer className={styles.icon} />}
          title={'Long Break'}
          description={'Set Long Break time in Focus mode'}
          rightComponent={
            <>
              <Input
                border="dash"
                type="number"
                className={styles.durationInput}
                value={longBreak / ONE_MINUTE}
                onChange={e =>
                  Number(e.target.value) &&
                  setLongBreak(Number(e.target.value) * ONE_MINUTE)
                }
              />
              <Typography.Text isDescription> minutes</Typography.Text>
            </>
          }
        />
      </div>
      <a href="https://github.com/tomzaku/dreamer-web-public/issues" className={styles.footer}>
        <Typography.Text className={styles.version}>
          Version: {version}
        </Typography.Text>
        <Typography.Text className={styles.link}>
          | Feature Request | Bug Report
        </Typography.Text>
      </a>
    </div>
  );
}
