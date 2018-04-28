export class ConsoleMock {
  log: any;
  error: any;
  warn: any;
  info: any;
  debug: any;

  spy() {
    this.log = jest.spyOn(console, 'log').mockImplementation(emptyMockImplementation);
    this.error = jest.spyOn(console, 'error').mockImplementation(emptyMockImplementation);
    this.warn = jest.spyOn(console, 'warn').mockImplementation(emptyMockImplementation);
    this.info = jest.spyOn(console, 'info').mockImplementation(emptyMockImplementation);
    this.debug = jest.spyOn(console, 'debug').mockImplementation(emptyMockImplementation);
  }

  clearSpies() {
    this.log.mockRestore();
    this.error.mockRestore();
    this.warn.mockRestore();
    this.info.mockRestore();
    this.debug.mockRestore();
  }
}

const emptyMockImplementation = () => {
};
