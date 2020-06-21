import * as React from 'react';
import {Box, Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

interface Props {}

export const PlainLayoutFooter: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  return (
    <Box alignItems="center" justifyContent="center" display="flex">
      <Typography>{t('All rights reserved to byoT')}</Typography>
    </Box>
  );
};
