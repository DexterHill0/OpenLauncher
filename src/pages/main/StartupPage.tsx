import React, { useEffect, useState } from "react";

import DiscordRPC from "../../scripts/DiscordRPC";
import openReportFilled from "../../utils/OpenNewReport";

import { IoLogoGithub } from "react-icons/io5";
import Icon from "../../components/icons/Icon";

import LoadingSpinner from "../../components/LoadingSpinner";

import styles from "../css/StartupPage.module.css"

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
		<div className={styles.mainPage}>

			<div className={styles.content}>
				<LoadingSpinner class={styles.spinner} />
				<div className={styles.welcomeText}>{isFirstTime ? "Welcome!" : "Welcome Back!"}</div>
			</div>

			<div className={styles.report} onClick={openReportFilled}>
				<Icon icon={IoLogoGithub}></Icon>
				<div className={styles.reportText}>Found a bug? Report it!</div>
			</div>

			<div className={styles.infoFooter}>All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</div>

		</div>
	);
};

export default StartupPage;