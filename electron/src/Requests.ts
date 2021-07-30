import { Session, session } from "electron";
import FormData from "form-data";
import fetch, { Response } from "electron-fetch";
import Logger from "electron-log";

import { Window } from "./Window";

class Requests {
	win: Window;

	activeSessions: Map<string, Session> = new Map();

	bindEvents(win: Window) {
		this.win = win;

		win.on(Window.events.REQUESTS_GET, (_event: any, ...args: any[]) => {
			this.makeRequest("GET", ...args);
		});
		win.on(Window.events.REQUESTS_POST, (_event: any, ...args: any[]) => {
			this.makeRequest("POST", ...args);
		});

		win.on(Window.events.REQUESTS_SESSION_CREATE, (_event: any, ...args: any[]) => {
			this.newSession(...args);
		});
		win.on(Window.events.REQUESTS_SESSION_GET_COOKIES, (_event: any, ...args: any[]) => {
			this.getSessionCookies(...args);
		});
		win.on(Window.events.REQUESTS_SESSION_SET_COOKIES, (_event: any, ...args: any[]) => {
			this.setSessionCookies(...args);
		});
	}

	makeRequest(method: string, ...args: any): void {
		args = args[0];

		if (!args.data || !args.url) {
			this.win.emit(Window.events.REQUEST_COMPLETE, { hasError: true, error: "Missing property on data for POST request (either \"url\" or \"data\")" });
			return;
		}

		const data = new FormData();

		Object.keys(args.data).forEach(k => {
			data.append(k, args.data[k] || ""); //Guards against `undefined`
		});

		let response: Response;
		const fetchSession = this.activeSessions.get(args.data.sessionName) || session.defaultSession;

		fetch(args.url, {
			method: method,
			body: data,
			session: fetchSession,
		})
			.then(resp => {
				response = resp;
				return resp.json();
			})
			.then(json => {
				//Have to add the body data here because the json data is in a promise
				this.win.emit(Window.events.REQUEST_COMPLETE, this.toSerialisableRequestData(response, json));
			})
			.catch(err => {
				this.win.emit(Window.events.REQUEST_COMPLETE, { "hasError": true, "error": err });
			});
	}

	newSession(...args: any): void {
		args = args[0];

		this.activeSessions.set(args.name, session.fromPartition(args.name));

		this.win.emit(Window.events.REQUESTS_SESSION_CREATE);
	}

	getSessionCookies(...args: any) {
		args = args[0];

		if (!args.sessionName) return;

		this.activeSessions.get(args.sessionName).cookies.get({}).then(cookies => {
			this.win.emit(Window.events.REQUESTS_SESSION_GET_COOKIES, cookies);
		}).catch(err => Logger.error(err));
	}

	setSessionCookies(...args: any) {
		args = args[0];

		if (!args.sessionName || !args.cookies) return;

		this.activeSessions.get(args.sessionName).cookies.set({
			url: this.win.getWindow().webContents.getURL(),
			...args.cookies
		}).then(() => {
			this.win.emit(Window.events.REQUESTS_SESSION_SET_COOKIES);
		}).catch(err => Logger.error(err));
	}

	//Converts most of the response into an object `emit` can serialise
	toSerialisableRequestData(resp: Response, body: any) {
		const headers = {};
		resp.headers.forEach((val, key) => headers[key] = val)

		return {
			"hasError": false,
			"url": resp.url,
			"status": resp.status,
			"headers": headers,
			"body": body,
		}

	}
}

export default Requests;
