import $ from "jquery";

/**
 * Returns what os the system is
 */
export function getOS(): "win" | "osx" | "unsup-os" {
	if (navigator.appVersion.indexOf("Win") !== -1) return "win";
	if (navigator.appVersion.indexOf("Mac") !== -1) return "osx";
	return "unsup-os";
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

	REQUESTS_SESSION_CREATE: "OL-SESSION-CREATE",
	REQUESTS_SESSION_SET_COOKIES: "OL-SESSION-SET-COOKIES",
	REQUESTS_SESSION_GET_COOKIES: "OL-SESSION-GET-COOKIES",
}

/**
 * Generates a random hex string of length `size`
 */
export const randHexString = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");

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
export const userDirectory = window.require("os").homedir();

/**
 * WINDOWS: `C:/Users/.../AppData`
 * 
 * OSX: `/Users/.../Library/Application Support`
 */
export const appDataPath = `${getOS() === "win" ? `${userDirectory}/AppData` : `${userDirectory}/Library/Application Support`}`

/**
 * Log file location
 */
export const logFilePath = `${appDataPath}${getOS() === "win" ? "/Roaming/" : "/Library/Application Support/"}OpenLauncher/logs/main.log`


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
