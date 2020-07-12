import * as React from 'react';
import {boolean, select} from '@storybook/addon-knobs';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {colorVariants} from '../../helpers/ColorVariants';
import {BackButton} from '@byot-frontend/web-common/src/components/elementary/navigation/BackButton';

export default {
  title: 'Elementary/Button',
};

export const button = () => (
  <Button
    disableElevation={boolean('Disable elevation', true)}
    size={select(
      'Size',
      {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
      },
      'medium'
    )}
    variant={select(
      'Variant',
      {
        Outlined: 'outlined',
        Contained: 'contained',
      },
      'contained'
    )}
    color={colorVariants({Gradient: 'gradient'})}
    loading={boolean('Loading', false)}>
    Text
  </Button>
);

export const backButton = () => <BackButton color={colorVariants()} />;
