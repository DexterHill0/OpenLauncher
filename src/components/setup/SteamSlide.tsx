import React, { useEffect, useRef, useState } from 'react';
import { IonIcon, IonSlides, IonSlide, } from '@ionic/react';
import { warningOutline } from 'ionicons/icons';
import SignInSlide from './components/SignInSlide';
import ErrorSlide from './components/ErrorSlide';

import ToastNotif from '../../components/notif/ToastNotif';
import Steam from '../../scripts/launchers/steam/Steam';
import { SteamAuth, Status } from '../../scripts/launchers/steam/SteamAuthenticator';

import { IniKey } from '../../scripts/constants/IniKeys';
import { animateInvalidInput, disableButtons, writeConfig } from '../../utils/Utils';

import "./SlideStyles.css"

interface Props {
    slideDidChange?: (dir: "next" | "prev") => void,
    reachedEnd?: () => void,
}

enum SlideIndex {
    "SIGN_IN",
    "CAPTCHA",
    "EMAIL_KEY",
    "INSTALL_DIR",
}

//Maps the `iniKey` (in Paths.ts) to its corresponding slide
const iniKeyMap: { [key: string]: SlideIndex } = {
    [IniKey.data]: SlideIndex.INSTALL_DIR,
}

const auth = new SteamAuth();


const SteamSlide: React.FC<Props> = (props) => {
    const logo = <img src={"/assets/logos/logo_steam.png"} alt="Logo"
        style={{ "width": "250px", "height": "75px" }}></img>; //IonSlides forces images to be 100% for some reason

    const slideRef = useRef<HTMLIonSlidesElement>(null);

    const [captchaGid, setGid] = useState(-1);

    const [allowedSlides] = useState([SlideIndex.SIGN_IN,]);

    useEffect(() => {
        startSetup();
    }, [])

    const startSetup = () => {
        //`doSetup` returns the keys of paths that dont exist so I just map those to pages using the key map
        Steam.doSetup().forEach(k => {
            allowedSlides.push(iniKeyMap[k]);
        });
    }

    const changeSlide = (dir: "next" | "prev") => {
        if (slideRef.current === null) return;

        props.slideDidChange && props.slideDidChange(dir);

        slideRef.current.getSwiper().then(sw => {
            const index = sw.activeIndex;

            if (dir === "next") {
                if (index + 1 > sw.slides.length) {
                    props.reachedEnd && props.reachedEnd();
                }

                /**
                 * If `allowedSlides` was [0, 3] and I wanted to slide to slide 1 I would need to add the index like this `[0, 1, 3]`
                 * What this allows me to do is have the indexes like `[0, 3, 1]` yet still slide to slide 1 since it is in the array.
                 */
                for (let i = index + 1; i < Object.keys(SlideIndex).length; i++) {
                    if (allowedSlides.includes(i)) {
                        sw.slideTo(i); //Slide to the next allowed slide
                        break;
                    }
                }
            }
            else {
                if (index - 1 < 0) return;

                for (let i = Object.keys(SlideIndex).length - 1; i >= index + 1; i--) {
                    if (allowedSlides.includes(i)) {
                        sw.slideTo(i); //Slide to the previous allowed slide
                        break;
                    }
                }
            }

        });
    }

    const checkPath = (path: string) => {
        if (!Steam.validateUserPath(path)) {
            animateInvalidInput(".ol-error-path-input");
            return;
        };

        //I just cheat here because the paths are the same so I can just write both at the same time
        writeConfig(path, "paths.steam.data");
        writeConfig(`${path}/common`, "paths.steam.games");
    }

    const signIn = async (username: string, password: string, emailKey?: string, captchaText?: string) => {
        disableButtons(true);

        const status = await auth.signIn(username, password, { captchaText: captchaText || "", captchagid: captchaGid }, emailKey);

        switch (status) {
            case Status.CAPTCHA_REQUIRED:
                setGid(auth.getCaptchaGid());


                allowedSlides.push(SlideIndex.CAPTCHA);
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
                    message: <div>Could not log in to Steam! Check your username and password and make sure the Steam client is closed then try again.</div>,
                    icon: <IonIcon icon={warningOutline} style={{ color: "orange", width: "30px", height: "30px" }}></IonIcon>,
                    duration: 3000, class: "username-toast"
                });
                break;
        }


        disableButtons(false);
    }

    const didSkipSignIn = () => {
        writeConfig(true, "accounts.ignored.steam");
        changeSlide("next");
    }

    return (
        <IonSlide>
            <IonSlides class="ol-setup-slides" ref={slideRef}>
                <IonSlide>
                    <SignInSlide
                        onSignIn={(us, pw) => signIn(us, pw)}
                        onSkip={didSkipSignIn}
                        logo={logo}
                    ></SignInSlide>
                </IonSlide>
                <IonSlide>
                    <ErrorSlide
                        onContinue={(text) => signIn("", "", "", text)}
                        error={<div style={{ "cursor": "pointer" }}>Sorry! Steam wants to verify that you are human. Please type the letters below:<br /><img style={{ "paddingTop": "0.7rem" }} src={`https://store.steampowered.com/login/rendercaptcha?gid=${captchaGid}`}></img></div>}
                        logo={logo}
                        extraDetail={<div onClick={async () => setGid(await auth.refreshCaptcha())}>Refresh Captcha</div>}
                    ></ErrorSlide>
                </IonSlide>
                <IonSlide>
                    <ErrorSlide
                        onContinue={(key) => signIn("", "", key)}
                        error={<div>Please enter the code that was sent to your email: (<code>--email here--</code>)</div>}
                        logo={logo}
                    ></ErrorSlide>
                </IonSlide>
                <IonSlide>
                    <ErrorSlide
                        onContinue={(p) => checkPath(p)}
                        error={<div>Could not locate the install directory for Steam games. Please enter it below:</div>}
                        logo={logo}
                    ></ErrorSlide>
                </IonSlide>
            </IonSlides>
        </IonSlide>
    );
}

export default SteamSlide;
