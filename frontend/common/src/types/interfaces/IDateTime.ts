import {DateTime} from '@byot/common/graphql/ts/types';
import {Moment} from 'moment';

export type IDateTime = DateTime & {moment: Moment};
