import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import {Languages} from '@byot-frontend/common/src/i18n/Possibilities';
import {FixedLanguageProvider} from '@byot-frontend/common/src/i18n/providers/FixedLanguageProvider';
import {defaultLanguage} from '@byot-frontend/common/src/i18n/GetCurrentLanguage';

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
