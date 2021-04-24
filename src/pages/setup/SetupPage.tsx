import React from "react";

import Button from "../../components/primitives/Button";
import Text from "../../components/primitives/Text";
import ProgressBar from "../../components/primitives/ProgressBar";

import "../css/SetupPage.css";
import Stars from "../../components/Stars";

const SetupPage = () => {

	return (
		<div className="ol-setup-page">
			<div className="ol-setup-page-space-gradient"></div>

			<div className="ol-setup-page-stars">
				<Stars></Stars>
			</div>

			<div className="ol-setup-page-content-container">
				<div className="ol-setup-page-content">
					<Button width="7rem" height="2rem" gradientType="light" animateOnHover>
						<Text fontSize="1rem" fontWeight={200}>I am a button</Text>
					</Button>
				</div>
				<div className="ol-setup-page-progress-bar">
					<ProgressBar width="calc(100% - 10rem)" min={0} max={100} value={54} rocket vertical></ProgressBar>
				</div>
			</div>
		</div>
	);
}

export default SetupPage;

//<IonLabel class="ol-dont-get-me-sued">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</IonLabel>