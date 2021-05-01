import React, { useState } from "react";

import { Icon, Checkmark } from "../icons/Icons";

import "../css/primitives/Checkbox.css";

interface Props {
	size: string;
	startSelected?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	class?: string;
}

const Checkbox: React.FC<Props> = (props) => {

	const [isChecked, setIsChecked] = useState(false);

	return (
		<div className={`${props.class || ""} ol-custom-checkbox-container`}
			onClick={(e) => { setIsChecked(!isChecked); if (props.onClick) props.onClick(e); }}
			style={{ "width": props.size, "height": props.size }}
		>
			{
				isChecked ? <Icon icon={Checkmark} stroke="white"></Icon> : <></>
			}
		</div>
	);
}

export default Checkbox;