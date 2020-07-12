import * as React from 'react';
import {trainingSet} from '../../fixtures/dto/TrainingSet';
import {TrainingSetListItem} from '@byot-frontend/web-app/src/components/training/set/TrainingSetListItem';
import {TrainingSetListItemImagePlaceholder} from '@byot-frontend/web-app/src/components/training/set/TrainingSetListItemImagePlaceholder';
import {TrainingSetListItemSkeleton} from '@byot-frontend/web-app/src/components/training/set/TrainingSetListItemSkeleton';

export default {
  title: 'Trainings/Training set',
};

export const placeholder = () => <TrainingSetListItemImagePlaceholder />;

export const skeleton = () => <TrainingSetListItemSkeleton />;

export const listItem = () => <TrainingSetListItem trainingSet={trainingSet()} />;
