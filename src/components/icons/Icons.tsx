import React from "react";

interface Props {
    icon: any;
    stroke?: string;
    strokeWidth?: string;
    gradient?: boolean;
}

const Icon: React.FC<Props> = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            style={{
                "stroke": (props.stroke ? props.gradient ? `url(#${props.stroke})` : props.stroke : "white"),
                "strokeWidth": props.strokeWidth ? props.strokeWidth : "32px"
            }}
        >
            <defs>
                <linearGradient id="ol-svg-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(-42)">
                    <stop offset="0%" stopColor="var(--ol-colour-yellow)" />
                    <stop offset="60%" stopColor="var(--ol-colour-red)" />
                </linearGradient>
                <linearGradient id="ol-svg-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(-42)">
                    <stop offset="0%" stopColor="var(--ol-colour-light-yellow)" />
                    <stop offset="60%" stopColor="var(--ol-colour-light-red)" />
                </linearGradient>
            </defs>
            {props.icon()}
        </svg>
    )
}

export { Icon };
export { default as LogoGithub } from "./IconLogoGithub";
export { default as Checkmark } from "./IconCheckmark";
export { default as Rocket } from "./IconRocket";




