import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      submitButtonDisable: true,
      username: '',
      email: '',
      loading: false,
      userWasCreated: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    const minNameLength = 3;
    if (value.length >= minNameLength) {
      this.setState({
        submitButtonDisable: false,
        [name]: value,
      });
    } else {
      this.setState({
        submitButtonDisable: true,
        username: value,
      });
    }
  }

  handleBtnClick = async () => {
    const { username, email } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: username, email });
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
      return <Loading />;
    }
    if (userWasCreated) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login" className="login-page">
        <div className="login-container">
          <div className="user-info-container">
            <Input
              id="login-name-input"
              name="username"
              handleChange={ this.handleInputChange }
              type="text"
              placeholder="Nome"
              label=""
              className="login-input"
            />
            <Input
              id="login-email-input"
              name="email"
              handleChange={ this.handleInputChange }
              type="text"
              placeholder="Email"
              label=""
              className="login-input email-input"
            />

          </div>
          <button
            type="button"
            className="login-btn"
            data-testid="login-submit-button"
            disabled={ submitButtonDisable }
            onClick={ this.handleBtnClick }
          >
            Entrar

          </button>

        </div>
      </div>
    );
  }
}

export default Login;
