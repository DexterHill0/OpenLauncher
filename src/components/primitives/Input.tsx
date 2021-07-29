import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "../css/primitives/Input.module.css";

interface Props {
	onChange?: (e: any) => void;
	placeholder?: string;
	width?: string;
	height?: string;
	type?: "password";
	required?: boolean;
	disabled?: boolean;
	icon?: JSX.Element;
	class?: string;
}

const Input: React.FC<Props> = (props) => {

	return (
		<div>

			<div className={styles.container} style={{
				width: props.width,
				height: props.height,
				opacity: props.disabled ? "0.6" : "1",
			}}>
				{
					props.icon ?
						<label htmlFor="ol-input-box" className={styles.label}>
							{props.icon}
						</label>
						: <></>
				}
				<input onChange={(e) => props.onChange && props.onChange(e)} className={["ol-input-box", styles.inputBox].join(" ")} type={props.type}
					placeholder={props.placeholder}
					required={props.required}
					disabled={props.disabled}
					style={{
						"borderLeftWidth": props.icon ? "0px" : "auto",
						"borderTopLeftRadius": props.icon ? "0px" : "auto",
						"borderBottomLeftRadius": props.icon ? "0px" : "auto",
					}}
				></input>
			</div>
		</div>
	);
}

export default Input;