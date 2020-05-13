import { CurrentLanguageProvider } from './CurrentLanguageProvider';
import { Languages } from '../Possibilities';

export class FixedLanguageProvider implements CurrentLanguageProvider {
  constructor(private readonly language: Languages) {}
  currentLanguage(): Languages {
    return this.language;
  }
}
