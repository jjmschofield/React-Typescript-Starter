import { ILoggerTransport } from './transports/ILoggerTransport';
import { Logger } from './Logger';

export * from './transports/index';
export { LOG_LEVEL } from './LOG_LEVEL';

export let log: Logger;

export const initLogger = (transports: ILoggerTransport[]) => {
  log = new Logger(transports);
};
