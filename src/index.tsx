import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Providers from "./Providers";
import Logger from "./utils/Logger";

import ReactModal from "react-modal";


import App from "./App";

Logger.initialise();

ReactModal.setAppElement("#root");

ReactDOM.render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
