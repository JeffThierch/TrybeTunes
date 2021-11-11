import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
      return <p>Carregando...</p>;
    }
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        <p data-testid="header-user-name">{userName}</p>
      </header>
    );
  }
}
