import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

// Random function generator gets called in random color generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// Helper function to generate a random color for this client
function getRandomColor () {
  let range = '0123456789abcdef'.split('');
  let code = '#';
  for (let i = 0; i < 6; i++) {
    code += range[getRandomInt(0, 15)];
  }
  return (code);
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001");

    this.state = {

      numberOfUsers: 1,

      userColor: getRandomColor(),

      currentUser: {name: ""},

      messages: []
    };

  }

  // Helper function that is passed to ChatBar as prop
  // Updates WS server with New Message data
  messageInput = (inputState) => {

      // The conditional below handles the case that the username
      // is changed before posting the message
      if ( this.state.currentUser.name !== inputState.userBox ) {
        this.userNameInput(inputState.userBox);
      }

      console.log('sending postMsg');

      let postMessage = {
        type: "postMessage",
        username: inputState.userBox,
        userColor: this.state.userColor,
        content: inputState.msgBox
      }
      this.socket.send(JSON.stringify(postMessage));
  }

  // Helper function that is passed to ChatBar as prop
  // Updates WS server with New Username
  userNameInput = (text) => {
    if ( this.state.currentUser.name !== text ) {
      console.log('sending postNot');
      let visibleName = this.state.currentUser.name ? this.state.currentUser.name:"Anonymous";
      let visibleNewName = text ? text:"Anonymous";
      let postNotification = {
        type: "postNotification",
        content: `${visibleName} changed their name to ${visibleNewName}`
      }

      this.setState({
        currentUser: {name: text}
      });

      this.socket.send(JSON.stringify(postNotification));
    }
  }

  // Adds new message/notification to client-side list
  updateList = (msg) => {
    this.setState({
      messages: [...this.state.messages, msg]
    })
  }

  // Checks whether data coming in from server is a message/notification
  // then calls the appropriate functions to update app accordingly
  handleReturningItems = (data) => {
    switch (data.type) {
    case "incomingNotification":
      let notification = {
        type: "incomingNotification",
        id: data.id,
        username: null,
        content: data.content
      }
      this.updateList(notification);
      break;
    case "incomingMessage":
      let message = {
        type: "incomingMessage",
        id: data.id,
        username: data.username,
        userColor: data.userColor,
        content: data.content
      }
      // If image url is included in message, include image url as prop
      if (data.imageURL) {
        message["imageURL"] = data.imageURL[0];
      }
      this.updateList(message);
      break;
    }
  }


  componentDidMount() {

    console.log("componentDidMount <App />");

    this.socket.onmessage = (event) => {

      let data = JSON.parse(event.data);

      // Checks nature of incoming data, and modifies app view accordingly
      if (data.type) {
        this.handleReturningItems(data);
      } else if (data.clientCounter) {
        this.state.numberOfUsers = data.clientCounter;
      }
    }
  }

  // Called any time the props or state changes. The jsx elements returned in this
  // method are rendered in the DOM.
  render() {
    return <div> <Navbar clientCounter={this.state.numberOfUsers} /> <ChatBar defaultValue={this.state.currentUser} messageInput={this.messageInput} userNameInput={this.userNameInput} /> <MessageList messages={this.state.messages} /> </div>;
  }
}

