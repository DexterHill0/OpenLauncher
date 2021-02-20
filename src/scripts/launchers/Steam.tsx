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
    static logo = <img src={"/assets/logos/logo_steam.png"} alt="Logo" width={250} height={77.5}></img>;

    static doSetup(): { [key: string]: { isValid: boolean, error: JSX.Element } } {
        let config = readConfig();

        const checked = Steam.checkPaths();

        STEAM_PATHS.forEach(p => {
            if (checked[p.iniKey] && checked[p.iniKey].isValid) {
                config[p.iniKey] = p[getOS()];
            }
        });


        writeConfig(config, "paths.steam");

        return checked;
    }

    //Moved out of setup so I can check the paths on startup
    static checkPaths(): { [key: string]: { isValid: boolean, error: JSX.Element } } {
        let checked: { [key: string]: { isValid: boolean, error: JSX.Element } } = {};


        STEAM_PATHS.forEach(p => {
            if (fs.existsSync(p[getOS()])) {
                log.info(`Path exists: "${p[getOS()]}"`);

                _set(checked, `${p.iniKey}.isValid`, true);
            }
            else {
                log.warn(`Path does not exist: "${p[getOS()]}"`);

                if (p.notFound) { //Only add the path to the object if it needs to be displayed on an error page

                    _set(checked, `${p.iniKey}.isValid`, false);
                    _set(checked, `${p.iniKey}.error`, p.notFound);
                }
            }
        });

        return checked;
    }

    static validateUserPath(data: string): void {
        const isRegexValid = STEAM_PATHS.map(p => { //Compare the users path to all the regexes
            if (!p || !p.checkPathReg) return false;

            return p.checkPathReg.test(data);
        });

        if (isRegexValid.every(v => v === false)) { //If it didn't match any, its not a valid path
            animateInvalidInput(".ol-form-path-input");
            return;
        };

        if (!fs.existsSync(data)) { //If the path did match one, now I can check if it exists
            animateInvalidInput(".ol-form-path-input");
            return;
        }

        //I just cheat here because the paths are the same so I can just write both at the same time
        writeConfig(data, "paths.steam.data");
        writeConfig(`${data}/common`, "paths.steam.games");
    }

    static signIn(username: string, password: string): void {
        const data = {
            "username": username,
            "donotcache": Date.now(),
        }

        Requests.post(Endpoints.STEAM_RSA_KEY, data, (resp) => {
            console.log(resp);
            if (resp.body.success) {

            }
            else {
                mainLog.warn("Possible incorrect username - RSA success false");

                new ToastNotif({
                    message: <div>Incorrect username!</div>,
                    icon: <IonIcon icon={warningOutline} style={{ color: "orange", width: "30px", height: "30px" }}></IonIcon>,
                    duration: 3000, class: "username-toast"
                });

                animateInvalidInput(".ol-form-field-username");
            }
        }, (err) => {
            mainLog.error(err.message);

            new ToastNotif({
                message: <div> There was an error while sending a request to Steam servers. You can always sign in to your account from settings at a later time.
                (Please check the log for more information)
                        </div>,
                icon: <IonIcon icon={warningOutline} style={{ color: "red", width: "30px", height: "30px" }}></IonIcon>,
                duration: 5000, class: "post-error-toast"
            });

        });

    }

    encryptPassword(password: string, mod: number, exp: number): string {
        return "";
    }

    static didSkip() {
        writeConfig(true, "accounts.ignored.steam");
    }

};

export default Steam;