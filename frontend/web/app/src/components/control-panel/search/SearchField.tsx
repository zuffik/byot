import * as React from 'react';
import {makeStyles, Theme, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';

interface Props extends WithStyles<typeof styles> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const styles = (theme: Theme) => ({});
const useStyles = makeStyles(styles);

export const SearchField: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <>
      <Typography variant="h6">{t('Search')}</Typography>
      <Input size="small" label={t('Type to search')} value={props.value} onChange={props.onChange} />
    </>
  );
};
