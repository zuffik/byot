import { Languages } from '../Possibilities';

export interface CurrentLanguageProvider {
  currentLanguage(): Languages;
}
