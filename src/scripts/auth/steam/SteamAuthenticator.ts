import { RSA } from "./Crypto";

import Requests from "../../Requests";
import { Endpoints } from "../../constants/Endpoints";
import Logger from "../../Logger";
import { SessionNames } from "../../constants/Sessions";

enum Status {
	COMPLETE,

	CAPTCHA_REQUIRED,
	EMAILAUTH_REQUIRED,
	TWOFA_REQUIRED,

	INCORRECT_US_OR_PW,
	INCORRECT_CAPTCHA,
	INCORRECT_EMAIL_KEY,
	INCORRECT_2FA_CODE,

	SUCCESS_FALSE,
}

export type Response = { status: Status, message: string }

const returnStatus = (status: Status, message: string): Response => {
	return { status: status, message: message };
}

const details = new Map();

class SteamAuth {

	static async signIn(username: string, password: string, verif?: { twofacode?: string, emailcode?: string, captchatext?: string }) {
		details.set("username", username);

		const rsaData = await SteamAuth.getRSAData();

		if (rsaData.hasError || !rsaData.body.success) {
			Logger.error(`Steam /login/getrsakey fail: ${rsaData.error}`);

			return returnStatus(Status.SUCCESS_FALSE, "");
		}

		//Get the required RSA data from the request
		const { timestamp, publickey_mod: mod, publickey_exp: exp } = rsaData.body;
		const rsaKey = RSA.getPublicKey(mod, exp);

		password = RSA.encrypt(password, rsaKey);

		const data = {
			donotcache: Date.now(),
			username: details.get("username"),
			password: password,
			twofactorcode: verif?.twofacode,
			emailauth: verif?.emailcode,
			loginfriendlyname: "",
			captchagid: details.get("captchagid"),
			captcha_text: verif?.captchatext,
			emailsteamid: details.get("emailsteamid"),
			rsatimestamp: timestamp,
			remember_login: true,
		}

		const resp = await Requests.post(Endpoints.STEAM_DOLOGIN, data, SessionNames.Steam);

		if (resp.hasError) {
			Logger.error(`Steam /login/dologin/ fail: ${resp.error}`);

			return returnStatus(Status.SUCCESS_FALSE, "");
		}

		//Set the cookie for subsequent authorised requests
		if (resp.headers?.setCookie?.steamLoginSecure) {
			Requests.Session.setCookies(SessionNames.Steam, { name: "steamLoginSecure", value: resp.headers.setCookie.steamLoginSecure });
		}

		//If the request was a success add the other cookies
		if (resp.body.success) {
			Logger.log("Steam login success!");

			const mAuthName = `steamMachineAuth${resp.body.transfer_parameters.steamid}`;

			Requests.Session.setCookies(SessionNames.Steam, { name: mAuthName, value: resp.body.transfer_parameters.token_secure, persist: true });
			Requests.Session.setCookies(SessionNames.Steam, { name: "steamRememberLogin", value: resp.headers.setCookie.steamRememberLogin, persist: true });

			return returnStatus(Status.COMPLETE, "");
		}
		else if (resp.body.emailauth_needed) {
			//Storing the data to use in the next request
			details.set("emailsteamid", resp.body.emailsteamid);

			return returnStatus(Status.EMAILAUTH_REQUIRED, `Please enter the verification code that was sent to the email: ***${resp.body.emaildomain} .`);
		}
		else if (resp.body.captcha_needed) {
			details.set("captchagid", resp.body.captchagid);

			return returnStatus(Status.CAPTCHA_REQUIRED, "Please enter the text shown in the captcha image.");
		}
		else if (resp.body.requires_twofactor) {
			return returnStatus(Status.TWOFA_REQUIRED, "Please enter the 2FA verification code that was sent to your phone.");
		}
		else {
			return returnStatus(Status.INCORRECT_US_OR_PW, "Incorrect username or password.");
		}

	}

	private static getRSAData(): Promise<any> {
		const data = {
			donotcache: Date.now(),
			username: details.get("username"),
		}

		return Requests.post(Endpoints.STEAM_RSA_KEY, data);
	}
}

export default SteamAuth;
export { Status };