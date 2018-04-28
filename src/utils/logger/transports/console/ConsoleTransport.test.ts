import { format } from 'date-fns';
import { ConsoleTransport } from './ConsoleTransport';
import { Log } from '../../Log';
import { LOG_LEVEL } from '../../LOG_LEVEL';
import { ConsoleMock } from './test/console.mock';

describe('src/utils/logger/transports/ConsoleTransport.ts', () => {

  const consoleMock = new ConsoleMock();

  beforeEach(() => {
    consoleMock.spy();
  });

  afterEach(() => {
    consoleMock.clearSpies();
    jest.resetAllMocks();
  });

  describe('log', () => {
    describe('when asked to log at or below the currently set logging level', () => {
      let underTest: ConsoleTransport;
      let expectedLog: Log;
      let expectedLogData: object;
      let expectedConsoleMessage: string;

      beforeEach(() => {
        underTest = new ConsoleTransport(LOG_LEVEL.DEBUG);
        expectedLogData = { someKey: 'some value' };
        expectedLog = new Log('some message', expectedLogData);
        expectedLog.payload.timestamp = 0;
        expectedConsoleMessage =
          `${format(expectedLog.payload.timestamp)} - ${expectedLog.message}`;
      });

      describe('when asked to log an emergency', () => {
        it('should log an error with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.EMERGENCY);
          expect(consoleMock.error).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log an alert', () => {
        it('should log an error with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.ALERT);
          expect(consoleMock.error).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log a critical', () => {
        it('should log an error with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.CRITICAL);
          expect(consoleMock.error).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log an error', () => {
        it('should log an error with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.ERROR);
          expect(consoleMock.error).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log an warning', () => {
        it('should log a warn with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.WARNING);
          expect(consoleMock.warn).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log a notice', () => {
        it('should log with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.NOTICE);
          expect(consoleMock.log).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log an info', () => {
        it('should log an info with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.INFO);
          expect(consoleMock.info).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });

      describe('when asked to log a debug', () => {
        it('should log an debug with the expected message and payload', () => {
          underTest.log(expectedLog, LOG_LEVEL.DEBUG);
          expect(consoleMock.debug).toBeCalledWith(expectedConsoleMessage, expectedLog.payload);
        });
      });
    });

    describe('or when asked to log above the currently set logging level', () => {
      let underTest: ConsoleTransport;

      beforeEach(() => {
        underTest = new ConsoleTransport(LOG_LEVEL.EMERGENCY);
      });

      it('should not log', () => {
        const log = new Log('some log message');
        underTest.log(log, LOG_LEVEL.DEBUG);
        expect(consoleMock.debug).not.toBeCalled();
      });
    });
  });

  describe('getLogLevel', () => {
    it('should return the current log level', () => {
      const expectedLogLevel = LOG_LEVEL.INFO;
      const underTest = new ConsoleTransport(expectedLogLevel);
      const result = underTest.getLogLevel();
      expect(result).toEqual(expectedLogLevel);
    });
  });

  describe('setLogLevel', () => {
    it('should set a new log level', () => {
      const expectedLogLevel = LOG_LEVEL.INFO;
      const underTest = new ConsoleTransport(LOG_LEVEL.EMERGENCY);
      const result = underTest.setLogLevel(expectedLogLevel);
      expect(result).toEqual(expectedLogLevel);
      expect(underTest.getLogLevel()).toEqual(expectedLogLevel);
    });
  });
});
