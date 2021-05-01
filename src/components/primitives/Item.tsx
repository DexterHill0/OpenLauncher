import React from "react";

import "../css/primitives/Item.css";

interface Props {
	start?: JSX.Element;
	middle?: JSX.Element;
	end?: JSX.Element;
	background?: string;
}

const Item: React.FC<Props> = (props) => {

	return (
		<div className="ol-item-template"
			style={{ "background": props.background || "", }}
		>
			<div className="ol-item-template-start"
				style={{ "paddingRight": props.middle ? "0.7rem" : "" }}
			>{props.start}</div>
			<div className="ol-item-template-middle"
				style={{ "paddingRight": props.end ? "0.7rem" : "" }}
			>{props.middle}</div>
			<div className="ol-item-template-end">{props.end}</div>
		</div>
	)
}

export default Item;