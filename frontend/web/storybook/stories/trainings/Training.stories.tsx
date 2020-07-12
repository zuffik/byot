import * as React from 'react';
import {training} from '../../fixtures/dto/Training';
import {TrainingListItem} from '@byot-frontend/web-app/src/components/training/training/TrainingListItem';
import {TrainingListItemImagePlaceholder} from '@byot-frontend/web-app/src/components/training/training/TrainingListItemImagePlaceholder';
import {TrainingListItemSkeleton} from '@byot-frontend/web-app/src/components/training/training/TrainingListItemSkeleton';

export default {
  title: 'Trainings/Training',
};

export const skeleton = () => <TrainingListItemSkeleton />;

export const listItemImagePlaceholder = () => <TrainingListItemImagePlaceholder />;

export const listItem = () => <TrainingListItem training={training()} />;
