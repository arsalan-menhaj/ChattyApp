import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message.jsx";



class MessageList extends React.Component {

  checkStyle(item) {
    console.log('this is running');
    // Ensures notifications are properly styled by adding a class
    if (item.type === "incomingNotification") {
      return ".message.system"
    }
    return null;
  }

  render() {
    return (
      <main className="messages">
      { this.props.messages.map((messageItem) => (
        <Message messageItem={messageItem} key={messageItem.id} type={messageItem.type} userColor={messageItem.userColor} />
      )) }
      </main>
    )
  }
}

export default MessageList;