import {useTranslation as base, UseTranslationOptions, UseTranslationResponse} from 'react-i18next';
import {i18n} from '@byot-frontend/native-app/src/setup';

export const useTranslation = (ns?: string, options?: UseTranslationOptions): UseTranslationResponse =>
  base(ns, {
    ...(options || {}),
    i18n: options?.i18n || i18n,
  });
