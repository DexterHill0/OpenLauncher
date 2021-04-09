const electronlog = window.require("electron-log");

class Logger {
    private static setupLogger: any;
    private static mainLogger: any;

    static initialise() {
        Logger.mainLogger = electronlog;
        Logger.setupLogger = electronlog.create("setup");


        Logger.mainLogger.transports.file.fileName = "main.log";
        Logger.mainLogger.transports.file.getFile().clear();
        Logger.mainLogger.transports.file.format = "[{h}:{i}:{s}] [{level} from {processType}] {text}";

        Logger.setupLogger.transports.file.fileName = "setup.log";
        Logger.setupLogger.transports.file.getFile().clear();
        Logger.setupLogger.transports.file.format = "[{h}:{i}:{s}] [{level}] {text}";
    }

    static getMainLogger() {
        return Logger.mainLogger;
    }

    static getSetupLogger() {
        return Logger.setupLogger
    }
}

export default Logger;