import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disabled: true,
      loading: false,
      result: null,
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

  requestAPI = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const data = await searchAlbumsAPIs(searchInput);
      this.setState({
        loading: false,
        result: data,
      });
    });
    const data = await searchAlbumsAPIs(searchInput);
    return data;
  }

  renderResultData = () => {

  }

  render() {
    const { disabled, loading, result, searchInput } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {loading ? <p>Carregando...</p> : (
            <>
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
                onClick={ this.requestAPI }
              >
                Pesquisar

              </button>
            </>
          )}
          {(!result) ? '' : (
            <>

              {!result.length ? <h1>Nenhum álbum foi encontrado</h1> : (
                <h1>{`Resultado de álbuns de: ${searchInput}`}</h1>
              )}

              {result.map((
                { artistName, artworkUrl100, collectionName, collectionId },
              ) => (

                <div key={ collectionName }>
                  <img src={ artworkUrl100 } alt={ `Album ${collectionName}` } />
                  <p>{collectionName}</p>
                  <h4>{artistName}</h4>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Detalhes
                  </Link>
                </div>

              ))}

            </>
          )}
        </div>
      </>
    );
  }
}

export default Search;
