import _set from "lodash.set";

import { IniKey, STEAM_PATHS } from "../../constants/Paths";
import { getOS, readConfig, writeConfig } from "../../../utils/Utils";
import Logger from "../../../utils/Logger";

const fs = window.require("fs");
const log = Logger.getSetupLogger();

class Steam {

    static doSetup() {
        let config: any = {};

        const checked = Steam.getInvalidPaths();

        STEAM_PATHS.forEach(p => {
            if (!checked.includes(p.iniKey)) { //If the path did exist
                log.info(`Path exists: "${p[getOS()]}"`);

                config[p.iniKey] = p[getOS()];
            }
            else {
                log.warn(`Path does not exist: "${p[getOS()]}"`);
            }
        });

        writeConfig(config, "paths.steam");
    }

    //Moved out of setup so I can check the paths on startup.
    //Returns an array of the keys of paths that didn't exist
    static getInvalidPaths(): string[] {
        const checked: string[] = [];

        STEAM_PATHS.forEach(p => {
            if (!fs.existsSync(p[getOS()])) {
                checked.push(p.iniKey);
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
};

export default Steam;