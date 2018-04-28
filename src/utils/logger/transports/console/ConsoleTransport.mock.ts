import { ILoggerTransport } from '../ILoggerTransport';

export class ConsoleTransportMock implements ILoggerTransport {
  log: any;
  setLogLevel: any;
  getLogLevel: any;

  constructor() {
    this.log = jest.fn();
    this.setLogLevel = jest.fn();
    this.getLogLevel = jest.fn();
  }
}
