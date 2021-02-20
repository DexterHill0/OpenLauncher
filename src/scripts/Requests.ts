import { Events, mainLogger } from "../utils/Utils";

const log = mainLogger();

const ipcRenderer = window.require("electron").ipcRenderer;

class Requests {

    static post(url: string, data: object, success: (data: any) => void, error?: (err: any) => void): void {
        log.log(`Senging POST request to: ${url}`);

        ipcRenderer.once(Events.REQUEST_COMPLETE, (_event: any, data: any) => {
            data = data[0];

            if (data.hasError) {
                error && error(data.error);
                log.log("Error while sending POST request!");
                return;
            }

            log.log("POST request complete!");
            success(data);
        });

        ipcRenderer.send(Events.REQUESTS_POST, { "url": url, "data": data })
    }

}

export default Requests;