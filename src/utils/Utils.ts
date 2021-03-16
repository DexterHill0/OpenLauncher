import ini from "ini";
import $ from "jquery";
import _set from "lodash.set";
import _get from "lodash.get";

const fs = window.require("fs");
const electronlog = window.require("electron-log");

/**
 * Returns what os the system is
 */
export function getOS(): "win" | "osx" | "unsup-os" {
	if (navigator.appVersion.indexOf("Win") !== -1) return "win";
	if (navigator.appVersion.indexOf("Mac") !== -1) return "osx";
	return "unsup-os"
}

/**
 * The events that can be used to communicate with the main electron process
 */
export const Events = {
	DOCK_BOUNCE: "OL-DOCK-BOUNCE",
	NOTIFICATION: "OL-NOTIFICATION",

	RPC_SET_ACTIVITY: "OL-SET-RPC-ACTIVITY",
	RPC_HAS_INIT: "OL-RPC-HAS-INIT",

	REQUESTS_POST: "OL-REQUESTS-POST",
	REQUESTS_GET: "OL-REQUESTS-GET",
	REQUEST_COMPLETE: "OL-REQUEST-COMPLETE",
}

/**
 * The full names of the launchers supported
 */
export const SupportedLaunchersFull = ["Epic Games Launcher", "Steam"];
/**
 * Shortened names of the supported launchers
 */
export const SupportedLaunchersShort = ["epic", "steam"];

/**
 * WINDOWS: `C:/Users/...`
 * 
 * OSX: `/Users/...`
 */
export const userDirectory = window.require('os').homedir();

/**
 * WINDOWS: `C:/Users/.../AppData`
 * 
 * OSX: `/Users/.../Library/Application Support`
 */
export const appDataPath = `${getOS() === "win" ? `${userDirectory}/AppData` : `${userDirectory}/Library/Application Support`}`

/**
 * Config file location
 */
export const configPath = `${appDataPath}${getOS() === "win" ? "/Roaming/" : "/Library/Application Support/"}OpenLauncher/config.ini`

/**
 * Reads the ini config file
 * @param path  
 */
export function iniParse(path?: string): any {
	try {
		return ini.parse(fs.readFileSync(path, "utf-8"));
	} catch (e) {
		return {};
	}
}

/**
 * Writes to the ini config file
 * @param data 
 * @param key 
 */
export function writeConfig(data: any, key?: string): void {
	let config = iniParse(configPath);

	if (key) {
		_set(config, key, data);
	}
	else {
		config = data;
	}

	fs.writeFileSync(configPath, ini.stringify(config));
}

/**
 * Reads the ini config file
 * @param key 
 */
export function readConfig(key?: string): any {
	let config = iniParse(configPath);

	if (key) return _get(config, key, {});

	return config;
}

/**
 * Clears the specified path in the config file or clears the full file (if `key` is left blank).
 * @param key 
 */
export function clearConfig(key?: string): void {
	let config = readConfig();

	if (key) {
		_set(config, key, {});
	}
	else {
		config = {};
	}

	writeConfig(config, key);
}

/**
 * Main logger
 */
export function mainLogger(): any {
	const log = electronlog;
	log.transports.file.fileName = "main.log";
	log.transports.file.getFile().clear();
	log.transports.file.format = "[{h}:{i}:{s}] [{level} from {processType}] {text}";

	return log;
}
/**
 * The logger only used during setup
 */
export function setupLogger(): any {
	const log = electronlog.create('setup');
	log.transports.file.fileName = "setup.log";
	log.transports.file.getFile().clear();
	log.transports.file.format = "[{h}:{i}:{s}] [{level}] {text}";

	return log;
}

/**
 * Adds the classes to a specified element to glow it red (animation has to be in the CSS file)
 * @param el 
 */
export function animateInvalidInput(el: string): void {
	$(el).addClass("glow-input");
	$(el).on("animationend", () => {
		$(el).removeClass("glow-input");
	});
}

/**
 * Adds an `IonBackdrop` to the body. Disables anything on the page
 * @param enabled
 */
export function changeBackdrop(enabled: boolean): void { //Add
	if (enabled) {
		$("body").append("<ion-backdrop class=\"ol-backdrop\" style=\"opacity: 0.6;\"></ion-backdrop>");
	}
	else {
		$(".ol-backdrop").remove();
	}
}

/**
 * Disables any buttons with the `ol-input-button` class
 * @param disabled 
 */
export function disableButtons(disabled: boolean): void {
	$(".ol-input-button").prop("disabled", disabled);
}
