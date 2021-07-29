import React from "react";

interface Props {
	fontSize: string;
	fontWeight?: 200 | 400;
	fonstStyle?: "italic" | "regular";
	textDecoration?: "underline";
	class?: string;
}

const Text: React.FC<Props> = (props) => {

	return (
		<span
			className={`${props.class || ""}`}
			style={{ "fontSize": props.fontSize, "fontWeight": props.fontWeight, "fontStyle": props.fonstStyle, textDecoration: props.textDecoration }}
		>
			{props.children}
		</span>
	)
}

export default Text;