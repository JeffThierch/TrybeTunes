import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/MusicCard.css';

export default class MusicCard extends Component {
  render() {
    const { musicList, handleChange, isChecked } = this.props;
    const { trackName, previewUrl, trackId } = musicList;
    return (
      <section className="music-container">
        <h3 className="audio-title">{trackName}</h3>
        <div className="audio-container">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
            className="audio-player"
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            <input
              type="checkbox"
              className="fav-checkbox-input"
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              value={ musicList }
              onChange={ () => handleChange(musicList) }
              checked={ isChecked }
            />
            {isChecked ? (<FaHeart className="fav-checked" />) : (
              <FaRegHeart className="fav-not-checked" />)}
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
