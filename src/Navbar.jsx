import React from "react";
import ReactDOM from "react-dom";

class Navbar extends React.Component {

  render() {
    return (
    <div className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <span className="navbar-counter">{this.props.clientCounter} User{this.props.clientCounter !== 1 ? "s":""} online</span>
    </div>
    )
  }
}

export default Navbar;