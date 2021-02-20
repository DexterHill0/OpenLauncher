import React, { useEffect, useRef, useState } from 'react';
import { IonLabel, IonIcon, IonItem, IonSlides, IonSlide } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import SignInSlide from './components/SignInSlide';
import ErrorSlide from './components/ErrorSlide';

import "./SlideStyles.css"
import Steam from '../../scripts/launchers/Steam';
import { IniKey } from '../../scripts/constants/IniKeys';
import { getKeyByPath } from '../../scripts/constants/Paths';
import { animateInvalidInput, writeConfig } from '../../utils/Utils';

interface Props {
    slideDidChange?: (dir: "next" | "prev") => void,
    reachedEnd?: () => void,
}

enum SlideIndex {
    "SIGN_IN", //0
    "EMAIL_KEY", //1
    "INSTALL_DIR", //...
}

//Maps the `iniKey` (in Paths.ts) to its corresponding slide
const iniKeyMap: { [key: string]: SlideIndex } = {
    [IniKey.data]: SlideIndex.INSTALL_DIR,
}

const SteamSlide: React.FC<Props> = (props) => {
    const logo = <img src={"/assets/logos/logo_steam.png"} alt="Logo"
        style={{ "width": "250px", "height": "75px" }}></img>; //IonSlides forces images to be 100% for some reason

    const slideRef = useRef<HTMLIonSlidesElement>(null);

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
                if (index + 1 > sw.slides.length) return;

                sw.slideTo(allowedSlides[index + 1]); //Slide to the next allowed slide
            }
            else {
                if (index - 1 < 0) return;

                sw.slideTo(allowedSlides[index - 1]); //Slide to the previous allowed slide
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

    const didSkipSignIn = () => {
        Steam.didSkip();

        changeSlide("next");
    }

    return (
        <IonSlide>
            <IonSlides class="ol-setup-slides" ref={slideRef}>
                <IonSlide>
                    <SignInSlide
                        onSignIn={(us, pw) => { }}
                        onSkip={didSkipSignIn}
                        logo={logo}
                    ></SignInSlide>
                </IonSlide>
                <IonSlide>
                    <ErrorSlide
                        onContinue={() => { }}
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
