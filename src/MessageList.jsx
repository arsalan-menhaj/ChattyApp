import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message.jsx";



class MessageList extends React.Component {
  render() {
    return (
      <main className="messages">
      { this.props.messages.map((messageItem) => (<Message messageItem={messageItem} key={messageItem.id} />)) }
      </main>
    )
  }
}

export default MessageList;