import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artistInfo: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const { match: { params: { id } } } = this.props;
      const data = await getMusics(id);
      this.setState({
        loading: false,
        artistInfo: data[0],
        musicList: data,

      });
    });
  }

  render() {
    const { musicList, loading,
      artistInfo: { artworkUrl100, collectionName, artistName } } = this.state;

    if (loading) {
      return <p>Carregando...</p>;
    }
    return (
      <div data-testid="page-album">
        <Header />

        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">{collectionName}</h2>
          <p data-testid="artist-name">{artistName}</p>
        </section>

        {
          musicList.filter(({ kind }) => kind === 'song')
            .map((music) => <MusicCard key={ music.trackId } musicList={ music } />)
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
