import * as React from "react";
import * as ReactDOM from "react-dom";

import { Anmelden } from "./components/anmelden";

import { MessageVO, Message } from "./components/message";

declare function require(path : string) : any;

require("./sass/form.scss");

interface IAppProps {}
interface IAppState {
    message: MessageVO;
}

class Application extends React.Component<IAppProps, IAppState> {
    constructor() {
        super();
        this.state = { message : null };
    }

    render() : JSX.Element {
        return (<div>
            <Anmelden onEmitMessage={(m : MessageVO) => 
                this.setState({message : m})} />
            <Message 
                message={this.state.message} />
        </div>);
    }
}

ReactDOM.render(
   <Application />
   , document.getElementById("rootview")
);