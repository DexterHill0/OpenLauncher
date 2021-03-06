import React, { useEffect, useState } from 'react';
import { IonIcon, IonSlides, IonSlide, } from '@ionic/react';
import { warningOutline } from 'ionicons/icons';

import SignInSlide from './components/SignInSlide';
import ErrorSlide from './components/ErrorSlide';

import Notification from '../../components/notif/Notification';
import ToastNotif from '../../components/notif/ToastNotif';

import Steam from '../../scripts/launchers/steam/Steam';
import { SteamAuth, Status } from '../../scripts/launchers/steam/SteamAuthenticator';
import { IniKey } from '../../scripts/constants/Paths';
import { animateInvalidInput, disableButtons, writeConfig } from '../../utils/Utils';

import "./SlideStyles.css"


interface Props {
    slideShouldChange?: (dir: "next" | "prev") => void,
}

const slides: { [key: string]: boolean } = {
    "CAPTCHA": false,
    "EMAIL_KEY": false,
    "INSTALL_DIR": false,
}

const slideMappings = {
    [Status.CAPTCHA_REQUIRED]: "CAPTCHA",
    [Status.NEEDS_EMAIL_KEY]: "EMAIL_KEY",
    [IniKey.data]: "INSTALL_DIR",
}

const auth = new SteamAuth();

const SteamSlide: React.FC<Props> = (props) => {
    const logo = <img src={"/assets/logos/logo_steam.png"} alt="Logo"
        style={{ "width": "250px", "height": "75px" }}></img>; //IonSlides forces images to be 100% for some reason

    const [visibleSlides, setVisible] = useState<{ [key: string]: boolean }>({
        "CAPTCHA": false,
        "EMAIL_KEY": false,
        "INSTALL_DIR": false,
    });

    const [captchaGid, setGid] = useState(-1);

    useEffect(() => {
        startSetup();

        Notification.display("title", "message");
    }, []);


    const startSetup = (): void => {
        Steam.doSetup();

        //`getInvalidPaths` returns the keys of paths that dont exist so I just map those to pages using the key map
        Steam.getInvalidPaths().forEach(k => {
            addOrRemoveSlide(k, "add");
        });
    }

    const signIn = async (username: string, password: string, emailKey?: string, captchaText?: string): Promise<void> => {
        disableButtons(true);

        const status = await auth.signIn(username, password, { captchaText: captchaText || "", captchagid: captchaGid }, emailKey);

        switch (status) {
            case Status.CAPTCHA_REQUIRED:
                setGid(auth.getCaptchaGid());

                addOrRemoveSlide(Status.CAPTCHA_REQUIRED, "add");
                changeSlide("next");
                break;

            case Status.POST_ERROR:
                new ToastNotif({
                    message: <div> There was an error while sending a request to Steam servers. You can always sign in to your account from settings at a later time.
                    (Please check the log for more information) </div>,
                    icon: <IonIcon icon={warningOutline} style={{ color: "red", width: "30px", height: "30px" }}></IonIcon>,
                    duration: 5000, class: "post-error-toast"
                });
                break;

            case Status.SUCCESS_FALSE:
                new ToastNotif({
                    message: <div>Could not log in to Steam! Check your username and password and try again.</div>,
                    icon: <IonIcon icon={warningOutline} style={{ color: "orange", width: "30px", height: "30px" }}></IonIcon>,
                    duration: 3000, class: "username-toast"
                });
                break;
        }


        disableButtons(false);
    }

    const changeSlide = (dir: "next" | "prev") => {
        props.slideShouldChange && props.slideShouldChange(dir);
    }

    const checkPath = (path: string): void => {
        if (!Steam.validateUserPath(path)) {
            animateInvalidInput(".ol-error-path-input");
            return;
        };

        //I just cheat here because the paths are the same so I can just write both at the same time
        writeConfig(path, "paths.steam.data");
        writeConfig(`${path}/common`, "paths.steam.games");
    }

    //If add is false the slide is removed
    const addOrRemoveSlide = (key: any, action: "add" | "rem"): void => {
        setVisible({ ...visibleSlides, [slideMappings[key]]: action === "add" ? true : false });
    }

    const didSkipSignIn = (): void => {
        writeConfig(true, "steam.account.shouldIgnore");
        changeSlide("next");
    }

    return (
        <IonSlide>
            <IonSlides class="ol-setup-slides">
                <SignInSlide
                    key={0}
                    onSignIn={(us, pw) => signIn(us, pw)}
                    onSkip={didSkipSignIn}
                    logo={logo}
                ></SignInSlide>
                {
                    <>
                        {
                            visibleSlides.CAPTCHA ?
                                <ErrorSlide
                                    key={1}
                                    onContinue={(text) => signIn("", "", "", text)}
                                    error={<div style={{ "cursor": "pointer" }}>Sorry! Steam wants to verify that you are human. Please type the letters below:<br /><img style={{ "paddingTop": "0.7rem" }} src={`https://store.steampowered.com/login/rendercaptcha?gid=${captchaGid}`}></img></div>}
                                    logo={logo}
                                    extraDetail={<div onClick={async () => setGid(await auth.refreshCaptcha())}>Refresh Captcha</div>}
                                ></ErrorSlide>
                                : <></>
                        }
                    </>

                }
                {
                    visibleSlides.EMAIL_KEY ?
                        <ErrorSlide
                            key={2}
                            onContinue={(key) => signIn("", "", key)}
                            error={<div>Please enter the code that was sent to your email: (<code>--email here--</code>)</div>}
                            logo={logo}
                        ></ErrorSlide>
                        : <></>
                }
                {
                    visibleSlides.INSTALL_DIR ?
                        <ErrorSlide
                            key={3}
                            onContinue={(p) => checkPath(p)}
                            error={<div>Could not locate the install directory for Steam games. Please enter it below:</div>}
                            logo={logo}
                        ></ErrorSlide>
                        : <></>
                }
            </IonSlides>
        </IonSlide>
    );
}

export default SteamSlide;
