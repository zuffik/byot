import * as React from 'react';
import {MediaAutocompleteInput, MediaAutocompleteInputProps} from './MediaAutocompleteInput';
import {useSelector, useDispatch} from 'react-redux';
import {WebAppState} from '../../../redux/WebAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {MediaSearch} from '../../../redux/process/media/MediaSearch';

interface Props extends MediaAutocompleteInputProps {}

export const MediaProviderInput: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const media = useSelector((state: WebAppState) => state.mediaProvided);
  const onTextChange = (query: string) =>
    dispatch(ProcessActionExtractor.dispatch(MediaSearch, {filter: {query}}));
  return <MediaAutocompleteInput media={media} onTextChange={onTextChange} {...props} />;
};
