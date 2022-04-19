import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import '../styles/Search.css';

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
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  turnEachWordCapitalize = (string) => {
    if (string.length > 0 && string !== undefined) {
      const words = string.trim().split(' ');
      return words.map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
    }
    return '';
  }

  render() {
    const { disabled, loading, result, searchInput } = this.state;
    return (
      <>
        <Header />

        <div data-testid="page-search">
          {loading ? <Loading /> : (
            <div className="search-input-container">
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

            </div>
          )}
          {(!result) ? '' : (
            <>

              {!result.length ? (
                <h1 className="search-result">Nenhum álbum foi encontrado</h1>
              ) : (
                <h1 className="search-result">
                  {`Resultado de álbuns de: ${
                    this.turnEachWordCapitalize(searchInput)
                  }`}
                </h1>
              )}
              <section className="albuns-container">
                {result.map((
                  { artistName, artworkUrl100, collectionName, collectionId },
                ) => (
                  <Link
                    key={ collectionName }
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <section className="album">
                      <h4>{artistName}</h4>
                      <img src={ artworkUrl100 } alt={ `Album ${collectionName}` } />
                      <p>{collectionName}</p>
                    </section>
                  </Link>

                ))}
              </section>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Search;
