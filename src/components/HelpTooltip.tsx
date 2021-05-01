import React from "react";
import { Help, Icon } from "./icons/Icons";

import "./css/HelpTooltip.css";

interface Props {
	tooltip: string;
	size?: string;
}


const HelpTooltip: React.FC<Props> = (props) => {

	return (
		<div className="ol-help-tooltip-container">
			<div className="ol-help-tooltip-icon"
				style={{ "width": props.size || "1rem", "height": props.size || "1rem" }}
			>
				<Icon icon={Help}></Icon>
			</div>
			<span className="ol-help-tooltip-text">{props.tooltip}</span>
		</div>
	)
}

export default HelpTooltip;