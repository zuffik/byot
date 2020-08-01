import * as React from 'react';

export interface MenuItem<I = string | number> {
  label: string;
  id: I;
  icon?: React.ReactNode;
}

export interface LinkMenuItem<I = string | number> extends MenuItem<I> {
  link: string;
}
