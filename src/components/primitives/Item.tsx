import React from "react";

import styles from "../css/primitives/Item.module.css";

interface Props {
	start?: JSX.Element;
	middle?: JSX.Element;
	end?: JSX.Element;
	background?: string;
	disabled?: boolean;
}

const Item: React.FC<Props> = (props) => {

	return (
		<div className={styles.item}
			style={{
				background: props.background || "",
				opacity: props.disabled ? 0.7 : 1,
				pointerEvents: props.disabled ? "none" : undefined,
			}}
		>
			<div
				style={{ paddingRight: props.middle ? "1rem" : "" }}
			>{props.start}</div>
			<div
				style={{ paddingRight: props.end ? "1rem" : "" }}
			>{props.middle}</div>
			{props.end}
		</div>
	)
}

export default Item;