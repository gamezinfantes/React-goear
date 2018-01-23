import React from 'react'
import { ProgressBar, Controls } from './player.jsx'


export default class BottomPlayer extends React.Component {
  render(){
    return (
      <div className="bottom-player">
        <Controls
  			  paused={this.props.paused} canControlled={this.props.canControlled}
  			  loop={this.props.loop} shuffle={this.props.shuffle} />
        <ProgressBar onTimeUpdate={ ()=>{} } time={this.props.time} duration={this.props.song.duration} />
      </div>
    )
  }

}
