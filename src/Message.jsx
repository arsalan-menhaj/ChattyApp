import React from "react";
import ReactDOM from "react-dom";

class Message extends React.Component {


  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.messageItem.username}</span>
        <span className={this.props.messageItem.type === "incomingNotification" ? "message system":"message-content"}>{this.props.messageItem.content}</span>
      </div>
    )
  }
}

export default Message;