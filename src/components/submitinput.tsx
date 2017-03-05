import * as React from "react"

import { GenericInput } from "./genericinput";

interface ISubmitProps {
    onClick (event: any): any;
    onRecaptchaCallback (secret : string) : void;
    disabled : boolean;
    state : SubmitState;
}

interface ISubmitState {

}

export enum SubmitState {
    DEFAULT = 1,
    LOADING = 2,
    SUCCESS = 3,
    ERROR = 4
}

export class SubmitInput extends React.Component<ISubmitProps, ISubmitState> {
    constructor() {
        super();
        let _window : any = window;
        _window.gRecaptchaCallback = this.gRecaptchaCallback;
    }

    gRecaptchaCallback = (secret : string) => {
        this.props.onRecaptchaCallback(secret);
    }

    public render(): JSX.Element {
        let submitClass = "Submit-Parent";
        switch (this.props.state) {
            case SubmitState.LOADING:
                submitClass += " Submit-Loading"; break;
            case SubmitState.SUCCESS:
                submitClass += " Submit-Ok"; break;
            case SubmitState.ERROR:
                submitClass += " Submit-Error"; break;
            case SubmitState.DEFAULT:
            default:
                break;

        }
        return <span className={submitClass}>
            <div 
                className="g-recaptcha" 
                data-callback="gRecaptchaCallback"
                data-theme="dark"
                data-sitekey="6LcRkhcUAAAAAPIfzADQSHJD3Uw3cr6nbhmjlnAh"></div>
            <input type="submit" name="submit" 
            value="anmelden"
            onClick={this.props.onClick}
            disabled={this.props.disabled}
            />
        </span>
    }
}