import React from "react";
import { IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";

import ToastNotif from "../../components/notif/ToastNotif";

import _set from "lodash.set";

import { Endpoints } from "../constants/Endpoints";
import { STEAM_PATHS } from "../constants/Paths";
import Requests from "../Requests";
import { animateInvalidInput, getOS, readConfig, writeConfig, setupLogger, mainLogger } from "../../utils/Utils";

const fs = window.require("fs");
const mainLog = mainLogger();
const log = setupLogger();

class Steam {

    static doSetup(): string[] {
        let config = readConfig();

        const checked = Steam.checkPaths();

        STEAM_PATHS.forEach(p => {
            if (!checked.includes(p.iniKey)) { //If the path did exist
                config[p.iniKey] = p[getOS()];
            }
        });


        writeConfig(config, "paths.steam");

        return checked;
    }

    //Moved out of setup so I can check the paths on startup.
    //Returns an array of the keys of paths that didn't exist
    static checkPaths(): string[] {
        const checked: string[] = [];

        STEAM_PATHS.forEach(p => {
            if (fs.existsSync(p[getOS()])) {
                log.info(`Path exists: "${p[getOS()]}"`);
            }
            else {
                log.warn(`Path does not exist: "${p[getOS()]}"`);

                if (p.checkPathReg) { //Only add the path to the object if it needs to be displayed on an error page

                    checked.push(p.iniKey);
                }
            }
        });

        return checked;
    }

    static validateUserPath(data: string): boolean {
        const isRegexValid = STEAM_PATHS.map(p => { //Compare the users path to all the regexes
            if (!p || !p.checkPathReg) return false;

            return p.checkPathReg.test(data);
        });

        if (isRegexValid.every(v => v === false)) { //If it didn't match any, its not a valid path
            return false;
        };

        if (!fs.existsSync(data)) { //If the path did match one, now I can check if it exists
            return false;
        }

        return true;
    }

    static async signIn(username: string, password: string, emailKey?: string): Promise<any> {
        // let data = {
        //     "username": username,
        //     "donotcache": Date.now() * 1000,
        // }

        // await Requests.post(Endpoints.STEAM_RSA_KEY, data).then(resp => {
        //     if (resp.body.success) {
        //         const pws = Steam.encryptPassword(password, resp.body.publickey_mod, resp.body.publickey_exp);


        //     }
        //     else {
        //         mainLog.warn("Possible incorrect username - RSA success false");

        //         new ToastNotif({
        //             message: <div>Incorrect username!</div>,
        //             icon: <IonIcon icon={warningOutline} style={{ color: "orange", width: "30px", height: "30px" }}></IonIcon>,
        //             duration: 3000, class: "username-toast"
        //         });

        //         animateInvalidInput(".ol-form-field-username");
        //     }
        // }).catch(err => Steam.postError(err));


        // if (emailKey) {
        //     data = {
        //         "username": username,
        //         //"password": base64.b64encode(cipher.encrypt(password.encode())),
        //         "emailauth": emailKey,
        //         "loginfriendlyname": "",
        //         "captchagid": "-1",
        //         "captcha_text": "",
        //         "emailsteamid": "",
        //         "rsatimestamp": data["timestamp"],
        //         "remember_login": true,
        //         "donotcache": Date.now() * 1000,
        //     }

        //     await Requests.post(Endpoints.STEAM_DOLOGIN, data)
        // }

        // //TODO: Check if ignored in config, override to false

    }


    private static encryptPassword(password: string, mod: number, exp: number): string {
        return "";
    }

    private static postError(err: any) {
        mainLog.error(err.message);

        new ToastNotif({
            message: <div> There was an error while sending a request to Steam servers. You can always sign in to your account from settings at a later time.
            (Please check the log for more information)
                    </div>,
            icon: <IonIcon icon={warningOutline} style={{ color: "red", width: "30px", height: "30px" }}></IonIcon>,
            duration: 5000, class: "post-error-toast"
        });
    }

    static didSkip() {
        writeConfig(true, "accounts.ignored.steam");
    }

};

export default Steam;