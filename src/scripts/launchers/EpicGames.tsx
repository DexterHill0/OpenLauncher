import React from "react";

import _set from "lodash.set";
import { animateInvalidInput, getOS } from "../../utils/Utils";
import { EPIC_PATHS } from "../constants/Paths";

const fs = window.require("fs");
const log = window.require("electron-log");

class Epic {
	// static logo = <img src={"/assets/logos/logo_epic.png"} alt="Logo" width={105} height={105}></img>;


	// static doSetup(): { [key: string]: { isValid: boolean, error: JSX.Element } } {
	// 	Settings.load();

	// 	let config = Settings.get();

	// 	const checked = Epic.checkPaths();

	// 	EPIC_PATHS.forEach(p => {
	// 		if (checked[p.iniKey] && checked[p.iniKey].isValid) {
	// 			config[p.iniKey] = p[getOS()];
	// 		}
	// 	});

	// 	Settings.set("paths.epic", config);

	// 	return checked;
	// }

	// //Moved out of setup so I can check the paths on startup
	// static checkPaths(): { [key: string]: { isValid: boolean, error: JSX.Element } } {
	// 	let checked: { [key: string]: { isValid: boolean, error: JSX.Element } } = {};


	// 	EPIC_PATHS.forEach(p => {
	// 		if (fs.existsSync(p[getOS()])) {
	// 			log.info(`Path exists: "${p[getOS()]}"`);

	// 			_set(checked, `${p.iniKey}.isValid`, true);
	// 		}
	// 		else {
	// 			log.warn(`Path does not exist: "${p[getOS()]}"`);

	// 			if (p.notFound) { //Only add the path to the object if it needs to be displayed on an error page

	// 				_set(checked, `${p.iniKey}.isValid`, false);
	// 				_set(checked, `${p.iniKey}.error`, p.notFound);
	// 			}
	// 		}
	// 	});

	// 	return checked;
	// }

	// static validateUserPath(data: string): void {
	// 	let key = "";

	// 	const isRegexValid = EPIC_PATHS.map(p => { //Compare the users path to all the regexes
	// 		if (!p || !p.checkPathReg) return false;

	// 		key = p.iniKey;
	// 		return p.checkPathReg.test(data);
	// 	});

	// 	if (isRegexValid.every(v => v === false)) { //If it didn't match any, its not a valid path
	// 		animateInvalidInput(".ol-form-path-input");
	// 		return;
	// 	};

	// 	if (!fs.existsSync(data)) { //If the path did match one, now I can check if it exists
	// 		animateInvalidInput(".ol-form-path-input");
	// 		return;
	// 	}

	// 	writeConfig(data, `paths.epic.${key}`);
	// }

	// static signIn(username: string, password: string): void {
	// 	const refreshToken = iniParse(readConfig("paths.epic.gameusersettings"))?.RememberMe?.Data;

	// 	if (refreshToken) {
	// 		//changeBackdrop(false);

	// 		//const sidWindow = new BrowserWindow({ nodeIntegration: false, frame: true });
	// 	}

	// 	// Epic.slides.current.getCurrentIndex().then(index => {
	// 	// 	Epic.slides.current.addSlide(
	// 	// 		<ErrorSlide
	// 	// 			error={<div>Please enter the string under <code>SID</code></div>}
	// 	// 			onContinue={(sid) => console.log(sid)}
	// 	// 			extraDetail={<div>Webpage didn't open? Click here to copy URL</div>}
	// 	// 		>{Epic.logo}</ErrorSlide>,
	// 	// 		index + 1
	// 	// 	);

	// 	// 	Epic.slides.current.slideNext(); //Slide to the slide just added
	// 	// 	Epic.slides.current.lockToSlide(); //Lock the user to this slide so they can't go forwards / backwards
	// 	// });
	// }

	// static didSkip() {
	// 	writeConfig(true, "accounts.ignored.epic");
	// }

};

export default Epic;