import React, { useEffect } from 'react';
import { IonContent, IonLabel, IonProgressBar } from '@ionic/react';

import Discord from '../../../scripts/DiscordRPC';
import { mainLogger } from '../../../utils/Utils';

import "./StartupPage.css"

const log = mainLogger();

const StartupPage: React.FC = () => {

	useEffect(() => {
		configure();
		checkSetup();
	}, []);

	const configure = () => {
		log.log("OpenLauncher active!");
	}

	const checkSetup = () => { //This function is run as the content loads. It checks if all the setups have been completed.
		Discord.checkRPC(() => {
			log.log("RPC active!");
			//Discord.setActivity({});
		}, () => {
			log.error("RPC failed to initialise!");
			//createDialog("Could not initialise Rich Presence!", 1000, "err");
		});

		window.location.href = "/setup/";


		// let config = readConfig();

		// let completed: string[] = [];

		// //If there is no "setup" object, this is the first run on the program
		// if (config.setup !== undefined || config.setup?.completed !== undefined) {
		// 	completed = config.setup.completed;
		// }

		// //We get the difference of the two arrays because if an update is downloaded that adds support for a new launcher,
		// //it won't exist in the config file. This means it will be placed into "difference" so we can then use this to 
		// //display individual setup pages that the user hasn't seen before
		// let pages = SupportedLaunchers.filter(x => !completed.includes(x));

		// if (pages.length === 0) return; //If all setup pages are completed, just ignore everything

		//Checks to see if the setup is complete. If it isn't, it redirects the user to the setup page.
		// if (!fs.existsSync(configPath)) {
		// 	window.location.href = "/setup/";
		// }
		// else {
		// 	let config = readConfig();
		// 	if (config.setup !== undefined || config.setup?.completed !== undefined) {
		// 		window.location.href = "/setup/";
		// 	}
		// }
	}

	return (
		<IonContent class="ol-starup-main-content" scrollX={false} scrollY={false}>
			<div className="ol-centre-box">
				<div className="ol-starup-loading-text">
					Starting...
				</div>

				<IonProgressBar class="ol-startup-loading" type="indeterminate"></IonProgressBar><br />
			</div>
			<IonLabel class="ol-dont-get-me-sued">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</IonLabel>
		</IonContent>
	);
};

export default StartupPage;