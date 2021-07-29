import React from "react";

import styles from "../css/primitives/Button.module.css";

interface Props {
	width: string;
	height: string;
	gradientType: "dark" | "light";
	disabled?: boolean;
	submit?: { formId: string }
	animateOnHover?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	class?: string;
}

const Button: React.FC<Props> = (props) => {

	const classNames = [
		styles.button,
		styles[props.gradientType],
		styles[(props.animateOnHover && !props.disabled) ? "animate" : ""],
		props.class,
	].join(" ");

	return (
		<button
			onClick={(e) => (props.onClick && !props.disabled) && props.onClick(e)}

			disabled={props.disabled}
			type={props.submit ? "submit" : undefined}
			form={props.submit?.formId}

			style={{
				width: props.width,
				height: props.height,
				opacity: props.disabled ? "0.7" : undefined,
				cursor: props.disabled ? "not-allowed" : "pointer"
			}}

			className={classNames}
		>
			{props.children}
		</button>
	)
}

export default Button;

//props.class || ""