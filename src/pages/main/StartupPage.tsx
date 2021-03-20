import React, { useEffect } from "react";

import DiscordRPC from '../../scripts/DiscordRPC';
import { mainLogger } from '../../utils/Utils';

import "./StartupPage.css"

const log = mainLogger();

const StartupPage: React.FC = () => {

	useEffect(() => {
		configure();
		checkSetup();
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
		<div className="ol-starup-main-content">
			<div className="ol-logo-info">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</div>
		</div>
	);
};

export default StartupPage;