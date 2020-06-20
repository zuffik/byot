import {IDateTime} from '../interfaces/IDateTime';
import moment from 'moment';

export class DateTime implements IDateTime {
  public humanReadable: string;
  public iso: string;

  constructor(dateTime?: IDateTime) {
    if (!dateTime) {
      const curr = moment();
      this.iso = curr.toISOString();
      this.humanReadable = curr.format('DD.MM.YYYY HH:ss');
    } else {
      this.iso = dateTime.iso;
      this.humanReadable = dateTime.humanReadable;
    }
  }
}
