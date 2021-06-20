import React from "react";

import styles from "../css/primitives/Item.module.css";

interface Props {
	start?: JSX.Element;
	middle?: JSX.Element;
	end?: JSX.Element;
	background?: string;
}

const Item: React.FC<Props> = (props) => {

	return (
		<div className={styles["item"]}
			style={{ background: props.background || "", }}
		>
			<div
				style={{ paddingRight: props.middle ? "0.7rem" : "" }}
			>{props.start}</div>
			<div
				style={{ paddingRight: props.end ? "0.7rem" : "" }}
			>{props.middle}</div>
			<div>{props.end}</div>
		</div>
	)
}

export default Item;