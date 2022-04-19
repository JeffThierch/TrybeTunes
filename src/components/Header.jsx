import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.returnUserName();
  }

  returnUserName = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        loading: false,
        userName: user.name,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component" className="header-container">
        <section className="title-container">
          <h1 className="header-title">TrybeTunes</h1>
          <div className="user-name-container">
            <h1
              data-testid="header-user-name"
              className="header-user-name"
            >
              {userName}
            </h1>
          </div>
        </section>
        <nav className="nav-container">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
