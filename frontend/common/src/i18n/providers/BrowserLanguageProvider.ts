import {CurrentLanguageProvider} from './CurrentLanguageProvider';
import {Languages} from '../Possibilities';
import {FixedLanguageProvider} from './FixedLanguageProvider';
import {defaultLanguage} from '../CreateI18n';

export class BrowserLanguageProvider implements CurrentLanguageProvider {
  get currentLanguage(): Languages | undefined {
    const lang = navigator.languages?.[0] || navigator.language;
    if (!lang) {
      return undefined;
    }
    const short = lang.substr(0, 2).toLowerCase();
    if (!short) {
      return undefined;
    }
    return short as Languages;
  }

  get fallbackProvider(): CurrentLanguageProvider {
    return new FixedLanguageProvider(defaultLanguage);
  }
}
