import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import {NativeAppLanguageProvider} from './NativeAppLanguageProvider';
import * as RNLocalize from 'react-native-localize';
import {getCurrentLanguage} from '@byot-frontend/common/src/i18n/GetCurrentLanguage';

describe('NativeAppLanguageProvider', () => {
  let provider: CurrentLanguageProvider;

  beforeEach(() => (provider = new NativeAppLanguageProvider()));

  it('should match user preference', () => {
    jest
      .spyOn(RNLocalize, 'getLocales')
      .mockImplementation(() => [{isRTL: true, languageCode: 'sk', languageTag: 'sk-SK', countryCode: 'SK'}]);
    expect(getCurrentLanguage(provider)).toEqual('sk');
  });

  it('should match user preference', () => {
    jest.spyOn(RNLocalize, 'getLocales').mockImplementation(() => [
      {isRTL: false, languageCode: 'id', languageTag: 'whatever', countryCode: 'CC'},
      {isRTL: false, languageCode: 'sk', languageTag: 'sk-SK', countryCode: 'SK'},
    ]);
    expect(getCurrentLanguage(provider)).toEqual('sk');
  });

  it('should match fallback language due to non existent preference', () => {
    jest.spyOn(RNLocalize, 'getLocales').mockImplementation(() => []);
    expect(getCurrentLanguage(provider)).toEqual('en');
  });

  it('should match fallback language due to invalid preference', () => {
    jest
      .spyOn(RNLocalize, 'getLocales')
      .mockImplementation(() => [
        {isRTL: false, languageCode: 'id', languageTag: 'whatever', countryCode: 'CC'},
      ]);
    expect(getCurrentLanguage(provider)).toEqual('en');
  });
});
