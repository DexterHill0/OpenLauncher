import React from "react";

interface Props {
	class?: string;
}

const LoadingSpinner: React.FC<Props> = (props) => {

	return (
		<img className={props.class || ""} src={process.env.PUBLIC_URL + "/assets/loading.svg"} />
	)
}

export default LoadingSpinner;