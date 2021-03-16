import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonLabel, IonIcon, IonCheckbox, IonItem, IonText, IonRange, IonSlides, IonSlide } from '@ionic/react';
import { chevronForward, chevronBack } from 'ionicons/icons';

import { getOS, configPath, SupportedLaunchersFull, SupportedLaunchersShort, setupLogger, clearConfig } from '../../utils/Utils';
import $ from "jquery";
import Epic from "../../scripts/launchers/EpicGames";
// import Discord from "../../scripts/DiscordRPC";

import SteamSlide from '../../components/setup/SteamSlide';

import './SetupPage.css';
import SwipeableViews from 'react-swipeable-views';

const fs = window.require("fs");

const log = setupLogger();


//Used so I can make the setter have different arguments
const usePages = () => {
	const [pages, setPages] = useState<JSX.Element[]>([]);

	const setter = (page: JSX.Element, action: "add" | "remove", index: number): void => {
		let newPages = pages;
		if (action === "add") newPages.splice(index, 0, page);
		else if (action === "remove") newPages.splice(index, 1);
		setPages(newPages);
	}

	return { pages, setPages: setter };
}



const SetupPage = () => {
	const slideRef = useRef<HTMLIonSlidesElement>(null)

	const [selected, setSelected] = useState<{ [key: string]: boolean }>({ "epic": false, "steam": false });

	const [stepAmount, setStepAmount] = useState(0);
	const [percent, stepPercent] = useState(0);

	const { pages, setPages } = usePages();

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
		animateSlider("next");
	}, [stepAmount]); //The only time this changes is when the arrow is clicked so it is safe to assume the user is on the next slide

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

		Object.keys(selected).forEach(k => {
			if (selected[k]) {

			}
		});

		if (slideRef.current === null) return;

		slideRef.current.getSwiper().then(sw => {
			setStepAmount(100 / sw.slides.length);
		});

		changeSlide("next");
	}

	const changeSlide = (dir: "next" | "prev") => {
		if (slideRef.current === null) return;

		slideRef.current.getSwiper().then(sw => {
			const index = sw.activeIndex;

			if (dir === "next") {

			}
			else {

			}

		});
	}

	const animateSlider = (dir: "next" | "prev"): void => {
		//JQuery doesn't seem to support getting shadow root so this is the only way, sadly
		let el: any = document.getElementsByClassName("ol-setup-progress")[0].shadowRoot;
		if (!el || !el.children[1]) return;

		el = el.children[1].children[1]; //Get the active part of the slider

		if (dir === "next") { //This is equivalent to moving the slides to the left
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

				<IonItem class="ol-setup-back" lines="none" >
					<IonIcon icon={chevronBack} class="ol-icon"></IonIcon>
					<IonLabel>Back</IonLabel>
				</IonItem>


				<SwipeableViews
					containerStyle={{ "width": "40rem", "height": "23rem", "textAlign": "center" }}
					index={1}
					enableMouseEvents
				>
					<div>
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
					</div>

					<SteamSlide
						slideShouldChange={(dir) => changeSlide(dir)}
					></SteamSlide>

				</SwipeableViews>
			</div>
			<IonLabel class="ol-dont-get-me-sued">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</IonLabel>
		</IonContent >
	);
}

export default SetupPage;
