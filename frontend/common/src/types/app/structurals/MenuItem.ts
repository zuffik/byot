import * as React from 'react';

export interface MenuItem {
  label: string;
  id: string | number;
  icon?: React.ReactNode;
}

export interface LinkMenuItem extends MenuItem {
  link: string;
}
