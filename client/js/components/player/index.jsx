import React from 'react'
import classNames from 'classnames'
import PlayerStore from '../../stores/playerStore'

import CurrentList from './currentList.jsx'
import MiniPlayer from './miniPlayer.jsx'
import Player from './player.jsx'

import './style.styl'

class PlayerContainer extends React.Component{
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

  render () {
    let classesContainer = classNames({
        buffering: this.state.isBuffering && !this.state.paused,
      });

    let currentSong = {title:'', artist: '', file:'', cover: '/static/img/nocover.png', duration: 0};
    if (this.state.songs.length > 0) {
      currentSong = this.state.songs[this.state.order[this.state.currentSong]];
    }
    return (
      <div id="player-container" className={classesContainer}>
        <Player
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
        <CurrentList songs={this.state.songs} currentSong={this.state.currentSong} order={this.state.order}/>
        { this.state.songs.length>0 && (
          <MiniPlayer song={currentSong} paused={this.state.paused} />
        )}
      </div>
    )
  }
}

export default PlayerContainer
