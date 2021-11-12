import React, { Component } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
    }, () => (this.verifyInput()));
  }

  verifyInput = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= 2) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
          />
          <button
            data-testid="search-artist-button"
            disabled={ disabled }
            type="button"
          >
            Pesquisar

          </button>
        </div>
      </>
    );
  }
}

export default Search;
