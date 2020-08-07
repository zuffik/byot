import {IPagination} from '../../interfaces/IPagination';

export type Filter<A = {}> = A & {
  pagination?: IPagination;
  query?: string;
  reset?: boolean;
};
