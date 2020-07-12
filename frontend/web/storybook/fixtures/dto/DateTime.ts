import {IDateTime} from '@byot-frontend/common/src/types/interfaces/IDateTime';
import {DateTime} from '@byot-frontend/common/src/types/dto/DateTime';
import * as moment from 'moment';
import {mocker} from '../../helpers/Mocker';

export const dateTime = (): IDateTime => {
  const m = moment(mocker.date({max: new Date(), min: moment('2020-01-01').toDate()}));
  return new DateTime({
    moment: m,
    iso: m.toISOString(),
    humanReadable: m.format('DD.MM.YYYY HH:mm'),
  });
};
