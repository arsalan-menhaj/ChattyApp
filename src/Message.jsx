import React from "react";
import ReactDOM from "react-dom";

class Message extends React.Component {

  render() {
    return (
       <div className="message">
         <span className="message-username" style={{color: this.props.messageItem.userColor}}>
         {this.props.messageItem.username}
         </span>
         <span className={this.props.messageItem.type === "incomingNotification" ? "message system":"message-content"}>
            {this.props.messageItem.content}
            <img src={this.props.messageItem.imageURL} />
         </span>
         <div className="message-content">  </div>
      </div>
    )
  }
}

export default Message;