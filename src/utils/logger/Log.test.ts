import { isDate, parse } from 'date-fns';
import { Log } from './Log';

describe('src/utils/logger/Log.ts', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Log', () => {
    describe('when constructed', () => {
      it('should set the provided message as the log message', () => {
        const expectedLogMessage = 'some message';
        const underTest = new Log(expectedLogMessage);
        expect(underTest.message).toEqual(expectedLogMessage);
      });

      it('should add a timestamp to the log payload', () => {
        const underTest = new Log('some message');
        const parsedTimestamp = parse(underTest.payload.timestamp);
        expect(isDate(parsedTimestamp)).toEqual(true);
      });

      describe('when a data object has been provided', () => {
        it('should add the provided data to the log payload', () => {
          const expectedData = { someKey: 'some value' };
          const underTest = new Log('some message', expectedData);
          expect(underTest.payload).toEqual(expect.objectContaining(expectedData));
          expect(underTest.payload).toBeDefined();
        });
      });
    });
  });
});
