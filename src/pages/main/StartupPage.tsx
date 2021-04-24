import React, { useEffect, useState } from "react";

import DiscordRPC from "../../scripts/DiscordRPC";
import openReportFilled from "../../utils/OpenNewReport";

import { Icon, LogoGithub } from "../../components/icons/Icons";
import LoadingSpinner from "../../components/LoadingSpinner";

import "../css/StartupPage.css"


const log = window.require("electron-log");

const StartupPage: React.FC = () => {

	const [isFirstTime, setFirstTime] = useState(1);

	useEffect(() => {
		configure();
	}, []);

	const configure = () => {
		log.log("OpenLauncher started");

		localStorage.setItem("isFirstLaunch", "") // debug

		if (localStorage.getItem("isFirstLaunch") === "true") {
			setFirstTime(0)
		}
		else {
			//window.location.href = "/setup/"
			localStorage.setItem("isFirstLaunch", "true")
		}

		DiscordRPC.checkStatus().then(() => {
			log.log("RPC active");
		}).catch(() => {
			log.error("RPC failed to initialise!");
		});
	}

	return (
		<div className="ol-startup-page">

			<div className="ol-startup-centre-content">
				<LoadingSpinner class="ol-startup-spinner" />
				<div className="ol-startup-welcome-text">{isFirstTime ? "Welcome!" : "Welcome Back!"}</div>
			</div>

			<div className="ol-startup-bug-report" onClick={openReportFilled}>
				<Icon icon={LogoGithub} stroke="white"></Icon>
				<div className="ol-startup-bug-report-text">Found a bug? Report it!</div>
			</div>

			<div className="ol-logo-info">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</div>

		</div>
	);
};

export default StartupPage;