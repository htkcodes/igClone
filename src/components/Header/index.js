import React, { Component } from 'react'
import "./Header.css"

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
        <div className="nav-menus">
      <div className="nav-brand">
      <a href="/" className="nav-brand-logo">Instagram</a>
      </div>
        </div>
        </nav>
      </div>
    )
  }
}

export default Header;
