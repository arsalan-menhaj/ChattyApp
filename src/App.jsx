import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001");

    this.state = {

      // Need to transfer this to server
      messageId: 300,

      numberOfUsers: 0,

      userColor: getRandomColor(),

      currentUser: {name: ""},
       // optional. if currentUser is not defined, it means the user is Anonymous

      messages: [
      ]
    };

  }

  // Helper function that is passed to ChatBar as prop
  // Updates WS server with New Message data
  userInput = (inputState) => {

      // This includes the case that the username changes
      // as well
      if ( this.state.currentUser.name !== inputState.userBox ) {
        console.log('sending postNot');
        let visibleName = this.state.currentUser.name ? this.state.currentUser.name:"Anonymous";
        let visibleNewName = inputState.userBox ? inputState.userBox:"Anonymous";
        let postNotification = {
          type: "postNotification",
          content: `${visibleName} changed their name to ${visibleNewName}`
        }

        this.setState({
          currentUser: {name: inputState.userBox}
        });

        this.socket.send(JSON.stringify(postNotification));
        console.log(JSON.stringify(postNotification));
      }

      console.log('sending postMsg');

      let postMessage = {
        type: "postMessage",
        id: this.state.messageId + 1,
        username: inputState.userBox,
        userColor: this.state.userColor,
        content: inputState.msgBox
      }
      console.log(JSON.stringify(postMessage));
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
      console.log(JSON.stringify(postNotification));
    }
  }

  // Adds new message/notification to client-side list
  updateList = (msg) => {
    this.setState({
      messageId: this.state.messageId + 1,
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
        id: this.state.messageId,
        username: null,
        content: data.content
      }
      console.log('notification', notification);
      this.updateList(notification);
      break;
    case "incomingMessage":
      console.log('message', data);
      // this.updateList(data);
      let message = {
        type: "incomingMessage",
        id: data.messageId,
        username: data.username,
        userColor: data.userColor,
        content: data.content
      }
      // If image url is included in message, include image url as property
      if (data.imageURL) {
        message["imageURL"] = data.imageURL[0];
      }
      this.updateList(message);
      break;
    }
  }


  componentDidMount() {

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    this.socket.onmessage = (event) => {
      //console.log(JSON.parse(event.data));

      let data = JSON.parse(event.data);
      console.log(data);

      // Checks nature of incoming data, and modifies app view accordingly
      if (data.type) {
        this.handleReturningItems(data);
      } else if (data.clientCounter) {
        console.log(data.ClientCounter);
        this.state.numberOfUsers = data.clientCounter;
      }

    }

  }

  // Called any time the props or state changes. The jsx elements returned in this
  // method are rendered in the DOM.
  render() {
    return <div> <Navbar clientCounter={this.state.numberOfUsers} /> <ChatBar defaultValue={this.state.currentUser} userInput={this.userInput} userNameInput={this.userNameInput} /> <MessageList messages={this.state.messages} /> </div>;
  }
}

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor () {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let range = '0123456789abcdef'.split('');
  let code = '#';
  for (let i = 0; i < 6; i++) {
    code += range[getRandomInt(0, 15)];
  }
  return (code);
}

