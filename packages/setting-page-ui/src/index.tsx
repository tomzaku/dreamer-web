// Component
import IconTranslate from '@moon-ui/icon/IconTranslate';
import List from '@moon-ui/list/src';
import Radio from '@moon-ui/radio';

// Enum
import { Language } from '@dreamer/global';

// Hooks
import { useIntl } from '@dreamer/translation';

import styles from './index.module.scss'

export default function SettingPage() {
  const { language, changeLanguage } = useIntl();
  return (
    <div className={styles.container}>
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
    </div>
  );
}

