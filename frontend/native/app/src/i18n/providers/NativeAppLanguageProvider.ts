import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import * as RNLocalize from 'react-native-localize';
import {languages, Languages} from '@byot-frontend/common/src/i18n/Possibilities';
import {FixedLanguageProvider} from '@byot-frontend/common/src/i18n/providers/FixedLanguageProvider';
import * as _ from 'lodash';

export class NativeAppLanguageProvider implements CurrentLanguageProvider {
  get currentLanguage(): Languages | undefined {
    return _.find(RNLocalize.getLocales(), l => languages.includes(l.languageCode as Languages))
      ?.languageCode as Languages;
  }

  get fallbackProvider(): CurrentLanguageProvider {
    return new FixedLanguageProvider('en');
  }
}
