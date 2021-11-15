import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musicList } = this.props;
    const { trackName, previewUrl } = musicList;
    return (
      <section>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.objectOf(PropTypes.any).isRequired,
};
