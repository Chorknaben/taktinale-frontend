import * as React from "react"

interface IGenericInputProps {
    isValid : boolean,
    name : string,
    hint : string,
    onChange : (email: string) => void
};

interface IGenericInputState {
    value : string
};

export class GenericInput extends React.Component<IGenericInputProps, IGenericInputState> {
    constructor() {
        super();
        this.state = {
            value : ""
        }
    }

    protected updateState = (event : any) : void => {
        this.setState({value : event.target.value});
        this.props.onChange(event.target.value);
    }

    public renderInput(): JSX.Element {
        return this.renderInputFactory("text", this.props.name, this.props.hint);
    }

    protected renderInputFactory(
      name: string, type: string, placeholder : string): JSX.Element {

        return <input onChange={this.updateState} 
          name={name} type={type} placeholder={placeholder} />;
    }

    public render(): JSX.Element {
        return (
            <span>
                <span className={this.props.isValid? "Input-Valid": "Input-Invalid"}></span>
                {this.renderInput()}
            </span>
        );
    }
}