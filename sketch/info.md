

Info about required endpoints, important files, etc.



## Epic

#### Files

##### Games

* `LauncherInstalled.dat`
  * **win:** `C:\ProgramData\Epic\UnrealEngineLauncher\` 
    **mac:** `dont know yet`
  * Stores locations of installed games, names and versions

##### Images

* `catacache.bin`
  * **win:** `C:\ProgramData\Epic\EpicGamesLauncher\Data\Catalog\` 
    **mac:** `/Users/xx/Library/Application Support/Epic/EpicGamesLauncher/Data/Catalog/catcache.bin`
  * **Base64 encoded**
  * Stores cloud save info on games (ie. is it supported, the folder to be saved...)
  * URL's to large + small thumbnails for games
  * Has every game listed (including uninstalled games)

##### Misc

* `GameUserSettings.ini`

  * **win:** `C:\Users\xx\AppData\Local\EpicGamesLauncher\Saved\Config\Windows\` 
    **mac:** `/Users/xx/Library/Preferences/Unreal Engine/EpicGamesLauncher/Mac/`

  * Refresh token for logging in

    

#### Endpoints

* NA



## Steam

#### Files

##### Achievements

* `achievement_progress.json` and `<appid>.json`
  * **win:** `C:\Program Files (x86)\Steam\userdata\xx\config\librarycache\` 
    **mac:** `/Users/xx/Library/Application Support/Steam/userdata/xx/config/librarycache/`
  * Has all data about achievements for all installed games

##### Images

* `<appid>_<type>.jpg`
  * **win:** `C:\Program Files (x86)\Steam\appcache\librarycache\` 
    **mac:** `/Users/xx/Library/Application Support/Steam/appcache/librarycache/`
  * Folder full of icons, headers, banners, logos, etc for every game in library
  * Types:
    * `icon`
    * `logo`
    * `header`
    * `library_600x900`
    * `library_hero`
    * `library_hero_blur`

* There is also an endpoint which has these images stored

##### Games

* Time played, played recently, descriptions, news, etc all seems to also be stored in `<appid>.json` in `userdata\xx\config\librarycache`*

* `localconfig.vdf`
  * **win:** `C:\Program Files (x86)\Steam\userdata\xx\config`\
    **mac:** `/Users/xx/Library/Application Support/Steam/userdata/xx/config/`
  * Lists all app ids of the games in your library
  * Also has friends cached
* `appmanifest_<appid>.acf`
  * Info about the game including install directory

