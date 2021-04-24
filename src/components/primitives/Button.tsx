import React from "react";

import "../css/primitives/Button.css";

interface Props {
    width: string;
    height: string;
    gradientType: "dark" | "light";
    disabled?: boolean;
    animateOnHover?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    class?: string;
}

const Button: React.FC<Props> = (props) => {

    return (
        <div
            style={{ "width": props.width, "height": props.height, "opacity": props.disabled ? "0.7" : "auto", "cursor": props.disabled ? "not-allowed" : "pointer" }}
            onClick={(e) => { if (props.onClick && !props.disabled) props.onClick(e); }}
            className={`ol-custom-button ${props.gradientType} ${props.animateOnHover ? "ol-button-hover-animate" : ""} ${props.disabled ? "disabled" : ""} ${props.class || ""}`}>
            <span>{props.children}</span>
        </div>
    )
}

export default Button;