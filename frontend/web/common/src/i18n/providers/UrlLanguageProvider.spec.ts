import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import {UrlLanguageProvider} from './UrlLanguageProvider';

describe('UrlLanguageProvider', () => {
  let provider: CurrentLanguageProvider;

  beforeAll(() =>
    Object.defineProperty(window, 'location', {
      value: {
        get pathname() {
          return '';
        },
      },
      writable: true,
    })
  );

  beforeEach(() => (provider = new UrlLanguageProvider()));

  it('should match pathname', () => {
    jest.spyOn(window.location, 'pathname', 'get').mockImplementation(() => '/sk/whatever');
    expect(provider.currentLanguage).toEqual('sk');
  });

  it('should not match pathname', () => {
    jest.spyOn(window.location, 'pathname', 'get').mockImplementation(() => '/whatever');
    expect(provider.currentLanguage).toBeUndefined();
  });
});
