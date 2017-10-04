import React from "react";
import ReactDOM from "react-dom";

class ChatBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userBox: '',
      msgBox: ''
    };

  }

  handleUserChange = (event) => {
    this.setState({
      userBox: event.target.value,
    });
  }

  handleMsgChange = (event) => {
    this.setState({
      msgBox: event.target.value
    });
  }

  handleUserKeyPress = (event) => {
    let props = this.props;
    if (event.key === 'Enter') {
      console.log('Change Username');
      props.userNameInput(this.state.userBox);
      this.setState({
        userBox: this.state.userBox,
      });
    }
  }

  handleMsgKeyPress = (event) => {
    let props = this.props;
    if (event.key === 'Enter') {
      console.log('Post Message and possibly change username');
      props.userInput(this.state);
      this.setState({
        userBox: this.state.userBox,
        msgBox: ''
      });
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.userBox}
        onChange={this.handleUserChange} onKeyPress={this.handleUserKeyPress} />
        <input className="chatbar-message" type="text" value={this.state.msgBox} onChange={this.handleMsgChange} onKeyPress={this.handleMsgKeyPress} />
      </footer>
    )
  }
}

export default ChatBar;