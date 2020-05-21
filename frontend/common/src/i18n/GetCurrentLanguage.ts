import {Languages} from './Possibilities';
import {CurrentLanguageProvider} from './providers/CurrentLanguageProvider';
import {defaultLanguage as dl} from './CreateI18n';

export const getCurrentLanguage = (
  currentProvider: CurrentLanguageProvider,
  defaultLanguage: Languages = dl
): Languages => {
  let language: string | undefined;
  let provider: CurrentLanguageProvider | undefined = currentProvider;
  do {
    language = provider.currentLanguage;
    provider = provider.fallbackProvider;
  } while (!language && provider);
  return (language || defaultLanguage) as Languages;
};
