import { Language } from "@dreamer/global";

export type MessageDescriptor = {
  id: string;
  description?: string;
  defaultMessage: string;
};

export type TranslationContextProps = {
  messages: Record<string, string>;
  changeLanguage: (language: Language) => void;
  language: Language;
  formatMessage: (
    descriptor: MessageDescriptor,
    values?: Record<string, string>
  ) => string;
};
