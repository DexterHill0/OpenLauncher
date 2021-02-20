import React from 'react';
import { IonGrid, IonRow } from '@ionic/react';

import SignInForm from '../../inputs/SignIn';

import "./SlideComponentStyles.css"

interface Props {
	onSignIn: (username: any, password: any) => void,
	onSkip: () => void,
	logo?: JSX.Element,
	displayInputs?: boolean,
	inputText?: string,
}

const SignInSlide: React.FC<Props> = (props) => {

	return (
		<div className="ol-signin-slide-container">
			<IonGrid class="ol-slide-grid">
				<IonRow class="ol-slide-grid-row">
					{props.logo || <></>}
				</IonRow>
				<IonRow class="ol-slide-grid-row">
					<SignInForm
						onSignIn={(us, pw) => props.onSignIn(us, pw)}
						inputText={props.inputText}
					></SignInForm>
				</IonRow>
				<IonRow class="ol-slide-grid-row">
					<div className="ol-skip-login-text">
						Don't want to login? <a onClick={() => props.onSkip()} style={{ "cursor": "pointer" }} className="ol-skip-signin">Skip</a>
						<br />
						<div className="ol-what-for-text">What is this for?
							<span className="ol-what-tooltip">By signing into to your accounts, OpenLauncher can display your profile, store and other account dependant things. All usernames and passwords are securely stored on your local machine. If you don't login, you will not lose access to any games already installed. </span>
						</div>
					</div>
				</IonRow>
			</IonGrid>
		</div>
	);
}

export default SignInSlide;