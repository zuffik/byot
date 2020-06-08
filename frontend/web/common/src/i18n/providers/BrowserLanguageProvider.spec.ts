import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import {BrowserLanguageProvider} from './BrowserLanguageProvider';

describe('BrowserLanguageProvider', () => {
  let provider: CurrentLanguageProvider;

  beforeEach(() => (provider = new BrowserLanguageProvider()));

  it('should return first user preference', () => {
    const prefs = ['sk', 'en'];
    jest.spyOn(navigator, 'languages', 'get').mockImplementation(() => prefs);
    expect(provider.currentLanguage).toEqual(prefs[0]);
  });

  it('should return single language without preference', () => {
    jest.spyOn(navigator, 'languages', 'get').mockImplementation(() => []);
    jest.spyOn(navigator, 'language', 'get').mockImplementation(() => 'sk');
    expect(provider.currentLanguage).toEqual('sk');
  });

  it('should return first user preference with long notation', () => {
    const prefs = ['sk-SK', 'en-US'];
    jest.spyOn(navigator, 'languages', 'get').mockImplementation(() => prefs);
    expect(provider.currentLanguage).toEqual('sk');
  });

  it('should return single language without preference with long notation', () => {
    jest.spyOn(navigator, 'languages', 'get').mockImplementation(() => []);
    jest.spyOn(navigator, 'language', 'get').mockImplementation(() => 'sk-SK');
    expect(provider.currentLanguage).toEqual('sk');
  });

  it('should return single language without preference', () => {
    jest.spyOn(navigator, 'languages', 'get').mockImplementation(() => []);
    jest.spyOn(navigator, 'language', 'get').mockImplementation(() => '');
    expect(provider.currentLanguage).toBeUndefined();
  });
});
