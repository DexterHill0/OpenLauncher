import React, { useEffect, useState } from "react";

import DiscordRPC from "../../scripts/DiscordRPC";
import Logger from "../../utils/Logger";

import LoadingSpinner from "../../components/LoadingSpinner"

import "../css/StartupPage.css"

const log = Logger.getMainLogger();

const StartupPage: React.FC = () => {

	const [isFirstTime, setFirstTime] = useState(1);

	useEffect(() => {
		configure();
	}, []);

	const configure = () => {
		log.log("OpenLauncher started");

		DiscordRPC.checkStatus().then(() => {
			log.log("RPC active");
		}).catch(() => {
			log.error("RPC failed to initialise!");
		});
	}

	const checkSetup = () => { //This function is run as the content loads. It checks if all the setups have been completed.


	}

	return (
		<div className="ol-startup-page">

			<div className="ol-startup-content">
				<LoadingSpinner class="ol-startup-spinner" />
				<div className="ol-startup-welcome-text">{isFirstTime ? "Welcome!" : "Welcome Back!"}</div>
			</div>

			<div className="ol-logo-info">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</div>

		</div>
	);
};

export default StartupPage;