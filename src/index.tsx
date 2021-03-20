import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Providers from "./Providers";
import ReactModal from 'react-modal';

import App from './App';

ReactModal.setAppElement("#root");

ReactDOM.render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
