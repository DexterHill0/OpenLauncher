import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ReactModal from "react-modal";

import { setupLogger } from "./scripts/Logger";
import Providers from "./Providers";

import App from "./App";

setupLogger();

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
