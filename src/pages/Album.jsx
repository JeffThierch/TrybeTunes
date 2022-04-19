import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../styles/Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musicList: [],
      artistInfo: {},
      favMusics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMusic();
    this.renderFavoritesSongs();
  }

   handleChange = async (music) => {
     console.log(music);
     const { favMusics } = this.state;
     let favArray = [...favMusics];
     const haveId = favArray.some(({ trackId }) => trackId === music.trackId);
     this.setState({ loading: true });

     if (haveId) {
       await removeSong(music);
       favArray = favArray.filter(({ trackId }) => trackId !== music.trackId);
     } else {
       await addSong(music);
       favArray = [...favMusics, music];
     }
     this.setState({ loading: false, favMusics: favArray });
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

  renderFavoritesSongs = () => {
    this.setState({
      loading: true }, async () => {
      const fav = await getFavoriteSongs();
      this.setState({ favMusics: fav, loading: false });
    });
  }

  render() {
    const { musicList,
      loading,
      artistInfo: { artworkUrl100, collectionName, artistName },
      favMusics } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          {loading ? <Loading /> : (
            <>
              <section className="artist-info-container">
                <img className="album-img" src={ artworkUrl100 } alt={ collectionName } />
                <h2 className="album-name" data-testid="album-name">{collectionName}</h2>
                <p data-testid="artist-name" className="artist-name">{artistName}</p>
              </section>

              <section className="musics-container">
                {
                  musicList.filter(({ kind }) => kind === 'song')
                    .map((music) => (<MusicCard
                      key={ music.trackId }
                      musicList={ music }
                      isChecked={ favMusics.some(
                        ({ trackId }) => trackId === music.trackId,
                      ) }
                      handleChange={ this.handleChange }
                    />))

                }
              </section>
            </>
          )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
