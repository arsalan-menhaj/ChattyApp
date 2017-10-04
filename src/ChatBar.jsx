import React from "react";
import ReactDOM from "react-dom";

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleKeyPress = (event) => {
    let text = this.state.value;
    let props = this.props;
    if (event.key === 'Enter') {
      console.log('do validate');
      props.userInput(text);
      this.setState({ value: '' });
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
      </footer>
    )
  }
}

export default ChatBar;