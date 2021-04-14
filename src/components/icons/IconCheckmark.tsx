import React from "react";

// https://ionicons.com/

const IconCheckmark = ({ strokeWidth = 32, stroke = "white" }) => {

    return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M416 128L192 384l-96-96" /></svg>
    );
}

export default IconCheckmark;