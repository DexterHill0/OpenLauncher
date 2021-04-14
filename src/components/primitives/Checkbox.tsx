import React, { useState } from "react";

import IconCheckmark from "../icons/IconCheckmark";

import "../css/primitives/Checkbox.css";

interface Props {
	size: string;
	startSelected?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	class?: string;
}

const IconCheckbox: React.FC<Props> = (props) => {

	const [isChecked, setIsChecked] = useState(false);

	return (
		<div className={`${props.class || ""} ol-custom-checkbox-container`}
			onClick={(e) => { setIsChecked(!isChecked); if (props.onClick) props.onClick(e); }}
			style={{ "width": props.size, "height": props.size }}
		>
			<div className="ol-custom-checkbox-checkmark">
				{
					isChecked ? <IconCheckmark stroke="white"></IconCheckmark> : <></>
				}
			</div>
		</div>
	);
}

export default IconCheckbox;