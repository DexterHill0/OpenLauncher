import React from "react";

import Button from "../../components/primitives/Button";
import Text from "../../components/primitives/Text";
import ProgressBar from "../../components/primitives/ProgressBar";

import "../css/SetupPage.css";

const SetupPage = () => {

	return (
		<div className="ol-setup-page">
			<Button width="7rem" height="5rem" gradientType="light" animateOnHover>
				<Text fontSize="1rem" fontWeight={200}>I am button</Text>
			</Button>
			<ProgressBar width="100%" min={0} max={100} value={34} rocket></ProgressBar>
		</div>
	);
}

export default SetupPage;

//<IonLabel class="ol-dont-get-me-sued">All product names, logos, and brands are property of their respective owners in the United Kingdom and/or other countries. All company, product and service names used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.</IonLabel>