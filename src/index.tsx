import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ConsoleTransport, initLogger, LOG_LEVEL, log } from './utils/logger';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

initLogger([new ConsoleTransport(LOG_LEVEL.DEBUG)]);
log.debug('App starting');

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
