import React from 'react';
import { appDataPath, userDirectory, getOS } from "../../utils/Utils";

export const IniKey: { [key: string]: string } = {
	"data": "data",
	"games": "games",
	"gameusersettings": "gameusersettings",
}


export const STEAM_PATHS = [
	{
		"iniKey": IniKey.data,

		"unsup-os": "",
		"win": "C:/Program Files (x86)/Steam/steamapps",
		"osx": `${appDataPath}/Steam/SteamApps/`,

		"checkPathReg": /(?!(\/|\\)Steam(\/|\\)steamapps(\/|\\).+)((\/|\\)Steam(\/|\\)steamapps)[/\\]?/, //This regex is compared to the users input if the above path could not be found
	},
	{
		"iniKey": IniKey.games,

		"unsup-os": "",
		"win": "C:/Program Files (x86)/Steam/steamapps/common",
		"osx": `${appDataPath}/Steam/SteamApps/common/`,

		"checkPathReg": undefined, //Because this is only 1 directory down from the above path there is not point in getting the user to enter the path
	}
];

export const EPIC_PATHS = [
	{
		"iniKey": IniKey.gameusersettings, //What key the path goes under in the ini file

		"unsup-os": "",
		"win": `${appDataPath}/Local/EpicGamesLauncher/Saved/Config/Windows/GameUserSettings.ini`,
		"osx": `${userDirectory}/Library/Preferences/Unreal Engine/EpicGamesLauncher/Mac/GameUserSettings.ini`,

		"checkPathReg": undefined, //File doesn't matter too much, just get code online instead 
	},
	{
		"iniKey": IniKey.games,

		"unsup-os": "",
		"win": "C:/Program Files/Epic Games/",
		"osx": "/Users/Shared/Epic Games/",

		"checkPathReg": /(?!(\/|\\)Epic Games(\/|\\).+)((\/|\\)Epic Games)[/\\]?/,
		"notFound": <div>Could not locate game install directory. Please enter the install location below.</div>,
	},
	{
		"iniKey": IniKey.data,

		"unsup-os": "",
		"win": `C:/ProgramData/Epic/EpicGamesLauncher/Data/Catalog/catcache.bin`,
		"osx": `${appDataPath}/Epic/EpicGamesLauncher/Data/Catalog/catcache.bin`,

		"checkPathReg": /([/\\]?Epic)?[/\\]?(EpicGamesLauncher(\/|\\)Data(\/|\\))(Catalog)?[/\\]?(catcache\.bin)?/,
	}
];

/**
 * Gets the `iniKey` given a path
 */
export function getKeyByPath(path: string, pathArray: any[]): string {
	const os = getOS();

	return pathArray.map(p => {
		if (p[os] === path) {
			return path;
		}
	})[0] || ""; //I can assume there is only going to be 1 exact match
}

/**
 * Gets the OS specific path given an `iniKey`
 */
export function getPathByKey(key: string, pathArray: any[]): string {
	const os = getOS();

	return pathArray.map(p => {
		if (p.iniKey === key) {
			return p[os];
		}
	})[0] || "";
}

