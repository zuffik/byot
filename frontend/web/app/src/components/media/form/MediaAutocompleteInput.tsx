import * as React from 'react';
import {CircularProgress, makeStyles, Theme, Paper} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Autocomplete} from '@material-ui/lab';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {MediaListItem} from '../list/MediaListItem';
import * as _ from 'lodash';

export interface MediaAutocompleteInputProps {
  onSelect: (media: IMedia) => void;
  onClear?: () => void;
}

interface Props extends WithStyles<typeof styles>, MediaAutocompleteInputProps {
  media: IterableResource<IMedia>;
  onTextChange?: (text: string) => void;
  id?: string;
}

const styles = (theme: Theme) => ({
  loader: {
    marginTop: theme.spacing(-2.5),
  },
});
const useStyles = makeStyles(styles);

export const MediaAutocompleteInput: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  // todo fix clear
  return (
    <Autocomplete
      options={props.media.data}
      getOptionLabel={m => m.label}
      filterOptions={(options, state) =>
        options.filter(
          opt =>
            state.getOptionLabel(opt).toLowerCase().includes(state.inputValue.toLowerCase()) ||
            /^https?:\/\//.test(state.inputValue)
        )
      }
      loading={props.media.isProcessing}
      freeSolo
      id={props.id}
      clearOnEscape
      clearOnBlur
      PaperComponent={p => <Paper {...p} elevation={0} data-testid="media-form-autocomplete-suggestions" />}
      onInputChange={_.debounce((v, text) => props.onTextChange?.(text), 300)}
      onChange={(e, v) => (v ? props.onSelect(v as IMedia) : props.onClear?.())}
      renderOption={media => <MediaListItem transparent media={media} />}
      renderInput={params => (
        <Input
          {...params}
          label={t('Start typing to search or paste URL')}
          inputProps={{...params.inputProps, 'data-testid': 'media-form-autocomplete-input'}}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {props.media.isProcessing ? (
                  <CircularProgress classes={{root: styles.loader}} color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
