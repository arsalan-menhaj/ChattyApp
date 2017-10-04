import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  // set the initial state to indicate that that the timer is not loading
  // React will call the functions in the following order when it mounts the component:
  //   constructor
  //   componentWillMount (not used in this component)
  //   render
  //   componentDidMount

  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws://localhost:3001");

    this.state = {

      // Need to transfer this to server
      messageId: 300,

      currentUser: {name: "Bob"},
       // optional. if currentUser is not defined, it means the user is Anonymous

      messages: [
        {
          type: "incomingMessage",
          id: 123,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          type: "incomingMessage",
          id: 456,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
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
        let postNotification = {
          type: "postNotification",
          content: `${this.state.currentUser.name} changed their name to ${inputState.userBox}`
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
        content: inputState.msgBox
      }
      console.log(JSON.stringify(postMessage));
      this.socket.send(JSON.stringify(postMessage));
  }

  userNameInput = (text) => {
    if ( this.state.currentUser.name !== text ) {
      console.log('sending postNot');
      let postNotification = {
        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${text}`
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
      let parsed = JSON.parse(event.data);
      switch (parsed.type) {
        case "incomingNotification":
          let notification = {
            type: "incomingNotification",
            id: this.state.messageId,
            username: null,
            content: parsed.content
          }
          console.log('notification', notification);
          this.updateList(notification);
          break;
        case "incomingMessage":
          console.log('message', parsed);
          this.updateList(parsed);
          break;
      }


    }

  }

  // Called any time the props or state changes. The jsx elements returned in this
  // method are rendered in the DOM.
  render() {
    return <div> <ChatBar defaultValue={this.state.currentUser} userInput={this.userInput} userNameInput={this.userNameInput} /> <MessageList messages={this.state.messages} /> </div>;
  }


}

