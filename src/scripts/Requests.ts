import { Events } from "../utils/Utils";

import Logger from "./Logger";

const ipcRenderer = window.require("electron").ipcRenderer;

class Requests {

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

		})

		ipcRenderer.send(Events.REQUESTS_POST, { url, data });

		return prom;
	}

}

export default Requests;