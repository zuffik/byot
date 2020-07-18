import * as React from 'react';
import {trainingSet} from '../../fixtures/dto/TrainingSet';
import {TrainingSetListItem} from '@byot-frontend/web-app/src/components/training/set/TrainingSetListItem';
import {TrainingSetListItemImagePlaceholder} from '@byot-frontend/web-app/src/components/training/set/TrainingSetListItemImagePlaceholder';
import {TrainingSetListItemSkeleton} from '@byot-frontend/web-app/src/components/training/set/TrainingSetListItemSkeleton';
import {TrainingSetList} from '@byot-frontend/web-app/src/components/training/set/TrainingSetList';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import * as _ from 'lodash';
import {action} from '@storybook/addon-actions';
import {TrainingSetForm} from '@byot-frontend/web-app/src/components/training/set/TrainingSetForm';

export default {
  title: 'Trainings/Training set',
};

export const placeholder = () => <TrainingSetListItemImagePlaceholder />;

export const skeleton = () => <TrainingSetListItemSkeleton />;

export const listItem = () => <TrainingSetListItem trainingSet={trainingSet()} />;

export const list = () => {
  const items = new IterableResource(_.times(10, () => trainingSet()));
  items.totalCount = 20;
  return <TrainingSetList items={items} onLoadMore={action('onLoadMore')} />;
};

export const form = () => <TrainingSetForm onSave={action('onSave')} />;
