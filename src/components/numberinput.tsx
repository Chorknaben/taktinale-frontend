import * as React from "react"

import { GenericInput } from "./genericinput";

export class NumberInput extends GenericInput {
    constructor() {
        super();
        this.state = {
            value : "0"
        }
    }

    public renderInput(): JSX.Element {
        return <input onChange={this.updateState}
           type="number" name="numguests" min="0" max="5" value={this.state.value} />;
    }
}