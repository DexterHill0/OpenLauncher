import React, { useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface Props {
	src: string;
	width?: number;
	height?: number;
}

const SkeletonImage: React.FC<Props> = (props) => {

	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div>
			{
				!isLoaded ?
					<SkeletonTheme color="var(--ol-colour-tertiary-dark)" highlightColor="var(--ol-colour-not-selected)">
						<Skeleton width={props.width || 200} height={props.height || 200} />
					</SkeletonTheme>
					: <></>
			}
			<img src={props.src} onLoad={() => setIsLoaded(true)}></img>
		</div>
	)
}

export default SkeletonImage;