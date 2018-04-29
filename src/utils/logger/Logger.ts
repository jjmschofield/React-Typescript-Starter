import { ILoggerTransport } from './transports/ILoggerTransport';
import { Log } from './Log';
import { LOG_LEVEL } from './LOG_LEVEL';

export class Logger {
  private transports: ILoggerTransport[];
  emergency: (message: string, data?:object) => void;
  alert: (message: string, data?:object) => void;
  critical: (message: string, data?:object) => void;
  error: (message: string, data?:object) => void;
  warning: (message: string, data?:object) => void;
  notice: (message: string, data?:object) => void;
  info: (message: string, data?:object) => void;
  debug: (message: string, data?:object) => void;

  constructor(transports?: ILoggerTransport[]) {
    this.transports = transports || [];
    this.attachLogLevelWrappers();
  }

  private attachLogLevelWrappers() {
    Object.keys(LOG_LEVEL).forEach((key) => {
      this[key.toLowerCase()] = (message: string, data?: object) => {
        this.log(LOG_LEVEL[key], message, data);
      };
    });
  }

  addTransport(transport: ILoggerTransport) {
    this.transports.push(transport);
  }

  log(level: LOG_LEVEL, message: string, data?: object) {
    this.transports.forEach((transport) => {
      const log = new Log(message, level, data);
      transport.log(log, level);
    });
  }
}
