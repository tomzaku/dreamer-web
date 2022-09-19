import React from 'react';

import { TranslationContext } from './context';

export const useTranslation = () => {
  return React.useContext(TranslationContext);
};
