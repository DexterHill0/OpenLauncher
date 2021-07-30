import { app, Menu, dialog, shell } from "electron";
import contextMenu from "electron-context-menu";
import Logger from "electron-log";

import Discord from "./Discord";
import Requests from "./Requests";
import Notifications from "./Notification";
import { Window } from "./Window";

//Log uncaught errors
Logger.transports.file.format = "[{h}:{i}:{s}] [{level} from {processType}] {text}";
process.on("uncaughtException", (err) => Logger.error(err));
process.on("unhandledRejection", (err) => Logger.error(err));

let mainWindow: Window = null;
let splashScreen: Window = null;

const isDevMode = app.commandLine.hasSwitch("dev");

async function createWindow() {

	isDevMode ? null : Menu.setApplicationMenu(null);

	mainWindow = new Window({
		height: 920,
		width: 1600,
		minWidth: 1000,
		minHeight: 660,

		url: "http://localhost:3000/",

		show: false,
		titleBarStyle: "hiddenInset",
		movable: true,
		center: true,

		webPreferences: {
			nodeIntegration: true,
			devTools: isDevMode,
			enableRemoteModule: true,
		}
	});
	mainWindow.init();
	await mainWindow.loadURL();
	mainWindow.webContentsOn("will-navigate", e => e.preventDefault());

	splashScreen = new Window({
		height: 300,
		width: 300,
		url: `file://${__dirname}/../assets/splash.html`,

		show: true,
		frame: false,
		backgroundColor: "#202020",
		movable: false,
		minimizable: false,
		maximizable: false,
		resizable: true,

		webPreferences: {
			nodeIntegration: true,
			devTools: false,
		}
	});
	splashScreen.init();
	await splashScreen.loadURL();
	splashScreen.webContentsOn("will-navigate", e => e.preventDefault());

	mainWindow.on(Window.events.DOCK_BOUNCE, () => {
		app.dock.bounce("critical");
	});

	mainWindow.emit(Window.events.UPDATE_CHECK_STARTED);
	splashScreen.emit(Window.events.SPLASH_SCREEN_TEXT_CHANGE, "CHECKING FOR UPDATES");

	await checkForUpdates();

	splashScreen.emit(Window.events.SPLASH_SCREEN_TEXT_CHANGE, "STARTING");
	mainWindow.emit(Window.events.UPDATE_CHECK_FINISHED);

	splashScreen.destroy();
	splashScreen = null;

	addContextMenu();

	mainWindow.show();

	isDevMode ? mainWindow.devTools() : null;
}

function addContextMenu() {
	contextMenu({
		showInspectElement: isDevMode,
	});
}

function setup() {
	const d = new Discord();
	d.bindEvents(mainWindow);
	d.startRPC();

	const r = new Requests();
	r.bindEvents(mainWindow);

	Notifications.bindEvents(mainWindow);
}

function checkForUpdates() {
	return new Promise(resolve => {
		dialog.showMessageBox(null, {
			title: "Update",
			message: "A new update is available!",
			checkboxLabel: "Close OpenLauncher?",
			checkboxChecked: true,
			buttons: [
				"Download",
				"Cancel"
			],
		}).then(resp => {
			if (resp.response === 1) {
				resolve(null);
			}
			else {
				shell.openExternal("https://github.com/DexterHill0/OpenLauncher/releases");
				resp.checkboxChecked ? app.quit() : resolve(null);
			}
		})
	});
}

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	if (mainWindow === null && splashScreen === null) {
		createWindow();
	}
	else {
		if (splashScreen) {
			splashScreen.show();
		}
		else {
			mainWindow.show();
		}
	}
});

app.on("ready", () => {
	createWindow();
	setup();
});