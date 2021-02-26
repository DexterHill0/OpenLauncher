import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { person, lockClosed } from 'ionicons/icons';

import "./SignIn.css"

interface Props {
    onSignIn: (username: any, password: any) => void,
    inputText?: string,
    class?: string,
}

const SignInForm: React.FC<Props> = (props) => {
    const [inputs, setInput] = useState({ username: "", password: "" })

    return (
        <>
            <div className={`ol-signin-form-container ${props.class}`}>
                <div className="ol-signin-field ol-signin-field-username">
                    <label htmlFor="ol-signin-username">
                        <IonIcon class="ol-signin-icons" icon={person}></IonIcon>
                    </label>
                    <input onChange={(e) => setInput({ ...inputs, username: e.target.value })} className="ol-signin-username ol-signin-input" type="text" name="username" placeholder="Username" required></input>
                </div>

                <div className="ol-signin-field ol-signin-field-password">
                    <label htmlFor="ol-signin-password">
                        <IonIcon class="ol-signin-icons" icon={lockClosed}></IonIcon>
                    </label>
                    <input onChange={(e) => setInput({ ...inputs, password: e.target.value })} className="ol-signin-password ol-signin-input" type="password" name="password" placeholder="Password" required></input>
                </div>

                <div className="ol-signin-continue">
                    <input onClick={(e) => props.onSignIn(inputs.username, inputs.password)} className="ol-signin-submit ol-signin-input ol-input-button" type="submit" value={props.inputText ? props.inputText : "Sign In"}></input>
                </div>
            </div>
        </>
    );
}

export default SignInForm;