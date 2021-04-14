import React from "react";

import IconRocket from "../icons/IconRocket";

import "../css/primitives/ProgressBar.css";

interface Props {
    min: number;
    max: number;
    width: string;
    value?: number;
    rocket?: boolean;
    class?: string;
}

const ProgressBar: React.FC<Props> = (props) => {

    return (
        <div className={`${props.class || ""} ol-progress-bar-container`}
            style={{ "width": props.width }}
        >
            <div className="ol-progress-bar-filled"
                style={{
                    "width": `calc(${props.width} * ${(props.value || 0) / (props.max - props.min)})`,
                    "borderRadius": props.rocket ? "1rem 0 0 1rem" : "1rem",
                }}
            >
                {
                    props.rocket ?
                        <div className="ol-progress-bar-filled-rocket"
                            style={{ "marginLeft": "calc(100% - 0.75rem)" }}
                        >
                            <IconRocket stroke="url(#ol-svg-gradient-dark)" strokeWidth={25}></IconRocket>
                        </div> : <></>
                }
            </div>
        </div>
    )
}

export default ProgressBar;