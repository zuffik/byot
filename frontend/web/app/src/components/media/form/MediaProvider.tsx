import * as React from 'react';
import {MediaSearchForm} from './MediaSearchForm';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {MediaProviderInput} from './MediaProviderInput';

interface Props {
  onSelect: (media: IMedia) => void;
}

export const MediaProvider: React.FC<Props> = (props: Props) => {
  return <MediaSearchForm AutocompleteComponent={MediaProviderInput} onSelect={props.onSelect} />;
};
