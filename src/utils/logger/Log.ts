import { getTime } from 'date-fns';
import { LOG_LEVEL } from './LOG_LEVEL';

export class Log {
  message: string;
  payload: any;

  constructor(message: string, level: LOG_LEVEL, data?: object) {
    this.message = message;
    this.payload = Object.assign({}, getDefaultLogPayload(level), data);
  }
}

const getDefaultLogPayload = (level: LOG_LEVEL) => {
  return {
    level,
    timestamp: getTime(Date.now()),
  };
};
