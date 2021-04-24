import React from "react";

import { Icon, Rocket } from "../icons/Icons";

import "../css/primitives/ProgressBar.css";

interface Props {
    min: number;
    max: number;
    width: string;
    vertical?: boolean;
    value?: number;
    rocket?: boolean;
    class?: string;
}

const ProgressBar: React.FC<Props> = (props) => {

    return (
        <div className={`${props.class || ""} ol-progress-bar-container`}
            style={{
                [props.vertical ? "height" : "width"]: props.width,
                [props.vertical ? "width" : "height"]: "0.35rem",
            }}
        >
            <div className="ol-progress-bar-filled-container">
                <div className="ol-progress-bar-filled"
                    style={{
                        [props.vertical ? "height" : "width"]: `calc(100% * ${(props.value || 0) / (props.max - props.min)})`,
                        [props.vertical ? "width" : "height"]: "0.35rem",
                        "background": `linear-gradient(${props.vertical ? "360deg" : "90deg"}, var(--ol-colour-red), var(--ol-colour-yellow))`,
                        "borderRadius": props.rocket ? props.vertical ? "0 0 1rem 1rem" : "1rem 0 0 1rem" : "1rem",
                        "bottom": props.vertical ? "0px" : "",
                    }}
                >
                    {
                        props.rocket ?
                            <div className="ol-progress-bar-filled-rocket"
                                style={{
                                    [props.vertical ? "marginTop" : "marginLeft"]: `calc(100% - ${props.vertical ? "4.4" : "0.7"}rem)`,
                                    [props.vertical ? "paddingBottom" : "paddingRight"]: "4.35rem",
                                    transform: `rotate(${props.vertical ? "-" : ""}45deg)`
                                }}
                            >
                                <Icon icon={Rocket} stroke={"ol-svg-gradient-dark"} strokeWidth="20px" gradient></Icon>
                            </div> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;