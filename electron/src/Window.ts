import { BrowserWindow, ipcMain } from "electron";

interface Options extends Electron.BrowserWindowConstructorOptions {
	url: string;
}

export class Window {
	private window: BrowserWindow;
	private isInitialised: Boolean;

	private options: Options;

	static events = {
		SPLASH_SCREEN_TEXT_CHANGE: "OL-SPLASH_SCREEN_TEXT_CHANGE",

		WINDOW_WILL_CLOSE: "OL-WINDOW-WILL-CLOSE",

		UPDATE_CHECK_STARTED: "OL-CHECKING_FOR_UPDATES",
		UPDATE_CHECK_FINISHED: "OL-CHECKED_FOR_UPDATES",

		DOCK_BOUNCE: "OL-DOCK-BOUNCE",
		NOTIFICATION: "OL-NOTIFICATION",

		RPC_SET_ACTIVITY: "OL-SET-RPC-ACTIVITY",
		RPC_HAS_INIT: "OL-RPC-HAS-INIT",

		REQUESTS_POST: "OL-REQUESTS-POST",
		REQUESTS_GET: "OL-REQUESTS-GET",
		REQUEST_COMPLETE: "OL-REQUEST-COMPLETE",

		REQUESTS_SESSION_CREATE: "OL-SESSION-CREATE",
		REQUESTS_SESSION_SET_COOKIES: "OL-SESSION-SET-COOKIES",
		REQUESTS_SESSION_GET_COOKIES: "OL-SESSION-GET-COOKIES",
	}

	activeEvents: { [key: string]: (...args: any[]) => void; }[];

	constructor(options?: Options) {
		this.options = options;
		this.activeEvents = [];
	}

	init() {
		this.window = new BrowserWindow(this.options);

		this.isInitialised = true;
	}
	async loadURL() {
		this.checkInitialised();

		await this.window.loadURL(this.options.url);
	}


	on(event: string, fn: (...args: any[]) => any) {
		this.activeEvents.push({
			[event]: fn
		});
		ipcMain.on(event, fn);
	}
	off(event: string, fn?: (...args: any[]) => any) {
		let e = this.activeEvents.find((data) => {
			if (data[event]) return data;
		});
		this.activeEvents.splice(
			this.activeEvents.indexOf(e)
		);
		ipcMain.off(event, fn ? fn : e[event]);
	}
	once(event: string, fn: (...args: any[]) => any) {
		ipcMain.once(event, fn);
	}
	emit(event: string, ...args: any[]) {
		this.checkInitialised();
		this.window.webContents.send(event, args);
	}

	webContentsOn(event: any, callback: (...args: any[]) => void) { //Bodge
		this.checkInitialised();
		this.window.webContents.on(event, callback);
	}

	destroy(triggerEvent?: string) {
		this.checkInitialised();
		if (triggerEvent) {
			this.on(triggerEvent, this.destroy);
			return;
		}

		this.emit(Window.events.WINDOW_WILL_CLOSE);
		this.window.destroy();
	}

	show() {
		this.checkInitialised();
		this.window.show();
	}

	devTools() {
		this.checkInitialised();
		this.window.webContents.openDevTools();
	}

	getWindow() {
		return this.window;
	}

	private checkInitialised() {
		if (!this.isInitialised) throw new Error("Splash Screen not initialised!");
	}
}

