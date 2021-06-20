import React from "react";
import { Help, Icon } from "./icons/Icons";

import styles from "./css/InfoCircle.module.css";

interface Props {
	tooltip: string;
	size?: string;
}

const InfoCircle: React.FC<Props> = (props) => {

	return (
		<div className={styles["tooltip"]}
			style={{ width: props.size || "1rem", height: props.size || "1rem" }}
			ol-data-tooltip={props.tooltip}
		>
			<Icon icon={Help} strokeWidth="20px"></Icon>
		</div>
	)
}

export default InfoCircle;