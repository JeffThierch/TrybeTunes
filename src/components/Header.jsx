import React, { Component } from 'react';
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
        <p data-testid="header-user-name">{userName}</p>
      </header>
    );
  }
}
