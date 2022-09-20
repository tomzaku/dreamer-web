import React from 'react';

import { TranslationContext } from './context';

export const useIntl = () => {
  return React.useContext(TranslationContext);
};
