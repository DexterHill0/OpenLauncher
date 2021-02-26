import { Events, mainLogger } from "../utils/Utils";

const log = mainLogger();

const ipcRenderer = window.require("electron").ipcRenderer;

class Requests {

    static post(url: string, data: object): Promise<any> {
        log.log(`Senging POST request to: ${url}`);

        const prom = new Promise<any>((resolve, reject) => {

            ipcRenderer.once(Events.REQUEST_COMPLETE, (_event: any, data: any) => {
                data = data[0];

                if (data.hasError) {
                    reject(data.error);
                    log.error(`Error while sending POST request: ${data.error}`);
                    return;
                }

                log.log("POST request complete!");
                resolve(data);
            });

        })

        ipcRenderer.send(Events.REQUESTS_POST, { "url": url, "data": data });

        return prom;
    }

}

export default Requests;