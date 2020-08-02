import * as React from 'react';
import {Link} from 'react-router-dom';
import {Theme, makeStyles} from '@material-ui/core';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {TripleComboItem} from '../../elements/list-items/TripleComboItem';
import {MediaListItemPlaceholder} from './MediaListItemPlaceholder';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';

type LinkProps = {link: string};
type EventProps = {onClick: () => void};

type Props = WithStyles<typeof styles> & {
  media: IMedia;
  description?: string;
  children?: React.ReactNode;
  transparent?: boolean;
} & (LinkProps | EventProps | {});

const styles = (theme: Theme) => ({
  root: {},
});
const useStyles = makeStyles(styles);

const isLinkProps = (props: object): props is LinkProps => 'link' in props;
const isEventProps = (props: object): props is EventProps => 'onClick' in props;
const isExternalURL = (props: LinkProps): boolean => /^https?:\/\//.test(props.link);

export const MediaListItem: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const p: any = isLinkProps(props)
    ? {
        button: true,
        component: isExternalURL(props) ? (p: any) => <a {...p} /> : Link,
        [isExternalURL(props) ? 'href' : 'to']: props.link,
        ...(isExternalURL(props) && {target: '_blank'}),
      }
    : isEventProps(props)
    ? {button: true, onClick: props.onClick}
    : {};
  return (
    <TripleComboItem
      primary={props.media.label}
      image={props.media.source.thumbnail}
      singleLine
      description={props.description}
      button={isLinkProps(props) || isEventProps(props)}
      imagePlaceholder={<MediaListItemPlaceholder />}
      classes={{root: styles.root}}
      transparent={props.transparent}
      data-testid="media-list-item"
      {...p}>
      {props.children}
    </TripleComboItem>
  );
};
