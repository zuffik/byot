import * as moment from 'moment';
import { DateTime } from '../graphql/ts/types';

export const timestampToDateTime = (value: number | moment.Moment): DateTime => {
  const date = moment(value);
  return {
    timestamp: +date,
    humanReadable: date.format(),
    iso: date.toISOString(),
  };
};

export const timestampToDateTimeORMTransformer = {
  to: (value: DateTime): number => value.timestamp,
  from: (value: number): DateTime => timestampToDateTime(value),
};
