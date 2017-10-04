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

    this.state = {

      messageId: 0,

      currentUser: {name: "Bob"},
       // optional. if currentUser is not defined, it means the user is Anonymous

      messages: [
        {
          id: 123,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 456,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

  }

  userInput = (text) => {
      let newMessageItem = {
        id: this.state.messageId + 1,
        username: this.state.currentUser.name,
        content: text
      }

      this.setState({
        messageId: this.state.messageId + 1,
        messages: [...this.state.messages, newMessageItem]
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

  }

  // Called any time the props or state changes. The jsx elements returned in this
  // method are rendered in the DOM.
  render() {
    return <div> <ChatBar currentUser={this.state.currentUser} userInput={this.userInput} /> <MessageList messages={this.state.messages} /> </div>;
  }


}

