import { Events } from "../utils/Utils";

import Logger from "./Logger";

const ipcRenderer = window.require("electron").ipcRenderer;

class Requests {

	//Electron docs say to do all communication with IPC
	//It's kinda messy but `remote` is (going to be) deprecated so, better do it like this

	static Session = class {

		static create(name: string): Promise<void> {
			Logger.log(`Creating new session: ${name}`);

			//The handler in the main process will call the same event to signal that the function has successfully executed
			//Any errors are just logged (and do not call the event so the promise wont complete)
			const prom = new Promise<void>((resolve) => {
				ipcRenderer.once(Events.REQUESTS_SESSION_CREATE, (_event: any) => resolve(undefined));
			});

			ipcRenderer.send(Events.REQUESTS_SESSION_CREATE, { name });

			return prom;
		}

		static setCookies(sessionName: string, cookies: { name: string, value: string }): Promise<void> {

			const prom = new Promise<void>((resolve) => {
				ipcRenderer.once(Events.REQUESTS_SESSION_SET_COOKIES, (_event: any) => resolve(undefined));
			});

			ipcRenderer.send(Events.REQUESTS_SESSION_SET_COOKIES, { sessionName, cookies });

			return prom;
		}

		static getCookies(sessionName: string): Promise<any> {
			const prom = new Promise<any>((resolve) => {
				ipcRenderer.once(Events.REQUESTS_SESSION_GET_COOKIES, (_event: any, data: any) => {
					resolve(data[0]);
				});
			});

			ipcRenderer.send(Events.REQUESTS_SESSION_GET_COOKIES, { sessionName });

			return prom;
		}
	}

	static post(url: string, data: object): Promise<any> {
		Logger.log(`Senging POST request to: ${url}`);

		const prom = new Promise<any>((resolve, reject) => {

			ipcRenderer.once(Events.REQUEST_COMPLETE, (_event: any, data: any) => {
				data = data[0];

				if (data.hasError) {
					Logger.error(`Error while sending POST request: ${data.error}`);
					reject(data.error);
					return;
				}

				Logger.log("POST request complete!");
				resolve(data);
			});

		});

		ipcRenderer.send(Events.REQUESTS_POST, { url, data });

		return prom;
	}

}

export default Requests;