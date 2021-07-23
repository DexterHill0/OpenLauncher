import React, { useState } from "react";

import { IoCheckmarkOutline } from "react-icons/io5";
import Icon from "../icons/Icon";

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
		<div className={[styles.checkbox, props.class].join(" ")}

			onClick={(e) => { setIsChecked(!isChecked); props.onClick && props.onClick(e); }}

			style={{
				width: props.size,
				height: props.size,
			}}
		>
			{
				isChecked ? <Icon icon={IoCheckmarkOutline} colour="white"></Icon> : <></>
			}
		</div>
	);
}

export default Checkbox;