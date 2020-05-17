import * as React from 'react';
import {Theme} from '@material-ui/core';
import {ClassNameMap, Styles} from '@material-ui/core/styles/withStyles';
import {ClassKeyOfStyles} from '@material-ui/styles/withStyles';

export interface WithTheme {
  theme?: Theme;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export type WithStyles<
  StylesOrClassKey extends string | Styles<any, any, any> = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? {theme: Theme} : {}) & {
  classes?: Partial<ClassNameMap<ClassKeyOfStyles<StylesOrClassKey>>>;
  className?: string;
  theme?: Theme;
  style?: React.CSSProperties;
};
