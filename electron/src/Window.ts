import { BrowserWindow, ipcMain } from "electron";

interface Options {
	height: number,
	width: number,
	url: string,

	show?: boolean,

	frame?: boolean,
	backgroundColor?: string,
	titleBarStyle?: "hiddenInset" | "default" | "hidden" | "customButtonsOnHover",

	movable?: boolean,
	minimizable?: boolean,
	maximizable?: boolean,
	resizable?: boolean,

	webPreferences?: {
		nodeIntegration?: boolean,
		devTools?: boolean,
	}
}

export class Window {
	private window: BrowserWindow;
	private isInitialised: Boolean;

	private options: Options;

	static events = {
		SPLASH_SCREEN_TEXT_CHANGE: "OL-SPLASH_SCREEN_TEXT_CHANGE",

		WINDOW_CLOSED: "OL-WINDOW_CLOSED",

		UPDATE_CHECK_STARTED: "OL-CHECKING_FOR_UPDATES",
		UPDATE_CHECK_FINISHED: "OL-CHECKED_FOR_UPDATES",

		APP_READY_TO_START: "OL-APP_START_SPLASH_CLOSE",
	}
	activeEvents: { [key: string]: () => void; }[];

	constructor(options?: Options) {
		this.options = options;
		this.activeEvents = [];
	}

	async init() {
		this.window = new BrowserWindow(this.options);
		await this.window.loadURL(this.options.url);

		this.isInitialised = true;
	}

	on(event: string, fn: () => any, isExternal?: boolean) {
		this.activeEvents.push({
			[isExternal ? "EXTERNAL_" + event : event]: fn
		});
		if (isExternal) ipcMain.on(event, fn);
	}
	off(event: string, isExternal?: boolean, fn?: () => any) {
		let e = this.activeEvents.find((data) => {
			if (data[event] || data["EXTERNAL_" + event]) return data;
		});
		this.activeEvents.splice(
			this.activeEvents.indexOf(e)
		);
		if (isExternal) ipcMain.off(event, e[event]);
	}
	once(event: string, fn: () => any, isExternal?: boolean) {
		this.activeEvents.push({
			[isExternal ? "EXTERNAL_" + event : event]: fn
		});
		if (isExternal) ipcMain.once(event, fn);
	}

	emit(event: string, isExternal?: Boolean, ...args: any[]) {
		this.activeEvents.forEach(e => {
			if (!Object.keys(e)[0].startsWith("EXTERNAL_")) e[event].bind(this).call(); //If it's an external event (i.e. `ipcMain`) then don't run callback
		});

		if (isExternal) this.window.webContents.send(event, args);
	}

	destroy(triggerEvent?: string) {
		if (!this.isInitialised) throw new Error("Splash Screen not initialised!");

		if (triggerEvent) {
			this.on(triggerEvent, this.destroy);
			return;
		}

		this.window.destroy();
		this.emit(Window.events.WINDOW_CLOSED);
	}

	show() {
		this.window.show();
	}
}

