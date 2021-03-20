import { app } from "electron";
import Discord from "./Discord";
import Requests from "./Requests";
import Notifications from "./Notification";
import { Window } from "./Window";

let mainWindow = null;
let splashScreen = null;

async function createWindow() {

	mainWindow = new Window({
		height: 920,
		width: 1600,
		minWidth: 1000,
		minHeight: 660,

		url: "http://localhost:3000/",

		show: false,
		titleBarStyle: "hiddenInset",
		movable: true,

		webPreferences: {
			nodeIntegration: true,
			devTools: true,
			enableRemoteModule: true,
		}
	});
	mainWindow.init();

	splashScreen = new Window({
		height: 300,
		width: 300,
		url: `file://${__dirname}/../assets/splash.html`,

		show: true,
		frame: false,
		backgroundColor: '#202020',
		movable: false,
		minimizable: false,
		maximizable: false,
		resizable: true,

		webPreferences: {
			nodeIntegration: true,
			devTools: false,
		}
	});
	await splashScreen.init();

	mainWindow.on(Window.events.DOCK_BOUNCE, () => {
		app.dock.bounce("critical");
	});

	mainWindow.emit(Window.events.UPDATE_CHECK_STARTED);
	splashScreen.emit(Window.events.SPLASH_SCREEN_TEXT_CHANGE, "CHECKING FOR UPDATES");

	await checkForUpdates();

	splashScreen.emit(Window.events.SPLASH_SCREEN_TEXT_CHANGE, "STARTING");
	mainWindow.emit(Window.events.UPDATE_CHECK_FINISHED);

	splashScreen.destroy();
	mainWindow.show();

	mainWindow.devTools();

}

function setupDiscord() {
	let d = new Discord();
	d.bindEvents(mainWindow);

	d.startRPC();
}

function setupRequests() {
	let r = new Requests();
	r.bindEvents(mainWindow);
}

function setupNotifs() {
	Notifications.bindEvents(mainWindow);
}

function checkForUpdates() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(null);
		}, 2000);
	});
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

app.on('ready', () => {
	createWindow();

	setupRequests();
	setupNotifs();
	setupDiscord();
});