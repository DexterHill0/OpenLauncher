import _set from "lodash.set";

import { STEAM_PATHS } from "../../constants/Paths";
import { getOS, readConfig, writeConfig, setupLogger } from "../../../utils/Utils";

const fs = window.require("fs");
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
};

export default Steam;