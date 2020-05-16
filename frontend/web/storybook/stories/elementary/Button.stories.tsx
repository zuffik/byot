import * as React from 'react';
import {select} from '@storybook/addon-knobs';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {colorVariants} from '../../helpers/ColorVariants';

export default {
  title: 'Elementary/Button',
};

export const button = () => (
  <Button
    variant={select(
      'Variant',
      {
        Outlined: 'outlined',
        Contained: 'contained',
      },
      'outlined'
    )}
    color={colorVariants({Gradient: 'gradient'})}
  >
    Text
  </Button>
);
