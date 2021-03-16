import { Window } from "./Window";

const { Notification } = require('electron')

class Notifications {

	static bindEvents(win: Window) {
		win.on(Window.events.NOTIFICATION, (_event: any, ...args: any) => {
			args = args[0];
			if (!args.title || !args.body) return;

			new Notification({ title: args.title, body: args.body }).show();
		});
	}

}

export default Notifications;
