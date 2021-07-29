const logger = window.require("electron-log");

const setupLogger = () => {
	logger.transports.file.fileName = "main.log";
	logger.transports.file.getFile().clear();
	logger.transports.file.format = "[{h}:{i}:{s}] [{level} from {processType}] {text}";

	//Redirect errors to log file too
	process.on("uncaughtException", (err) => logger.error(err));
	process.on("unhandledRejection", (err) => logger.error(err));
}

export default logger;
export { setupLogger };