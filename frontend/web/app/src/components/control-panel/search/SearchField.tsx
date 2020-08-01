import * as React from 'react';
import {Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';

interface Props {
  onChange: (value: string) => void;
  value: string;
  debounce?: number;
}

export const SearchField: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  return (
    <>
      <Typography variant="h6">{t('Search')}</Typography>
      <Input
        size="small"
        label={t('Type to search')}
        value={props.value}
        onChangeText={props.onChange}
        debounce={typeof props.debounce == 'undefined' ? 300 : props.debounce}
      />
    </>
  );
};
