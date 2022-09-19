import { Language } from '@dreamer/global';

export const loadLocale = async (language: Language) => {
  return await import(`./language/${language}.json`);
};
