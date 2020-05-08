import * as moment from 'moment';
import { DateTime } from '../graphql/ts/types';

export const timestampToDateTime = (
  value?: string | moment.Moment,
): DateTime => {
  if (value === undefined || value === null) return undefined;
  const date = moment(value);
  return {
    humanReadable: date.format(),
    iso: date.toISOString(),
  };
};

export const timestampToDateTimeORMTransformer = {
  to: (value: DateTime): string | null =>
    value === null ? null : value?.iso || moment().toISOString(),
  from: (value: string): DateTime => timestampToDateTime(value),
};
