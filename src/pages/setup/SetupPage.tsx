import React, { useRef } from "react";

import Button from "../../components/primitives/Button";
import Checkbox from "../../components/primitives/Checkbox";
import Text from "../../components/primitives/Text";
import Item from "../../components/primitives/Item";
import ProgressBar from "../../components/primitives/ProgressBar";
import InfoCircle from "../../components/InfoCircle";
import Stars from "../../components/Stars";
import { Fader, FaderProps } from "../../components/Fader";

import styles from "../css/SetupPage.module.css";

const SetupPage = () => {

	const faderRef = useRef<FaderProps>(null);

	const fadeNext = () => {
		if (faderRef === null || faderRef.current === null) return;

		faderRef.current.fadeNext();
	}

	return (
		<div className={styles.mainPage}>
			<div className={styles.spaceGradient}></div>

			<div className={styles.stars}>
				<Stars></Stars>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<Fader startIndex={0} ref={faderRef} fadeTime={1000}>
						<>
							<div className={styles.launchers}>
								<Text class={styles.launchersTitle} fontSize="2.2rem" fontWeight={200}>Select the launchers you'd like to use:</Text>
								<div className={styles.launchersCheckboxes}>
									<Item
										start={<Checkbox size="1rem"></Checkbox>}
										middle={<Text fontSize="1.2rem" fontWeight={400}>Steam</Text>}
										end={<img src="/assets/logos/steam_logo.svg" width={30} height={30}></img>}
									></Item>
									<Item
										start={<Checkbox size="1rem"></Checkbox>}
										middle={<Text fontSize="1.2rem" fontWeight={400}>Epic Games Launcher</Text>}
										end={<img src="/assets/logos/epic_logo.svg" width={40} height={40}></img>}
									></Item>
								</div>
								<div className={styles.launchersAccount}>
									<Item
										start={<Checkbox size="1rem" startSelected></Checkbox>}
										middle={<Text fontSize="1rem" fontWeight={200}>Add accounts?</Text>}
										end={
											<InfoCircle
												size="1rem"
												tooltip="Will display pages (or try automatically) to sign you into your accounts of the launchers you selected. You can alway sign into them in Settings at a later time."
											></InfoCircle>
										}
									></Item>
								</div>
								<Button class={styles.launchersButton} width="10rem" height="2.5rem" gradientType="light" animateOnHover
									onClick={fadeNext}
								>
									<Text fontSize="1rem" fontWeight={400}>Continue</Text>
								</Button>
							</div>
						</>
					</Fader>
				</div>
				<div className={styles.progress}>
					<ProgressBar width="calc(100% - 10rem)" min={0} max={100} value={23} rocket vertical></ProgressBar>
				</div>
			</div>
		</div>
	);
}

export default SetupPage;