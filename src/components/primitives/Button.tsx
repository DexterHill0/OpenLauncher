import React from "react";

import "../css/primitives/Button.css";

interface Props {
    width: string;
    height: string;
    gradientType: "dark" | "light";
    animateOnHover?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    class?: string;
}

const Button: React.FC<Props> = (props) => {

    return (
        <div
            style={{ "width": props.width, "height": props.height }}
            onClick={props.onClick && props.onClick}
            className={`ol-custom-button ${props.gradientType} ${props.animateOnHover ? "ol-button-hover-animate" : ""} ${props.class || ""}`}>
            <span>{props.children}</span>
        </div>
    )
}

export default Button;