import * as React from 'react';
import {
  ListItem as ListItemBase,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Patch} from '@byot-frontend/web-common/src/components/elementary/patch/Patch';

type Props = WithStyles<typeof styles> &
  ListItemProps & {
    title?: React.ReactNode;
    image?: string;
    imagePlaceholder?: boolean | React.ReactNode;
    description?: React.ReactNode;
  };

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  image: (props: Props) => ({
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
  primaryText: {
    fontWeight: 700,
  },
  textRoot: {},
});
const useStyles = makeStyles(styles);

export const TripleComboItem: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {title, description, imagePlaceholder, image, ...baseProps} = props;
  return (
    <ListItemBase
      alignItems="flex-start"
      {...(baseProps as any)}
      component={p => <Patch component={props.component} {...p} />}
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
    </ListItemBase>
  );
};
