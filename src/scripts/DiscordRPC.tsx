import { Events, writeConfig } from "../utils/Utils";

/**
 * The electron render process is considered a browser. A browser requires a websocket connetion to Discord however
 * that requires you to be whitelisted by Discord. Instead, we can use an ipc conection but that has to run in the main 
 * electron process because it is not considered a browser.
 */

const ipcRenderer = window.require("electron").ipcRenderer;

class Discord {

	/**
	 * Checks if RPC was initialised by getting the status from an event
	 */
	static checkRPC(onInit: () => void, onError?: () => void): void {
		ipcRenderer.on(Events.RPC_HAS_INIT, (_event: any, init: any) => {
			init ? onInit() : onError && onError();
			writeConfig(init.toString(), "settings.discord.rpcWorking");
		});

		ipcRenderer.send(Events.RPC_HAS_INIT);
	}

	/**
	 * Sets the users activity
	 */
	static setActivity(ac: any): void {
		ipcRenderer.send(Events.RPC_SET_ACTIVITY, ac);
	}
}

export default Discord;