import * as React from 'react';
import {
  BoxProps,
  ListItem as ListItemBase,
  ListItemProps,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';
import {CSSProperties} from '@material-ui/styles';

type Props<P> = WithStyles<typeof styles> &
  ListItemProps & {
    title?: React.ReactNode;
    image?: string;
    imagePlaceholder?: boolean | React.ReactNode;
    description?: React.ReactNode;
    component?: React.ComponentType<P>;
    singleLine?: boolean;
    transparent?: boolean;
  } & P;

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  image: (props: Props<any>) => ({
    borderRadius: theme.shape.borderRadius,
    width: theme.spacing(8),
    height: theme.spacing(8),
    minWidth: theme.spacing(8),
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginRight: theme.spacing(2),
    ...(props.image && {backgroundImage: `url(${props.image})`}),
  }),
  primaryText: (props: Props<any>) => ({
    fontWeight: 700,
    ...(props.singleLine &&
      ({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      } as CSSProperties)),
  }),
  textRoot: (props: Props<any>) => ({
    margin: props.singleLine && 0,
  }),
});
const useStyles = makeStyles(styles);

export const TripleComboItem = <P extends object = object>(props: Props<P>) => {
  const styles = useStyles(props);
  const {title, description, imagePlaceholder, image, transparent, ...baseProps} = props;
  return (
    <ListItemBase
      alignItems="flex-start"
      {...(baseProps as any)}
      component={props.transparent ? undefined : p => <Patch component={props.component} {...p} />}
      classes={{root: styles.root, ...baseProps.classes}}>
      {(props.image || props.imagePlaceholder) && (
        <div className={styles.image}>
          {typeof props.imagePlaceholder !== 'boolean' && !props.image && props.imagePlaceholder}
        </div>
      )}
      {(props.title || props.description) && (
        <ListItemText
          classes={{primary: styles.primaryText, root: styles.textRoot}}
          primary={props.title}
          secondary={props.description}
        />
      )}
      {props.children}
    </ListItemBase>
  );
};
