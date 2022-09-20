import React from 'react';

// Type
import { Language } from '@dreamer/global';
import { TranslationContextProps } from './type';

export const TranslationContext = React.createContext<TranslationContextProps>({
  messages: {},
  changeLanguage: () => {},
  language: Language.En,
  formatMessage: () => '',
});
