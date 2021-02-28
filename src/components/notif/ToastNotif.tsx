import React from "react";
import ReactDOMServer from "react-dom/server";
import { IonCol, IonGrid, IonItem, IonRow } from "@ionic/react";

import $ from "jquery";

import "./ToastNotif.css"

interface Props {
    message: JSX.Element,
    duration: number,
    class: string,
    icon?: JSX.Element,
}

class ToastNotif {
    props: Props;

    constructor(props: Props) {
        this.props = props;

        this.display();
    }

    private createModalContent() {
        const icon = this.props.icon;
        const message = this.props.message;

        try {
            customElements.define(`${this.props.class}-modal-content`, class extends HTMLElement {
                connectedCallback() {
                    //Using grids to make sure the content is centred
                    let newMessage = <IonGrid class="ol-modal-notif-grid"><IonRow>{message}</IonRow></IonGrid>;

                    if (icon) {
                        newMessage = (
                            <IonGrid class="ol-modal-notif-grid">
                                <IonItem lines="none" class="ol-modal-notif-grid-item">
                                    <div slot="start" className="ol-modal-item-slotted">{icon}</div>
                                    <div slot="end" className="ol-modal-item-slotted">{message}</div>
                                </IonItem>
                            </IonGrid>
                        );
                    }


                    this.innerHTML = ReactDOMServer.renderToString(newMessage);
                }
            });
        } catch (e) {
            //Since you can't undefine custom elements, if there's an error that usually means the component is already
            //defined, so I can just ignore it
        }
    }

    private waitToDismiss() {
        setTimeout(() => {
            $(`.${this.props.class}`).remove();
        }, this.props.duration);
    }

    private display() {
        this.createModalContent();

        const modalElement = document.createElement("ion-modal");
        modalElement.component = `${this.props.class}-modal-content`;
        modalElement.cssClass = `${this.props.class} ol-modal-notif`;
        modalElement.showBackdrop = false;
        modalElement.backdropDismiss = false;

        document.body.appendChild(modalElement);
        modalElement.present();

        this.waitToDismiss();
    }
}

export default ToastNotif;