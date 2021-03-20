import { Window } from "./Window";
import { Client } from "discord-rpc";

class Discord {
	private client: Client;

	private isReady: boolean = false;
	private hasError: boolean = false;

	private _client_id: string = "806581546852810783";

	constructor() {
		this.client = new Client({ transport: 'ipc' });
		this.isReady = false;
	}

	bindEvents(win: Window) {
		win.on(Window.events.RPC_SET_ACTIVITY, (_event, ac) => {
			this.setActivity(ac);
		});
		win.on(Window.events.RPC_HAS_INIT, () => {
			win.emit(Window.events.RPC_HAS_INIT, this.hasError)
		});
	}

	startRPC() {
		this.client.login({ clientId: this._client_id }).catch((err) => {
			console.error(err);
			this.hasError = true;
			return;
		});

		this.client.on("ready", () => {
			console.log('Authed for user', this.client.user.username);
			this.isReady = true;
			return;
		});
	}

	endRPC() {
		if (!this.isReady) return;
		this.client.destroy();
	}

	setActivity(d: any) {
		if (!this.isReady) return;
		this.client.setActivity(d);
	}
}

export default Discord;