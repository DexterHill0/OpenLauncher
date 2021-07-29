import React from "react";

interface Props {
	class?: string;
}

const Separator: React.FC<Props> = (props) => {

	return (
		<div style={{
			width: "100%",
			height: "0.12rem",
			background: "var(--ol-colour-not-selected)",
			opacity: 0.3,
		}} className={props.class}></div>
	)
}

export default Separator;