import React from 'react'
import BottomPlayer from './bottomPlayer.jsx'
import PlayerStore from '../../stores/playerStore'


export default class BottomPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlayerStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PlayerStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PlayerStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  render(){
    let currentSong = {title:'', artist: '', file:'', cover: '/static/img/nocover.png', duration: 0};
    if (this.state.songs.length > 0) {
      currentSong = this.state.songs[this.state.order[this.state.currentSong]];
    }

    return (
      <BottomPlayer
        canControlled={this.state.canControlled}
        currentSong={this.state.currentSong}
        duration={this.state.duration}
        isBuffering={this.state.isBuffering}
        loop={this.state.loop}
        order={this.state.order}
        paused={this.state.paused}
        showPlaylist={this.state.showPlaylist}
        song={currentSong}
        shuffle={this.state.shuffle}
        time={this.state.time}
        volume={this.state.volume}
        />
    );
  }

}
