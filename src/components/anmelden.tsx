import * as React from "react";

import { MessageVO } from "./message";
import { EmailInput } from "./emailinput";
import { NumberInput } from "./numberinput";
import { GenericInput } from "./genericinput";
import { SubmitInput, SubmitState } from "./submitinput";
import * as isEmail from "validator/lib/isEmail";
import * as isAlpha from "validator/lib/isAlpha";


export interface AnmeldenProps { 
    onEmitMessage (message: MessageVO) : void;
}

interface AnmeldenState {
    email       : string,
    vorname     : string,
    nachname    : string,
    numGuests   : string,
    isFormValid : boolean,

    submitState : SubmitState,

    recaptchaSecret : string,

    emValid     : boolean,
    vnValid     : boolean,
    nnValid     : boolean,
    ngValid     : boolean
}

export class Anmelden extends React.Component<AnmeldenProps, AnmeldenState> {
    constructor() {
        super();
        this.state = this.initialState();
    }

    private initialState() : AnmeldenState {
        return { email : "", vorname : "", 
            nachname : "", numGuests : "0",
            recaptchaSecret : null,
            submitState : SubmitState.DEFAULT,
            emValid : false, vnValid : false, 
            nnValid: false, isFormValid : false, ngValid: true
        } as AnmeldenState;
    }
    

    private recaptchaCallback(secret : string) {
        this.setState( {recaptchaSecret : secret} , this.validateForm);
    }

    private validateForm() {
        this.setState({
            emValid : isEmail(this.state.email),
            vnValid : this.state.vorname.length > 0
                && isAlpha(this.state.vorname),
            nnValid : this.state.nachname.length > 0
                && isAlpha(this.state.nachname),
            ngValid : ((numGuests : string) => {
                let i = parseInt(numGuests);
                if (i === NaN) {
                    return false; 
                } else {
                    return i >= 0 && i <= 10;
                }
            })(this.state.numGuests)
        }, function afterUpdate () {
            this.setState({ isFormValid: this.state.emValid 
            && this.state.vnValid
            && this.state.ngValid
            && (this.state.recaptchaSecret != null)
            && this.state.nnValid });
        });

    }

    private update(partialState: object) {
        this.setState(partialState, this.validateForm);
    }

    private onSubmitForm(click : any) {
        this.setState({ submitState : SubmitState.LOADING });
        fetch("/anmelden", {
            method : "POST",
            headers : new Headers({
                "Content-Type" : "application/json"
            }),
            body : JSON.stringify({
                numguests : parseInt(this.state.numGuests),
                name: this.state.nachname,
                vorname: this.state.vorname,
                email: this.state.email,
                "g-recaptcha-response" : this.state.recaptchaSecret
            })
        }).then((response) => {
            if (response.ok) {
                this.setState( { submitState : SubmitState.SUCCESS } );
                this.props.onEmitMessage({
                    title : "Okay!"
                  , msg : `Vielen Dank, Wir haben Ihre Anmeldung erfolgreich entgegengenommen.
                    Zudem haben wir Ihnen eine Bestätigungsmail geschickt. Dort
                    sind weitere Informationen zu finden. Bis dann!`
                } as MessageVO);
            } else if (response.status === 422) {
                this.setState( { submitState : SubmitState.ERROR } );
                this.props.onEmitMessage({
                    msg : `Diese Mailadresse wurde bereits 
                    angemeldet. Falls sich Änderungen an Ihrer Anmeldung ergeben
                    soll, antworten Sie bitte kurz auf die Bestätigungsmail. Falls
                    Sie keine Bestätigungsmail erhalten haben, überprüfen Sie bitte
                    auch Ihr Spamfach.`
                  , title : "Mail existiert."
                } as MessageVO);
            }
            else if (response.status === 400 || response.status === 500) {
                this.setState( { submitState : SubmitState.ERROR } );
                response.text().then((msg) => {
                    this.props.onEmitMessage({
                        title : "Ungültiger Request"
                      , msg : `Der Server hat dieses Formular nicht akzeptiert.
                        Bitte überprüfen Sie die Inhalte des Formulars. Das könnte
                        allerdings auch ein Fehler auf unserer Seite sein. Falls
                        Sie denken, dass das der Fall ist, schicken Sie bitte kurz
                        eine Mail mit dem Inhalt dieser Textbox an 
                        <a href="mailto:taktinale@chorknaben-biberach.de">
                        taktinale@chorknaben-biberach.de</a>.
                        <i>response status: ${response.status}</i>
                        <code>${msg}</code>`
                    } as MessageVO);
                });
            }
        });


        click.preventDefault();
        click.stopPropagation();
    }

    public render() : JSX.Element {
        return (
            <form target="#">
                <EmailInput isValid={this.state.emValid} name="email"
                    hint="E-Mail Adresse"
                    onChange={(newEmail : string) => this.update({email : newEmail})} />

                <GenericInput isValid={this.state.vnValid} name="vorname"
                    hint="Vorname"
                    onChange={(newText : string) => this.update({vorname : newText})} />

                <GenericInput isValid={this.state.nnValid} name="nachname"
                    hint="Nachname"
                    onChange={(newText : string) => this.update({nachname: newText})} />

                <div className="number">
                    <span>Ich komme mit</span>
                    <NumberInput isValid={this.state.ngValid} name="numguests"
                        hint=""
                        onChange={(newNumber : string) => this.update({numGuests: newNumber})} />
                    <span>Personen.</span>
                </div>

                <SubmitInput 
                    disabled={!this.state.isFormValid}
                    state={this.state.submitState}
                    onRecaptchaCallback={(sec:string) => this.recaptchaCallback(sec)}
                    onClick={(e:any) => this.onSubmitForm(e)} />
            </form>
       );
    }
}