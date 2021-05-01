import React, { useRef } from "react";

import Button from "../../components/primitives/Button";
import Checkbox from "../../components/primitives/Checkbox";
import Text from "../../components/primitives/Text";
import Item from "../../components/primitives/Item";
import ProgressBar from "../../components/primitives/ProgressBar";

import HelpTooltip from "../../components/HelpTooltip";
import Stars from "../../components/Stars";
import { Fader, FaderProps } from "../../components/Fader";

import "../css/SetupPage.css";

const SetupPage = () => {

	const faderRef = useRef<FaderProps>(null);

	return (
		<div className="ol-setup-page">
			<div className="ol-setup-page-space-gradient"></div>

			<div className="ol-setup-page-stars">
				<Stars></Stars>
			</div>

			<div className="ol-setup-page-content-container">
				<div className="ol-setup-page-content">
					<Button width="10rem" height="2.5rem" gradientType="light" animateOnHover
						onClick={() => {
							if (faderRef === null || faderRef.current === null) return;
							faderRef?.current?.fadeNext();
						}}
					>
						<Text fontSize="1rem" fontWeight={400}>Continue</Text>
					</Button>

					<Fader startIndex={0} ref={faderRef} fadeTime={1000}>
						<div>
							<div className="ol-setup-page-select-launchers-container">
								<Text fontSize="2.2rem" fontWeight={200}>Select the launchers you'd like to use:</Text>
								<div className="ol-setup-page-select-launchers-checkboxes">
								</div>
								<div className="ol-setup-page-select-launchers-account">
									<Item
										start={<Checkbox size="1rem"></Checkbox>}
										middle={<Text fontSize="1rem" fontWeight={200}>Add accounts?</Text>}
										end={
											<HelpTooltip
												size="1.2rem"
												tooltip="Will display pages (or try automatically) to sign you into your accounts of the launchers you selected. You can alway sign into them in Settings at a later time."
											></HelpTooltip>
										}
									></Item>
								</div>
							</div>
						</div>
					</Fader>
				</div>
				<div className="ol-setup-page-progress-bar">
					<ProgressBar width="calc(100% - 10rem)" min={0} max={100} value={23} rocket vertical></ProgressBar>
				</div>
			</div>
		</div>
	);
}

export default SetupPage;

//<IonLabel class="ol-dont-get-me-sued">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</IonLabel>