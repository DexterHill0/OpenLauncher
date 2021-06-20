import React, { useState } from "react";

import { Icon, Checkmark } from "../icons/Icons";

import styles from "../css/primitives/Checkbox.module.css";

interface Props {
	size: string;
	startSelected?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	class?: string;
}

const Checkbox: React.FC<Props> = (props) => {

	const [isChecked, setIsChecked] = useState(props.startSelected || false);

	return (
		<div className={[styles["checkbox"], props.class].join(" ")}

			onClick={(e) => { setIsChecked(!isChecked); if (props.onClick) props.onClick(e); }}

			style={{
				width: props.size,
				height: props.size,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				boxSizing: "border-box"
			}}
		>
			{
				isChecked ? <Icon icon={Checkmark} stroke="white"></Icon> : <></>
			}
		</div>
	);
}

export default Checkbox;