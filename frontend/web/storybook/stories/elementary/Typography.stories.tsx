import * as React from 'react';
import {Typography} from '@material-ui/core';
import {select} from '@storybook/addon-knobs';

export default {
  title: 'Elementary/Typography',
};

export const typography = () => (
  <Typography
    variant={select(
      'Variant',
      {
        H1: 'h1',
        H2: 'h2',
        H3: 'h3',
        H4: 'h4',
        H5: 'h5',
        H6: 'h6',
        Subtitle1: 'subtitle1',
        Subtitle2: 'subtitle2',
        Body1: 'body1',
        Body2: 'body2',
        Caption: 'caption',
        Button: 'button',
        Overline: 'overline',
      },
      'body1'
    )}
    color={select(
      'Color',
      {
        Initial: 'initial',
        Inherit: 'inherit',
        Primary: 'primary',
        Secondary: 'secondary',
        'Text primary': 'textPrimary',
        'Text secondary': 'textSecondary',
        Error: 'error',
      },
      'initial'
    )}
  >
    ľščťžýáíé ĽŠČŤŽÝÁÍÉ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse expedita ipsa iusto
    non provident quibusdam veniam vitae. Ab at deserunt dolore dolorem eligendi inventore maiores maxime
    nesciunt odio voluptates?
  </Typography>
);

export const headings = () => (
  <>
    <Typography variant="h1">H1: Kŕdeľ ďatlov učí koňa žrať kôru</Typography>
    <Typography variant="h2">H2: Kŕdeľ ďatlov učí koňa žrať kôru</Typography>
    <Typography variant="h3">H3: Kŕdeľ ďatlov učí koňa žrať kôru</Typography>
    <Typography variant="h4">H4: Kŕdeľ ďatlov učí koňa žrať kôru</Typography>
    <Typography variant="h5">H5: Kŕdeľ ďatlov učí koňa žrať kôru</Typography>
    <Typography variant="h6">H6: Kŕdeľ ďatlov učí koňa žrať kôru</Typography>
  </>
);
