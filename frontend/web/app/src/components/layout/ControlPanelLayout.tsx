import * as React from 'react';
import {ControlPanelWrapper} from '../control-panel/base/ControlPanelWrapper';

interface Props {
  children?: React.ReactNode;
}

export const ControlPanelLayout: React.FC<Props> = (props: Props) => {
  return <ControlPanelWrapper>{props.children}</ControlPanelWrapper>;
};
