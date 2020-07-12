import * as React from 'react';
import {ControlPanelWrapper} from '../control-panel/base/ControlPanelWrapper';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';

interface Props {
  children?: React.ReactNode;
  menuItems: LinkMenuItem[];
  selected?: string;
}

export const ControlPanelLayout: React.FC<Props> = (props: Props) => (
  <ControlPanelWrapper selected={props.selected} menuItems={props.menuItems}>
    {props.children}
  </ControlPanelWrapper>
);
