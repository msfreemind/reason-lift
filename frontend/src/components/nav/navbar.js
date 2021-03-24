import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={'/'}>Essays</Link>
          <Link to={'/essays/new'}>New Essay</Link>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Think Land!</h1>
        { this.getLinks() }
      </div>
    );
  }
}

export default NavBar;