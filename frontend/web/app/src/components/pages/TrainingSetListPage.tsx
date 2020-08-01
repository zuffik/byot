import * as React from 'react';
import {ControlPanelTwoColumnsContent} from '../control-panel/base/ControlPanelTwoColumnsContent';
import {SearchField} from '../control-panel/search/SearchField';
import {TrainingSetList} from '../training/set/TrainingSetList';
import {useSelector, useDispatch} from 'react-redux';
import {WebAppState} from '../../redux/WebAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {FetchTrainingSets} from '../../redux/process/training-set/FetchTrainingSets';
import {ControlPanelTitle} from '../control-panel/base/ControlPanelTitle';
import {useTranslation} from 'react-i18next';
import {ControlPanelTwoColumnsMainContent} from '../control-panel/base/ControlPanelTwoColumnsMainContent';

interface Props {}

export const TrainingSetListPage: React.FC<Props> = (props: Props) => {
  const limit = 24;
  const dispatch = useDispatch();
  const filter = useSelector((state: WebAppState) => state.trainingSetListFilter);
  const items = useSelector((state: WebAppState) => state.trainingSetListItems);
  const onChange = (query: string) =>
    dispatch(
      ProcessActionExtractor.dispatch(FetchTrainingSets, {
        filter: {...filter, query, reset: true},
      })
    );
  const onLoadMore = (offset: number, limit: number) =>
    dispatch(
      ProcessActionExtractor.dispatch(FetchTrainingSets, {filter: {...filter, pagination: {limit, offset}}})
    );
  const {t} = useTranslation();

  React.useEffect(() => {
    dispatch(
      ProcessActionExtractor.dispatch(FetchTrainingSets, {
        filter: {...filter, pagination: {limit, offset: 0}, reset: true},
      })
    );
    // what the fuck?
    // eslint-disable-next-line
  }, []);

  return (
    <ControlPanelTwoColumnsContent
      secondaryContent={<SearchField onChange={onChange} value={filter.query || ''} />}>
      <ControlPanelTwoColumnsMainContent>
        <ControlPanelTitle>{t('My training sets')}</ControlPanelTitle>
        <TrainingSetList limit={limit} items={items} onLoadMore={onLoadMore} />
      </ControlPanelTwoColumnsMainContent>
    </ControlPanelTwoColumnsContent>
  );
};
