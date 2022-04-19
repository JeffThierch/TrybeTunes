import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getUsersInfo();
  }

  getUsersInfo = async () => {
    const userInfo = await getUser();
    this.setState({ userInfo, loading: false });
  }

  render() {
    const { loading, userInfo: { description, email, image, name } } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-profile" className="page-container">
            <section className="profile-container">
              <img
                className="user-img"
                data-testid="profile-image"
                src={ image }
                alt="User Img"
              />
              <div>
                <label htmlFor="user-description">
                  Descricao:
                  <p id="user-description">{description}</p>
                </label>
                <label htmlFor="user-email">
                  Email:
                  <p id="user-email">{email}</p>
                </label>
                <label htmlFor="user-name">
                  Nome:
                  <p id="user-name">{name}</p>
                </label>
              </div>
            </section>
            <Link className="edit-link" to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
