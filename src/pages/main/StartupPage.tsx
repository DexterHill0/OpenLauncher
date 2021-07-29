import React, { useEffect, useState } from "react";

import { IoLogoGithub } from "react-icons/io5";
import Icon from "../../components/icons/Icon";
import LoadingSpinner from "../../components/LoadingSpinner";

import DiscordRPC from "../../scripts/DiscordRPC";
import openReportFilled from "../../utils/OpenNewReport";
import Logger from "../../scripts/Logger";

import styles from "../css/StartupPage.module.css"


const StartupPage: React.FC = () => {

	const isFirstTime = false; //localStorage.getItem("isFirstLaunch") === "true";

	useEffect(() => {
		configure();
	}, []);

	const configure = () => {
		Logger.log("OpenLauncher active!");

		if (isFirstTime) {
			//window.location.href = "/setup/"
			localStorage.setItem("isFirstLaunch", "true")
		}

		DiscordRPC.checkStatus().then(() => {
			Logger.log("Discord RPC active");
		}).catch(() => {
			Logger.error("Discord RPC failed to initialise!");
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