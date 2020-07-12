import * as React from 'react';
import {training} from '../../fixtures/dto/Training';
import {TrainingListItem} from '@byot-frontend/web-app/src/components/training/training/TrainingListItem';
import {TrainingListItemImagePlaceholder} from '@byot-frontend/web-app/src/components/training/training/TrainingListItemImagePlaceholder';
import {TrainingListItemSkeleton} from '@byot-frontend/web-app/src/components/training/training/TrainingListItemSkeleton';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import * as _ from 'lodash';
import {action} from '@storybook/addon-actions';
import {TrainingList} from '@byot-frontend/web-app/src/components/training/training/TrainingList';

export default {
  title: 'Trainings/Training',
};

export const skeleton = () => <TrainingListItemSkeleton />;

export const listItemImagePlaceholder = () => <TrainingListItemImagePlaceholder />;

export const listItem = () => <TrainingListItem training={training()} />;

export const list = () => {
  const items = new IterableResource(_.times(10, () => training()));
  items.totalCount = 20;
  return <TrainingList items={items} onLoadMore={action('onLoadMore')} />;
};
