import * as React from 'react';
import {Logo} from '@byot-frontend/web-common/src/components/elementary/logo/Logo';
import {IconLogo} from '@byot-frontend/web-common/src/components/elementary/logo/IconLogo';
import {number} from '@storybook/addon-knobs';

export default {
  title: 'Elementary/Misc',
};

export const large = () => (
  <Logo height={number('Height', 100, {min: 10, max: 1000, range: true, step: 10})} />
);
export const icon = () => (
  <IconLogo height={number('Height', 100, {min: 10, max: 1000, range: true, step: 10})} />
);
