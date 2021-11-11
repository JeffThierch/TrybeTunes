import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      submitButtonDisable: true,
      username: '',
      loading: false,
      userWasCreated: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    const minNameLength = 3;
    if (value.length >= minNameLength) {
      this.setState({
        submitButtonDisable: false,
        username: value,
      });
    } else {
      this.setState({
        submitButtonDisable: true,
        username: value,
      });
    }
  }

  handleBtnClick = async () => {
    const { username } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: username });
      this.setState({
        loading: false,
        userWasCreated: true,
        submitButtonDisable: true,
      });
    });
  }

  render() {
    const { submitButtonDisable, loading, userWasCreated } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    if (userWasCreated) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <label htmlFor="login-name-input">
          Nome
          <input
            name="login-name-input"
            id="login-name-input"
            type="text"
            data-testid="login-name-input"
            placeholder="Insira seu nome"
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ submitButtonDisable }
            onClick={ this.handleBtnClick }
          >
            Entrar

          </button>
        </label>
      </div>
    );
  }
}

export default Login;
