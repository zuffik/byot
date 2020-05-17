import * as React from 'react';
import {ReactElement} from 'react';
import {shallow, ShallowRendererProps, ShallowWrapper} from 'enzyme';
import {createShallow as cs} from '@material-ui/core/test-utils';
import {ShallowOptions} from '@material-ui/core/test-utils/createShallow';
import {Theme, ThemeProvider} from '@material-ui/core';
import {createTheme} from '../setup/CreateTheme';

export type Shallow = typeof shallow;

export const createShallow = (options?: Partial<ShallowOptions>, theme: Theme = createTheme()): Shallow => {
  const sh = cs(options);
  return <P, S>(node: ReactElement<P>, opts?: ShallowRendererProps): ShallowWrapper<P, S> =>
    sh(<ThemeProvider theme={theme}>{node}</ThemeProvider>, opts)
      .dive()
      .dive();
};
