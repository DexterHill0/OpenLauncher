import ini from "ini";
import $ from "jquery";
import _set from "lodash.set";
import _get from "lodash.get";

var fs = window.require("fs");
const electronlog = window.require("electron-log");

export function getOS() { //Returns what os the system is
	if (navigator.appVersion.indexOf("Win") !== -1) return "win";
	if (navigator.appVersion.indexOf("Mac") !== -1) return "osx";
	return "unsup-os"
}

export const Events = { //The events that can be used to communicate with the electron render process
	DOCK_BOUNCE: "OL-DOCK-BOUNCE",

	RPC_SET_ACTIVITY: "OL-SET-RPC-ACTIVITY",
	RPC_HAS_INIT: "OL-RPC-HAS-INIT",

	REQUESTS_POST: "OL-REQUESTS-POST",
	REQUESTS_GET: "OL-REQUESTS-GET",
	REQUEST_COMPLETE: "OL-REQUEST-COMPLETE",
}

export const SupportedLaunchersFull = ["Epic Games Launcher", "Steam"]; //The launchers we currently support (their full names)
export const SupportedLaunchersShort = ["epic", "steam"];

export const userDirectory = window.require('os').homedir(); //Gets home directory like "/Users/.../"
export const appDataPath = `${getOS() === "win" ? `${userDirectory}/AppData` : `${userDirectory}/Library/Application Support`}`
export const configPath = `${appDataPath}${getOS() === "win" ? "/Roaming/" : "/Library/Application Support/"}OpenLauncher/config.ini`

export function iniParse(path?: string) { //Reads the ini config file
	try {
		return ini.parse(fs.readFileSync(path, "utf-8"));
	} catch (e) {
		return {};
	}
}

export function writeConfig(data: any, key?: string) { //Writes to the ini config file
	let config = iniParse(configPath);

	if (key) {
		_set(config, key, data);
	}
	else {
		config = data;
	}

	fs.writeFileSync(configPath, ini.stringify(config));
}
export function readConfig(key?: string) { //Reads the ini config file
	let config = iniParse(configPath);

	if (key) return _get(config, key, {});

	return config;
}
export function clearConfig(key?: string) { //Clears the specified path in the config file or clears the full file.
	let config = readConfig();

	if (key) {
		_set(config, key, {});
	}
	else {
		config = {};
	}

	writeConfig(config, key);
}

export function mainLogger() { //This is the main logger 
	const log = electronlog;
	log.transports.file.fileName = "main.log";
	log.transports.file.getFile().clear();
	log.transports.file.format = "[{h}:{i}:{s}] [{level} from {processType}] {text}";

	return log;
}

export function setupLogger() { //This logger is only used during setup
	const log = electronlog.create('setup');
	log.transports.file.fileName = "setup.log";
	log.transports.file.getFile().clear();
	log.transports.file.format = "[{h}:{i}:{s}] [{level}] {text}";

	return log;
}

export function animateInvalidInput(el: string) { //Shakes a specified input box (used if the input is invalid). The animation should be in the css file, this just adds the class
	$(el).addClass("glow-input");
	$(el).on("animationend", () => {
		$(el).removeClass("glow-input");
	});
}

export function changeBackdrop(enabled: boolean) {
	if (enabled) {
		$("body").append("<ion-backdrop class=\"ol-backdrop\" style=\"opacity: 0.6;\"></ion-backdrop>");
	}
	else {
		$(".ol-backdrop").remove();
	}
}
