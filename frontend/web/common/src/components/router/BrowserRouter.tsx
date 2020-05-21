import * as React from 'react';
import {BrowserRouter as BaseRouter, BrowserRouterProps} from 'react-router-dom';
import {CurrentLanguageProvider} from '@byot-frontend/common/src/i18n/providers/CurrentLanguageProvider';
import {getCurrentLanguage} from '@byot-frontend/common/src/i18n/GetCurrentLanguage';

interface Props extends BrowserRouterProps {
  languageProvider: CurrentLanguageProvider;
}

export const BrowserRouter: React.FC<Props> = (props: Props) => {
  return <BaseRouter basename={'/' + getCurrentLanguage(props.languageProvider)} {...props} />;
};
