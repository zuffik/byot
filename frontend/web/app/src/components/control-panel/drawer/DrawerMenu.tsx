import * as React from 'react';
import {List} from '@material-ui/core';
import {DrawerMenuItem} from './DrawerMenuItem';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';

interface Props {
  selected?: string;
  menu: LinkMenuItem[];
  disablePadding?: boolean;
}

export const DrawerMenu: React.FC<Props> = (props: Props) => {
  return (
    <Patch px={0} py={props.disablePadding ? 0 : 2} width="100%" overflow="hidden">
      <List disablePadding>
        {props.menu.map(item => (
          <DrawerMenuItem
            key={item.id}
            link={item.link}
            icon={item.icon}
            selected={props.selected === item.id}>
            {item.label}
          </DrawerMenuItem>
        ))}
      </List>
    </Patch>
  );
};
