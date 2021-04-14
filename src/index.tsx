import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Providers from "./Providers";

import ReactModal from "react-modal";

import App from "./App";

const log = window.require("electron-log");
log.transports.file.fileName = "main.log";
log.transports.file.getFile().clear();
log.transports.file.format = "[{h}:{i}:{s}] [{level} from {processType}] {text}";

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
