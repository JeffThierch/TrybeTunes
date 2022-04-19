import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.recoverMusicsFromLocalStorage();
  }

  recoverMusicsFromLocalStorage = () => {
    this.setState({ loading: true }, async () => {
      const favMusics = await getFavoriteSongs();
      this.setState({
        musics: favMusics,
        loading: false,
      });
    });
  }

   handleChange = async (music) => {
     const { musics } = this.state;
     let favArray = [...musics];
     const haveId = favArray.some(({ trackId }) => trackId === music.trackId);
     this.setState({ loading: true });

     if (haveId) {
       await removeSong(music);
       favArray = favArray.filter(({ trackId }) => trackId !== music.trackId);
     }
     this.setState({ loading: false, musics: favArray });
   }

   render() {
     const { musics, loading } = this.state;
     return (
       <>
         <Header />
         {loading ? <Loading /> : (
           <div data-testid="page-favorites">
             {musics.map((music) => (
               <MusicCard
                 key={ music.trackId }
                 musicList={ music }
                 isChecked={ musics.some(
                   ({ trackId }) => trackId === music.trackId,
                 ) }
                 handleChange={ () => this.handleChange(music) }
               />
             ))}
           </div>
         )}
       </>
     );
   }
}

export default Favorites;
