import { Events, writeConfig } from "../utils/Utils";

/**
 * The electron render process is considered a browser. A browser requires a websocket connetion to Discord however
 * that requires you to be whitelisted by Discord. Instead, we can use an ipc conection but that has to run in the main 
 * electron process because it is not considered a browser.
 */

const ipcRenderer = window.require("electron").ipcRenderer;

class DiscordRPC {

	/**
	 * Checks if RPC was initialised by getting the status from an event
	 */
	static checkStatus(): Promise<void> {

		const prom = new Promise<any>((resolve, reject) => {
			ipcRenderer.on(Events.RPC_HAS_INIT, (_event: any, init: any) => {
				init ? resolve(null) : reject(null);

				writeConfig(init.toString(), "settings.discord.rpcInit");
			});
		});

		ipcRenderer.send(Events.RPC_HAS_INIT);

		return prom;
	}

	/**
	 * Sets the users activity
	 */
	static setActivity(ac: object): void {
		ipcRenderer.send(Events.RPC_SET_ACTIVITY, ac);
	}
}

export default DiscordRPC;