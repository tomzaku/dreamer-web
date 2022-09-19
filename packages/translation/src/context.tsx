import React from 'react';

// Type
import { Language } from '@dreamer/global';

type TranslationContextProps = {
  messages: Record<string, string>;
  changeLanguage: (language: Language) => void;
  language: Language
};

export const TranslationContext = React.createContext<TranslationContextProps>({
  messages: {},
  changeLanguage: () => {},
  language: Language.En
});
