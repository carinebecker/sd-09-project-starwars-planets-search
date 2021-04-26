import React, { Component } from 'react';
import swImg from './img/sw-logo.png';
import './CSS/index';

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img alt="Logo do filme Star Wars" src={ swImg } className="logo-img" />
        <h2>Planets Search</h2>
      </div>
    );
  }
}

export default Header;
