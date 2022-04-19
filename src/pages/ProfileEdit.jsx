import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isDisable: true,
      loading: false,
      wasInfosAtt: false,
    };
  }

  componentDidMount() {
    this.getUsersInfo();
  }

  getUsersInfo = async () => {
    this.setState({ loading: true }, async () => {
      const userInfo = await getUser();
      this.setState({ userInfo, loading: false }, () => { this.handleErros(); });
    });
  }

  handleChange = ({ target: { value, name } }) => {
    const { userInfo } = this.state;
    this.setState({
      userInfo: { ...userInfo, [name]: value },
    }, () => this.handleErros());
  }

  /* Regex foi retirado de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */

  validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  handleErros = () => {
    const { userInfo: { name, description, email } } = this.state;
    const errorCases = [
      !name.length,
      !description.length,
      !this.validateEmail(email),
    ];
    const haveError = errorCases.every((error) => error === false);
    this.setState({ isDisable: !haveError });
  }

  attUserInfos = () => {
    const { userInfo } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser(userInfo);
      this.setState({ loading: false, wasInfosAtt: true });
    });
  }

  render() {
    const { loading,
      userInfo: { name, description, image, email },
      isDisable, wasInfosAtt } = this.state;

    if (wasInfosAtt) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" className="page-container">
          {loading ? <Loading /> : (
            <>
              <form className="profile-edit-form">
                <div>
                  <label htmlFor="name-input" className="form-user-label">
                    Name:
                    <input
                      data-testid="edit-input-name"
                      className="form-user-input"
                      type="text"
                      value={ name }
                      name="name"
                      onChange={ this.handleChange }
                      id="name-input"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="email-input" className="form-user-label">
                    Email:
                    <input
                      data-testid="edit-input-email"
                      className="form-user-input"
                      type="email"
                      value={ email }
                      name="email"
                      onChange={ this.handleChange }
                      id="email-input"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="description-input" className="form-user-label">
                    Description:
                    <input
                      data-testid="edit-input-description"
                      className="form-user-input"
                      type="text"
                      value={ description }
                      name="description"
                      onChange={ this.handleChange }
                      id="description-input"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="image-input" className="form-user-label">
                    Image:
                    <input
                      className="form-user-input"
                      data-testid="edit-input-image"
                      type="text"
                      value={ image }
                      name="image"
                      onChange={ this.handleChange }
                      id="image-input"
                    />
                  </label>
                </div>
              </form>
              <button
                type="button"
                data-testid="edit-button-save"
                className="save-btn"
                disabled={ isDisable }
                onClick={ this.attUserInfos }
              >
                Salvar
              </button>
            </>
          )}

        </div>
      </>
    );
  }
}

export default ProfileEdit;
