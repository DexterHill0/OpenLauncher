import React, { useState } from "react";

import { IoCheckmarkOutline } from "react-icons/io5";
import Icon from "../icons/Icon";

import styles from "../css/primitives/Checkbox.module.css";

interface Props {
	size: string;
	startSelected?: boolean;
	onChecked?: (isChecked: boolean) => void;
	class?: string;
}

const Checkbox: React.FC<Props> = (props) => {

	const [isChecked, setIsChecked] = useState(props.startSelected || false);

	return (
		<div className={[styles.checkbox, props.class].join(" ")}

			onClick={() => { setIsChecked(!isChecked); props.onChecked && props.onChecked(!isChecked); }}

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