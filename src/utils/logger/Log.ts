import { getTime } from 'date-fns';

export class Log {
  message: string;
  payload: any;

  constructor(message: string, data?: object) {
    this.message = message;
    this.payload = Object.assign({}, data, {
      timestamp: getTime(Date.now()),
    });
  }
}
