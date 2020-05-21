import {CurrentLanguageProvider} from './providers/CurrentLanguageProvider';
import {Languages} from './Possibilities';
import {getCurrentLanguage} from './GetCurrentLanguage';

class MockLanguageProvider implements CurrentLanguageProvider {
  public language?: Languages;
  public provider?: CurrentLanguageProvider;

  get currentLanguage(): Languages | undefined {
    return this.language;
  }

  get fallbackProvider(): CurrentLanguageProvider | undefined {
    return this.provider;
  }
}

describe('GetCurrentLanguage', () => {
  it('should return default language', () => {
    const lang = 'en';
    const provider = new MockLanguageProvider();
    expect(getCurrentLanguage(provider, lang)).toEqual(lang);
  });

  it('should return defined language without fallback', () => {
    const provider = new MockLanguageProvider();
    provider.language = 'sk';
    expect(getCurrentLanguage(provider)).toEqual(provider.language);
  });

  it('should return defined language with fallback', () => {
    const first = new MockLanguageProvider();
    first.language = 'sk';
    const second = new MockLanguageProvider();
    second.language = 'en';
    first.provider = second;
    expect(getCurrentLanguage(first)).toEqual(first.language);
  });

  it('should return fallback language', () => {
    const first = new MockLanguageProvider();
    const second = new MockLanguageProvider();
    second.language = 'en';
    first.provider = second;
    expect(getCurrentLanguage(first)).toEqual(second.language);
  });

  it('should return third fallback language', () => {
    const first = new MockLanguageProvider();
    const second = new MockLanguageProvider();
    const third = new MockLanguageProvider();
    third.language = 'en';
    first.provider = second;
    second.provider = third;
    expect(getCurrentLanguage(first)).toEqual(third.language);
  });
});
