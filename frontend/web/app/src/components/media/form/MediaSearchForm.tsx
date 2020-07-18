import * as React from 'react';
import {Grid, IconButton, makeStyles, Theme} from '@material-ui/core';
import {AddRounded} from '@material-ui/icons';
import {MediaAutocompleteInputProps} from './MediaAutocompleteInput';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {CSSProperties} from '@material-ui/styles';

type AutocompleteComponent = React.ComponentType<MediaAutocompleteInputProps>;

interface Props {
  onSelect: (media: IMedia) => void;
  AutocompleteComponent: AutocompleteComponent;
}

const styles = (theme: Theme) => ({
  lastItem: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  } as CSSProperties,
});
const useStyles = makeStyles(styles);

let id = 0;

export const MediaSearchForm: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const [media, setMedia] = React.useState<IMedia | undefined>();
  const {t} = useTranslation();

  const onSubmit = () => {
    if (media) {
      props.onSelect(media);
      setMedia(undefined);
    }
  };

  return (
    <Grid container spacing={2} justify="flex-end" alignItems="center">
      <Grid item xs={12} sm={6}>
        <props.AutocompleteComponent onSelect={setMedia} onClear={() => setMedia(undefined)} />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Input
          label={t('Video label')}
          disabled={!media}
          value={media?.label || ''}
          onChange={e => media && setMedia({...media, label: e.target.value, id: (++id).toString()})}
        />
      </Grid>
      <Grid item xs={12} sm={1} classes={{root: styles.lastItem}}>
        <IconButton color="secondary" onClick={onSubmit}>
          <AddRounded />
        </IconButton>
      </Grid>
    </Grid>
  );
};
