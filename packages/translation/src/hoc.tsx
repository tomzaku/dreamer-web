import React from 'react';

// Component
import { IntlProvider } from 'react-intl';
import { TranslationContext } from './context';

// Enum
import { Language } from '@dreamer/global';

export const withTranslation = (Component: React.FC) =>
  function TranslationWrapper(props: any) {
    const [language, setLanguage] = React.useState<Language>(Language.En);
    const [messages, setMessages] = React.useState<Record<string,string>>({});
    const loadLanguage = async (nextLanguage: Language) => {
      const { default: messages } = await import(
        `./language/${nextLanguage}.json`
      );
      setMessages(messages);
    }
    React.useEffect(() => {
      loadLanguage(language)
    }, [])
    return (
      <TranslationContext.Provider
        value={{
          messages: messages,
          language,
          changeLanguage: async (nextLanguage: Language) => {
            setLanguage(nextLanguage);
            loadLanguage(nextLanguage)
          },
        }}
      >
        <IntlProvider messages={messages} locale={language}>
          <Component {...props} />
        </IntlProvider>
      </TranslationContext.Provider>
    );
  };

