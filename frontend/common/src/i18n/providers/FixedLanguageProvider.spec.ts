import {CurrentLanguageProvider} from './CurrentLanguageProvider';
import {FixedLanguageProvider} from './FixedLanguageProvider';

describe('FixedLanguageProvider', () => {
  let provider: CurrentLanguageProvider;
  const lang = 'en';

  beforeEach(() => (provider = new FixedLanguageProvider(lang)));

  it('should match input', () => {
    expect(provider.currentLanguage).toEqual(lang);
  });
});
