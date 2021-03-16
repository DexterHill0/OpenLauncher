import { Events, mainLogger, readConfig } from "../../utils/Utils";

const ipcRenderer = window.require("electron").ipcRenderer;

const log = mainLogger();

class Notification {
    static display(title: string, body: string) {
        if (!readConfig("settings")["allowNotifications"]) return;

        log.info("Showing notification");
        ipcRenderer.send(Events.NOTIFICATION, { title, body });
    }
}

export default Notification;