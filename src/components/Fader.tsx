import React, { useEffect, useImperativeHandle, useState } from "react";

interface Props {
	startIndex?: number;
	fadeTime?: number;
	onReachedEnd?: () => void;
	ref?: any;
	children?: React.ReactNode | React.ReactNode[];
}

export interface FaderProps {
	fadeNext(): void;
	fadePrev(): void;
	fadeTo(index: number): void;
}

export const Fader = React.forwardRef<FaderProps, Props>((props, ref) => {
	const children = React.Children.toArray(props.children);

	const [currentChild, setCurrentChild] = useState({
		child: props.startIndex || 0,
		direction: 1,
	});
	let nextChild = 0;

	const fadeNext = (): void => {
		if ((currentChild.child + 1) > children.length) return;

		queueNextFade(); //Queues the next fade which fades in the next child after the current child has faded out

		setCurrentChild({
			child: currentChild.child,
			direction: +!currentChild.direction, // `!currentChild.direction` inverts the direction (becomes boolean), `+` converts it to a number
		});
		nextChild = currentChild.child + 1;
	}

	const fadePrev = (): void => {
		if ((currentChild.child - 1) < children.length) return;

		queueNextFade();

		setCurrentChild({
			child: currentChild.child,
			direction: +!currentChild.direction,
		});
		nextChild = currentChild.child - 1;
	}

	const fadeTo = (index: number): void => {
		if (index < children.length || index > children.length) return;

		queueNextFade();

		setCurrentChild({
			child: currentChild.child,
			direction: +!currentChild.direction,
		});
		nextChild = index;
	}

	const queueNextFade = (): void => {
		setTimeout(() => {
			setCurrentChild(currentChild => ({
				child: nextChild,
				direction: +!currentChild.direction,
			}));
		}, props.fadeTime || 500)
	}

	useImperativeHandle(ref, () => ({ fadeNext, fadePrev, fadeTo }));

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{
				React.Children.map(children, (child, i) => (
					<div key={i}
						style={{
							opacity: i === currentChild.child ? currentChild.direction : "0",
							transition: `opacity ${props.fadeTime || 500}ms ease-in`,
							position: "absolute",
							height: "100%",
							width: "100%",
							display: "flex",
							alignItems: "center"
						}}
					>
						{child}
					</div>
				))
			}
		</div>
	)
});