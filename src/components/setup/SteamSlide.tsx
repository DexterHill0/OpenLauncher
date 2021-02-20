import React from 'react';
import { IonLabel, IonIcon, IonItem, IonSlides, IonSlide } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';


interface Props {

}


const SteamSlide: React.FC<Props> = (props) => {
    return (
        <div>

            <IonItem class="ol-setup-back" lines="none">
                <IonIcon icon={chevronBack} class="ol-icon"></IonIcon>
                <IonLabel>Back</IonLabel>
            </IonItem>

            <IonSlides>
                <IonSlide>TEST!</IonSlide>
            </IonSlides>
        </div>
    );
}

export default SteamSlide;
