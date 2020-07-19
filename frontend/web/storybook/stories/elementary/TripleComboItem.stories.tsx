import * as React from 'react';
import {text} from '@storybook/addon-knobs';
import {getImage, size} from '../../../../common/test/fixtures/GetImage';
import {TripleComboItemSkeleton} from '@byot-frontend/web-app/src/components/elements/list-items/TripleComboItemSkeleton';
import {TripleComboItem} from '@byot-frontend/web-app/src/components/elements/list-items/TripleComboItem';
import {TripleComboItemSkeletonList} from '@byot-frontend/web-app/src/components/list/TripleComboItemSkeletonList';

export default {
  title: 'Elementary/Triple combo item',
};

export const empty = () => <TripleComboItem />;

export const titleOnly = () => <TripleComboItem title={text('Title', 'Title')} />;

export const descriptionOnly = () => <TripleComboItem description={text('Description', 'Description')} />;

export const bothText = () => (
  <TripleComboItem title={text('Title', 'Title')} description={text('Description', 'Description')} />
);

export const titleOnlyWithImage = () => (
  <TripleComboItem image={getImage(size(50))} title={text('Title', 'Title')} />
);

export const descriptionOnlyWithImage = () => (
  <TripleComboItem image={getImage(size(50))} description={text('Description', 'Description')} />
);

export const bothTextWithImage = () => (
  <TripleComboItem
    image={getImage(size(50))}
    title={text('Title', 'Title')}
    description={text('Description', 'Description')}
  />
);

export const skeleton = () => <TripleComboItemSkeleton />;

export const skeletonList = () => <TripleComboItemSkeletonList />;
