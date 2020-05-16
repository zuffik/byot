import {select} from '@storybook/addon-knobs';

export const colorVariants = (additional: object = {}) =>
  select(
    'Color',
    {
      Primary: 'primary',
      Secondary: 'secondary',
      ...additional,
    },
    'primary'
  );
