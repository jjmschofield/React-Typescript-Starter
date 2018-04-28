import { format } from 'date-fns';
import { ILoggerTransport } from '../ILoggerTransport';
import { LOG_LEVEL } from '../../LOG_LEVEL';
import { Log } from '../../Log';

export class ConsoleTransport implements ILoggerTransport {
  private logLevel: LOG_LEVEL;

  constructor(logLevel: LOG_LEVEL) {
    this.logLevel = logLevel;
  }

  log(log: Log, level: LOG_LEVEL) {
    if (level <= this.logLevel) {
      const logMethod = getLogMethod(level);
      logMethod(getFormattedMessage(log), log.payload);
    }
  }

  getLogLevel() {
    return this.logLevel;
  }

  setLogLevel(level: LOG_LEVEL) {
    this.logLevel = level;
    return this.getLogLevel();
  }
}

const getLogMethod = (level: LOG_LEVEL) => {
  if (level <= 3) return console.error;
  if (level <= 4) return console.warn;
  if (level <= 5) return console.log;
  if (level <= 6) return console.info;
  return console.debug;
};

const getFormattedMessage = (log: Log) => {
  return `${format(log.payload.timestamp)} - ${log.message}`;
};
