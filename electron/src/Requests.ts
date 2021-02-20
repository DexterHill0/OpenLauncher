import { Window } from "./Window";

import FormData from "form-data";
import fetch, { Response } from "electron-fetch";

class Requests {
	win: Window;

	bindEvents(win: Window) {
		this.win = win;

		win.on(Window.events.REQUESTS_GET, (_event: any, ...args: any) => {
			this.get(args);
		});
		win.on(Window.events.REQUESTS_POST, (_event: any, ...args: any) => {
			this.post(...args);
		});
	}

	post(...args: any): void {
		args = args[0]; //All data should be in 1 object so I can just get the 0th element
		const data = new FormData();

		Object.keys(args.data).forEach(k => {
			data.append(k, args.data[k] || ""); //Guards against `undefined`
		});

		let response: Response;

		fetch(args.url, {
			method: "POST",
			body: data,
		})
			.then(resp => {
				response = resp;
				return resp.json();
			})
			.then(json => {
				//Have to add the body data here because the json data is in a promise
				this.win.emit(Window.events.REQUEST_COMPLETE, this.toSerialisableData(response, json))
			})
			.catch(err => {
				this.win.emit(Window.events.REQUEST_COMPLETE, { "hasError": true, "error": err });
			});
	}

	get(args: any): void {
	}

	//Converst most of the response into an object `emit` can serialise
	toSerialisableData(resp: Response, body: any) {
		let headers = {};
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



	// const formData = {
	// 	"username": "bobski22",
	// 	"donotcache": (Date.now() * 1000).toString(16),
	// }

	// $.ajax({
	// 	type: "POST",
	// 	url: "https://store.steampowered.com/login/getrsakey",
	// 	data: formData,
	// 	success: function (data) {
	// 		console.log(data)
	// 	},
	// 	error: function (err) {
	// 		console.log(err)
	// 	}
	// });