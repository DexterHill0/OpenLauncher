import React from "react";

import { IconContext, IconType } from "react-icons";

interface Props {
	icon: IconType;
	colour?: string;
	strokeWeight?: string;
}

const Icon: React.FC<Props> = (props) => {
	return (
		<IconContext.Provider value={{ color: props.colour, size: "100%", attr: { strokeWidth: props.strokeWeight } }}>
			<props.icon></props.icon>
		</IconContext.Provider>
	)
}

export default Icon;




