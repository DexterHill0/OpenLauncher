import { app, BrowserWindow } from "electron";
import { Window } from "./Window";

let mainWindow = null;
let splashScreen = null;

async function createWindow() {

	mainWindow = new Window({
		height: 920,
		width: 1600,
		url: "http://localhost:8100/",

		show: false,
		titleBarStyle: "hiddenInset",

		webPreferences: {
			nodeIntegration: true,
			devTools: true,
		}
	});
	mainWindow.init();

	splashScreen = new Window({
		height: 300,
		width: 300,
		url: `file://${__dirname}/../assets/splash.html`,

		show: true,
		frame: false,
		backgroundColor: '#262626',
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

	splashScreen.once(Window.events.APP_READY_TO_START, () => {
		splashScreen.destroy();
		mainWindow.show();
	}, true);

	mainWindow.emit(Window.events.UPDATE_CHECK_STARTED, true);
	splashScreen.emit(Window.events.SPLASH_SCREEN_TEXT_CHANGE, true, "CHECKING FOR UPDATES");

	await checkForUpdates();

	splashScreen.emit(Window.events.SPLASH_SCREEN_TEXT_CHANGE, true, "STARTING");
	mainWindow.emit(Window.events.UPDATE_CHECK_FINISHED, true);

}
app.on('ready', createWindow);



function checkForUpdates() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(null);
		}, 7000);
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