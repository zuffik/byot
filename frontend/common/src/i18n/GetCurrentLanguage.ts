import {Languages} from './Possibilities';
import {CurrentLanguageProvider} from './providers/CurrentLanguageProvider';

export const defaultLanguage: Languages = 'en';

export const getCurrentLanguage = (
  currentProvider: CurrentLanguageProvider,
  defaultLanguage: Languages = defaultLanguage
): Languages => {
  let language: string | undefined;
  let provider: CurrentLanguageProvider | undefined = currentProvider;
  do {
    language = provider.currentLanguage;
    provider = provider.fallbackProvider;
  } while (!language && provider);
  return (language || defaultLanguage) as Languages;
};
