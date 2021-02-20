import React from 'react';

import { appDataPath, userDirectory, getOS } from "../../utils/Utils";

export const STEAM_PATHS = [
	{
		"iniKey": "data",

		"unsup-os": "",
		"win": "C:/Program Files (x86)/Steam/steamapps",
		"osx": `${appDataPath}/Steam/SteamApps/`,

		"checkPathReg": /<>/,
		"notFound": <></>,
	},
	{
		"iniKey": "games",

		"unsup-os": "",
		"win": "C:/Program Files (x86)/Steam/steamapps/common",
		"osx": `${appDataPath}/Steam/SteamApps/common/`,

		"checkPathReg": undefined, //Because this is only 1 directory down from the above path there is not point in getting the user to enter the path
		"notFound": undefined,
	}
];

export const EPIC_PATHS = [
	{
		"iniKey": "gameusersettings", //What key the path goes under in the ini file

		"unsup-os": "",
		"win": `${appDataPath}/Local/EpicGamesLauncher/Saved/Config/Windows/GameUserSettings.ini`,
		"osx": `${userDirectory}/Library/Preferences/Unreal Engine/EpicGamesLauncher/Mac/GameUserSettings.ini`,

		"checkPathReg": /(\/Epic Games)[/]?/, //This regex is compared to the users input if the above path could not be found
		"notFound": undefined, //If the file is not found it doesn't matter because we will get a refresh token from servers instead
	},
	{
		"iniKey": "games",

		"unsup-os": "",
		"win": "C:/Program Files/Epic Games/",
		"osx": "/Users/Shared/Epic Games/",

		"checkPathReg": /(\/Epic Games)[/]?/,
		"notFound": <div>Could not locate game install directory. Please enter the install location below.</div>,
	},
	{
		"iniKey": "data",

		"unsup-os": "",
		"win": `C:/ProgramData/Epic/EpicGamesLauncher/Data/Catalog/catcache.bin`,
		"osx": `${appDataPath}/Epic/EpicGamesLauncher/Data/Catalog/catcache.bin`,

		"checkPathReg": /([/]?Epic)?[/]?(EpicGamesLauncher\/Data\/)(Catalog)?[/]?(catcache\.bin)?/,
		"notFound": <div>Please enter the path to <code>/Epic/EpicGamesLauncher/</code>.<br />It is usually located under <code>{getOS() === "win" ? "Program Data" : "Application Support"}</code>.</div>,
	}
];

