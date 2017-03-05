import * as React from "react";

import { GenericInput } from "./genericinput";

export class EmailInput extends GenericInput {
    constructor() {
        super();
        this.state = {
            value : ""
        }
    }

    public renderInput(): JSX.Element {
        return this.renderInputFactory("email", this.props.name, this.props.hint);
    }
}