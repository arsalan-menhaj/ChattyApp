import React from "react";
import ReactDOM from "react-dom";

class Message extends React.Component {

  render() {
    return (
      <div className="container">
       <div className="message">
         <span className="message-username" style={{color: this.props.messageItem.userColor}}>
         {this.props.messageItem.username}
         </span>
         <span className={this.props.messageItem.type === "incomingNotification" ? "message system":"message-content"}>
            {this.props.messageItem.content}
         </span>
         <div className="embedded-image-container"> <img className="embedded-image" src={this.props.messageItem.imageURL} />  </div>
       </div>
      </div>
    )
  }
}

export default Message;