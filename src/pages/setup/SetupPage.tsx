import React, { useRef, useState, useEffect } from "react";

import Button from "../../components/primitives/Button";
import Checkbox from "../../components/primitives/Checkbox";
import Text from "../../components/primitives/Text";
import Item from "../../components/primitives/Item";
import ProgressBar from "../../components/primitives/ProgressBar";
import InfoCircle from "../../components/InfoCircle";
import Stars from "../../components/Stars";
import { Fader, FaderProps } from "../../components/Fader";
import Icon from "../../components/icons/Icon";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { toast } from "../../providers/ToastProvider";
import Logger from "../../scripts/Logger";

import SteamCard from "./launchers/SteamCard";

import styles from "../css/setup/SetupPage.module.css";


let totalPages = 2;

const SetupPage = () => {
	//"s" for Steam, "e" for Epic Games etc
	const [selected, setSelected] = useState({ s: false, e: false });
	let addAccounts = navigator.onLine;

	const [continueDisabled, setContinueDisabled] = useState(true);

	const [percent, setPercent] = useState(0);

	useEffect(() => {
		//Warn the user that they cant use their accounts without internet
		if (!navigator.onLine) toast.error("Internet connectivity is required to be able to login to your accounts!");

		Logger.log(`Setup page loaded, user is online: ${navigator.onLine}`);
	}, []);

	useEffect(() => {
		//Disable the button if a launcher wasnt selected
		setContinueDisabled(Object.values(selected).every(v => !v))
	}, [selected]);

	const faderRef = useRef<FaderProps>(null);
	const fadeNext = () => {
		if (faderRef.current === null) return;

		faderRef.current.fadeNext();

		setPercent(faderRef.current.getCurrentIndex() / totalPages * 100);
	}

	const fadePrev = () => {
		if (faderRef.current === null) return;

		faderRef.current.fadePrev();

		setPercent(faderRef.current.getCurrentIndex() / totalPages * 100);
	}

	const setupRest = () => {
		//Count the total number of pages
		totalPages = 2 + (addAccounts ? Object.values(selected).filter(v => v).length : 0);

		fadeNext();
	}

	return (
		<div className={styles.mainPage}>
			<div className={styles.spaceGradient}></div>

			<div className={styles.stars}>
				<Stars></Stars>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>

					<div className={styles.textContainer}>
						<div className={styles.backText} onClick={() => (faderRef.current && faderRef.current.getCurrentIndex() > 0) && fadePrev()}>
							<Item
								middle={<Text fontSize="1.3rem">Back</Text>}
								start={<Icon icon={IoChevronBackOutline} size="1.5rem"></Icon>}
							></Item>
						</div>
						<div className={styles.skipText} onClick={() => (faderRef.current && faderRef.current.getCurrentIndex() > 0) && fadeNext()}>
							<Item
								start={<Text fontSize="1.3rem">Skip</Text>}
								middle={<Icon icon={IoChevronForwardOutline} size="1.5rem"></Icon>}
							></Item>
						</div>
					</div>

					<Fader startIndex={1} ref={faderRef} fadeTime={1000}>
						<div className={styles.launchers}>
							<Text class={styles.launchersTitle} fontSize="2.2rem" fontWeight={200}>Select the launchers you'd like to use:</Text>
							<div className={styles.launchersCheckboxes}>
								<Item
									start={<Checkbox size="1rem" onChecked={(c) => setSelected({ ...selected, s: c })}></Checkbox>}

									middle={<Text fontSize="1.2rem">Steam</Text>}
									end={<img src="/assets/logos/steam_logo.svg" width={30} height={30}></img>}
								></Item>
								<Item
									start={<Checkbox size="1rem" onChecked={(c) => setSelected({ ...selected, e: c })}></Checkbox>}

									middle={<Text fontSize="1.2rem">Epic Games Launcher</Text>}
									end={<img src="/assets/logos/epic_logo.svg" width={40} height={40}></img>}
								></Item>
							</div>
							<div className={styles.launchersAccount}>
								<Item
									start={<Checkbox size="1rem" onChecked={(c) => addAccounts = c} startSelected={navigator.onLine}></Checkbox>}
									middle={<Text fontSize="1rem" fontWeight={200}>Add accounts?</Text>}
									end={
										<InfoCircle
											size="1rem"
											tooltip="Gives the option to sign you into your accounts of the launchers you selected. You can alway sign into them in Settings at a later time."
										></InfoCircle>
									}
									disabled={!navigator.onLine}
								></Item>
							</div>
							<Button class={styles.launchersButton} width="10rem" height="2.5rem" gradientType="light" animateOnHover
								disabled={continueDisabled}
								onClick={setupRest}
							>
								<Text fontSize="1rem">Continue</Text>
							</Button>
						</div>
						{
							// addAccounts && selected.s ? <SteamCard></SteamCard> : <></>
							<SteamCard></SteamCard>
						}
						{
							addAccounts && selected.e ? <div>epic games</div> : <></>
						}
					</Fader>
				</div>
				<div className={styles.progress}>
					<ProgressBar width="calc(100% - 10rem)" min={0} max={100} value={percent} rocket vertical></ProgressBar>
				</div>
			</div>
		</div>
	);
}

export default SetupPage;