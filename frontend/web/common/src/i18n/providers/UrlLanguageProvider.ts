import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import {languages, Languages} from '@byot-frontend/common/src/i18n/Possibilities';
import {BrowserLanguageProvider} from './BrowserLanguageProvider';

export class UrlLanguageProvider implements CurrentLanguageProvider {
  get currentLanguage(): Languages | undefined {
    return (
      (window.location.pathname.match(new RegExp(`^\/?(${languages.join('|')})\/?`))?.[1] as Languages) ||
      undefined
    );
  }
  get fallbackProvider(): CurrentLanguageProvider {
    return new BrowserLanguageProvider();
  }
}
