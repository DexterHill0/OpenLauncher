import React from 'react';
import { IonIcon } from '@ionic/react';
import { person, lockClosed } from 'ionicons/icons';

import $ from "jquery";

import "./SignIn.css"

interface Props {
    onSignIn: (username: any, password: any) => void,
    inputText?: string,
    class?: string,
}

const SignInForm: React.FC<Props> = (props) => {
    return (
        <>
            <div className={`ol-signin-form-container ${props.class}`}>
                <div className="ol-signin-field ol-signin-field-username">
                    <label htmlFor="ol-signin-username">
                        <IonIcon class="ol-signin-icons" icon={person}></IonIcon>
                    </label>
                    <input className="ol-signin-username ol-signin-input" type="text" name="username" placeholder="Username" required></input>
                </div>

                <div className="ol-signin-field ol-signin-field-password">
                    <label htmlFor="ol-signin-password">
                        <IonIcon class="ol-signin-icons" icon={lockClosed}></IonIcon>
                    </label>
                    <input className="ol-signin-password ol-signin-input" type="password" name="password" placeholder="Password" required></input>
                </div>

                <div className="ol-signin-continue">
                    <input onClick={(e) => {
                        //I would use states but because the IonSlides fix instances this component, I have to use JQuery instead
                        let parent = $(e.target).parents().eq(1);
                        props.onSignIn(parent.find(".ol-form-username").val(), parent.find(".ol-form-password").val())
                    }} className="ol-signin-submit ol-signin-input" type="submit" value={props.inputText ? props.inputText : "Sign In"}></input>
                </div>
            </div>
        </>
    );
}

export default SignInForm;