import React from "react";

import { IconContext, IconType } from "react-icons";

interface Props {
	icon: IconType;
	colour?: string;
	size?: string;
}

const Icon: React.FC<Props> = (props) => {
	return (
		<IconContext.Provider value={{ color: props.colour, size: props.size || "100%", }}>
			<props.icon></props.icon>
		</IconContext.Provider>
	)
}

export default Icon;




