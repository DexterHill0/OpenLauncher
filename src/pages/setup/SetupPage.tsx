import React, { useEffect, useState } from 'react';
import { IonContent, IonLabel, IonIcon, IonCheckbox, IonItem, IonText, IonRange, IonSlides, IonSlide } from '@ionic/react';
import { chevronForward, chevronBack } from 'ionicons/icons';

import { getOS, configPath, SupportedLaunchersFull, SupportedLaunchersShort, setupLogger, clearConfig } from '../../utils/Utils';
import $ from "jquery";
import Epic from "../../scripts/launchers/EpicGames";
// import Discord from "../../scripts/DiscordRPC";

import './SetupPage.css';
import Steam from '../../scripts/launchers/Steam';

import ErrorSlide from '../../components/setup/components/ErrorSlide';
import SignInSlide from '../../components/setup/components/SignInSlide';
import SteamSlide from '../../components/setup/SteamSlide';

const fs = window.require("fs");

const log = setupLogger();


const SetupPage = () => {
	const [selected, setSelected] = useState<{ [key: string]: boolean }>({ "epic": false, "steam": false });

	const [pages, setPages] = useState<JSX.Element[]>([]);

	const [stepAmount, setStepAmount] = useState(0);
	const [percent, stepPercent] = useState(0);

	const [index, setIndex] = useState(0);

	const Launchers: { [key: string]: any } = {
		"epic": Epic,
		"steam": Steam,
	}


	useEffect(() => {
		firstLoadSetup();
	}, []);

	useEffect(() => { //Add shake to the arrow when a launcher is selected
		if (Object.values(selected).some(v => v === true)) {
			$(".ol-setup-continue").addClass("shake-input");
		}
		else {
			$(".ol-setup-continue").removeClass("shake-input");
		}
	}, [selected]);

	useEffect(() => {
		changeSlide("next")
	}, [pages]);

	const firstLoadSetup = (): void => { //Does setup that only needs to be performed once
		if (getOS() === "unsup-os") {
			log.error("Unsupported OS!");

			alert("The program does not currently support this OS!");
			throw new Error("Unsupported OS!");
		}

		let f = fs.openSync(configPath, "a"); //Open the file if there is one, if not, one will be created
		if (!f) {
			log.error("Unable to create configuration file!");

			alert("Unable to create configuration file!");
			throw new Error("Could not create config file!");
		}
		fs.closeSync(f);

		// Discord.setActivity({
		// 	state: 'Test',
		// 	details: 'testtestest',
		// 	startTimestamp: Date.now(),
		// 	endTimestamp: Date.now() + 1337,
		// 	instance: true,
		// });
	}

	const startSetup = (): void => {
		clearConfig();

		const pages: JSX.Element[] = [];

		//There's gotta be a better way of doing this
		Object.keys(selected).forEach(k => {
			if (selected[k]) {

				pages.push(<SignInSlide onSignIn={(us, pw) => Launchers[k].signIn(us, pw)} onSkip={() => console.log("a")} logo={Launchers[k].logo}></SignInSlide>)

				Object.values(Launchers[k].doSetup()).map((v: any) => {
					if (!v.isValid) {
						pages.push(<ErrorSlide error={v.error} onContinue={p => console.log("b")} logo={Launchers[k].logo}></ErrorSlide>)
					}
				})

			}

		});

		setStepAmount(100 / pages.length);
		setPages(pages);
	}


	function changeSlide(dir: "next" | "prev"): void {
		if (dir === "next") {
			if (index + 1 > pages.length) return;
			setIndex(index + 1);
		}
		else {
			if (index - 1 < 0) return;
			setIndex(index - 1);
		}
	}

	const slideSlider = (index: number, indexLatest: number): void => {
		//JQuery doesn't seem to support getting shadow root so this is the only way, sadly
		let el: any = document.getElementsByClassName("ol-setup-progress")[0].shadowRoot;
		if (!el) return;

		el = el.children[1].children[1]; //Get the active part of the slider

		if (index > indexLatest) { //This is equivalent to moving the slides to the left
			//However, I can still animate it with JQuery as long as I have found the element beforehand
			$(el).animate({
				//100% is not filled, 0% is filled, so to work out how much to show I must subtract from 100
				right: `${100 - (percent + stepAmount)}%`,
			}, 800, () => {
				stepPercent(percent + stepAmount);
			});
		}
		else {
			$(el).animate({
				right: `${100 - (percent - stepAmount)}%`,
			}, 800, () => {
				stepPercent(percent - stepAmount);
			});
		}
	}


	return (
		<IonContent class="ol-setup-main-content" scrollX={false} scrollY={false}>
			<div className="ol-setup-centre-box">
				<IonRange class="ol-setup-progress" value={percent}></IonRange>

				<IonItem class="ol-setup-back" lines="none" onClick={() => changeSlide("prev")}>
					<IonIcon icon={chevronBack} class="ol-icon"></IonIcon>
					<IonLabel>Back</IonLabel>
				</IonItem>


				<IonSlides class="ol-setup-slides">
					<IonSlide class="ol-setup-single-slide">
						<div className="ol-setup-thanks">
							Thanks for using OpenLauncher!
						</div>
						<div className="ol-setup-launcher-select-text">
							Please select the launchers you use:
						</div>

						<div className="ol-setup-launcher-select-container">
							{
								SupportedLaunchersFull.map((l, i) => (
									<IonItem class="ol-setup-launcher-select-button" lines="none" key={i}>
										<IonCheckbox mode="ios" class="ol-setup-launcher-checkbox"
											onIonChange={(e) => {
												setSelected(
													{ ...selected, [SupportedLaunchersShort[i]]: e.detail.checked }
												);
											}}
										></IonCheckbox>
										<IonText class="ol-setup-launcher-select-box-text">{l}</IonText>
									</IonItem>
								))
							}
						</div>

						<IonItem class="ol-setup-continue" lines="none" onClick={startSetup}>
							<IonIcon icon={chevronForward} class="ol-setup-continue-icon"></IonIcon>
						</IonItem>
					</IonSlide>

					<SteamSlide></SteamSlide>
				</IonSlides>
			</div>
			<IonLabel class="ol-dont-get-me-sued">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</IonLabel>
		</IonContent >
	);
}

export default SetupPage;
