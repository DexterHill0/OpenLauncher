import React, { useImperativeHandle, useState } from "react";

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
	getCurrentIndex: () => number;
}

//Store the value globally so that it isnt reset to 0 when the component updates
let nextChild = 0;

export const Fader = React.forwardRef<FaderProps, Props>((props, ref) => {
	const children = React.Children.toArray(props.children);

	const [currentChild, setCurrentChild] = useState({
		child: props.startIndex || 0,
		direction: 1,
	});

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
		if ((currentChild.child - 1) < 0) return;

		queueNextFade();

		setCurrentChild({
			child: currentChild.child,
			direction: +!currentChild.direction,
		});

		nextChild = currentChild.child - 1;
	}

	const fadeTo = (index: number): void => {
		if (index < 0 || index > children.length) return;

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
		}, props.fadeTime || 500);
	}

	const getCurrentIndex = () => {
		return nextChild;
	}

	useImperativeHandle(ref, () => ({ fadeNext, fadePrev, fadeTo, getCurrentIndex }));

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
							display: "flex",
							alignItems: "center",
							zIndex: i === currentChild.child ? 1 : -100,
						}}
					>
						{child}
					</div>
				))
			}
		</div>
	)
});