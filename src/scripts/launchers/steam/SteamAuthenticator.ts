import { RSA, RSAPublicKey } from "../../Crypto";

import Requests from "../../Requests";
import { Endpoints } from "../../constants/Endpoints";

enum Status {
    "COMPLETE",

    "CAPTCHA_REQUIRED",
    "NEEDS_EMAIL_KEY",

    "INCORRECT_CAPTCHA",
    "INCORRECT_EMAIL_KEY",

    "POST_ERROR",
    "SUCCESS_FALSE",
}

class SteamAuth {
    data: { username: string; password: string; captchaData: { captchaText: string; captchagid: number; }; };

    constructor() {
        this.data = { username: "", password: "", captchaData: { captchaText: "", captchagid: -1 } };
    }

    async signIn(username: string, password: string, captchaData: { captchaText: string, captchagid: number }, emailKey?: string): Promise<Status> {

        //As long as the username and password are not blank I can overwrite the previous data (or set new data)
        if (username.length > 0) this.data.username = username;
        if (password.length > 0) this.data.password = password;

        //The user's entered captcha text is used in multiple requests so it must be stored
        if (captchaData.captchaText.length > 0) {
            this.data.captchaData.captchaText = captchaData.captchaText;
            this.data.captchaData.captchagid = captchaData.captchagid;
        }

        //`signIn` has to be called at least once with username and password not blank so that the data can be stored for later
        if ((this.data.username.length === 0 || this.data.password.length === 0) && this.data.captchaData.captchaText.length === 0) {
            return Status.SUCCESS_FALSE;
        }

        /**
         * I do all those checks because if for instance the user is on the slide that they complete the captcha, I have no way of retrieving 
         * the username and password they entered on the previous slide so I need it stored somewhere that I can access again.
         * That's why this function has to be called first with a username and password first, before the username and password can be left blank
         */

        const { status, key, timestamp } = await this.getRSAData(this.data.username);
        if (status !== Status.COMPLETE) return status;


        let encodedPassword = RSA.encrypt(this.data.username, key);
        const LOGIN_DATA = {
            "username": this.data.username,
            "password": encodedPassword,
            "emailauth": emailKey || "",
            "loginfriendlyname": "",
            "captchagid": this.data.captchaData.captchagid,
            "captcha_text": this.data.captchaData.captchaText,
            "emailsteamid": "",
            "rsatimestamp": timestamp,
            "remember_login": "true",
            "donotcache": this.time(),
        }

        console.log(LOGIN_DATA);

        return await Requests.post(Endpoints.STEAM_DOLOGIN, LOGIN_DATA).then(resp => {
            console.log(resp);
            if (!resp.body.success && !resp.body.captcha_needed) {
                return Status.SUCCESS_FALSE;
            }
            else if (resp.body.captcha_needed) {
                this.data.captchaData.captchagid = resp.body.captcha_gid;
                return Status.CAPTCHA_REQUIRED;
            }

            return Status.COMPLETE;
        }).catch(_err => {
            return Status.POST_ERROR;
        });

    }

    private async getRSAData(username: string): Promise<any> {
        const RSA_DATA = {
            "username": username,
            "donotcache": this.time(),
        }

        return await Requests.post(Endpoints.STEAM_RSA_KEY, RSA_DATA).then(resp => {
            if (!resp.body.success && !resp.body.captcha_needed) {
                return { status: Status.SUCCESS_FALSE };
            }
            else {
                const key = this.constructKey(resp.body.publickey_mod, resp.body.publickey_exp);

                return { status: Status.COMPLETE, key: key, timestamp: resp.body.timestamp };
            }
        }).catch(_err => {
            return { status: Status.POST_ERROR }
        });
    }

    getCaptchaGid(): number {
        return this.data.captchaData.captchagid;
    }

    async refreshCaptcha(): Promise<number> {
        const CAPTCHA_DATA = { "donotcache": this.time() }

        return await Requests.post(Endpoints.STEAM_REFRESH_CAPTCHA, CAPTCHA_DATA).then(res => {
            return res.body.gid;
        });
    }

    private time(): number {
        return new Date().getTime();
    }

    private constructKey(mod: string, exp: string): RSAPublicKey {
        return RSA.getPublicKey(mod, exp);
    }
}

export { SteamAuth, Status };