import { CurrentLanguageProvider } from './CurrentLanguageProvider';
import { languages, Languages } from '../Possibilities';

export const urlLanguageProvider: CurrentLanguageProvider = {
  currentLanguage(): Languages {
    return (
      (window.location.pathname.match(
        new RegExp(`/^\/?(${languages.join('|')})\//`)
      )?.[1] as Languages) || 'en'
    );
  },
};
