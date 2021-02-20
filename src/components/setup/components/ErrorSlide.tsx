import React from 'react';

import $ from "jquery";

import "./SlideStyles.css"
import { IonGrid, IonRow } from '@ionic/react';

interface Props {
	error: JSX.Element,
	onContinue: (data: any) => void,
	logo?: JSX.Element,
	extraDetail?: any,
}

const ErrorSlide: React.FC<Props> = (props) => {

	return (
		<div className="ol-error-slide-container">
			<IonGrid class="ol-slide-grid">
				<IonRow class="ol-slide-grid-row ion-justify-content-evenly">
					{props.logo || <></>}
				</IonRow>
				<IonRow class="ol-slide-grid-row ion-justify-content-evenly">
					<div className="ol-error-not-found">
						<div className="ol-error-info">
							{props.error}
						</div>
						<div className="ol-error-field">
							<input className="ol-error-path-input ol-error-input" type="text" name="path" placeholder="Type here"></input>
						</div>
						<div className="ol-error-field">
							<input onClick={(e) => {
								props.onContinue($(e.target).parents().eq(1).find(".ol-form-path-input").val());
							}} className="ol-error-path-submit ol-error-input" type="submit" value="Continue"></input>
						</div>
					</div>
				</IonRow>
				{
					props.extraDetail ?
						<IonRow class="ol-slide-grid-row">
							{props.extraDetail}
						</IonRow>
						:
						<></>
				}
			</IonGrid>
		</div>
	);
}

export default ErrorSlide;