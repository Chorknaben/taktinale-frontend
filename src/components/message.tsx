import * as React from "react";

interface IMessageProps {
    message : MessageVO;
};

interface IMessageState {};

export interface MessageVO {
    msg : string;
    title : string;
    className : [string];
}

export class Message 
  extends React.Component<IMessageProps, IMessageState> {
    public static CSSRootClass : string = "Message-Root";

    public render(): JSX.Element {
        let msg = this.props.message;

        if (msg === null) {
            return null;
        }
        return (<div className={
            msg.msg?
               [Message.CSSRootClass].concat(msg.msg).join(" ")
              : Message.CSSRootClass }>
        
          <div className="Message-Title">{msg.title}</div>
          <div className="Message-Body">{msg.msg}</div>
        </div>);
    }
}
