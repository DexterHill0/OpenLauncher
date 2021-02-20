import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

defineCustomElements(window);

serviceWorker.unregister();
