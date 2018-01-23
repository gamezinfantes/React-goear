import React from 'react'
import classNames from 'classnames'
import PlayerActions from '../../actions/playerActions'

export default class MiniPlayer extends React.Component {
	handleClick(event){
		PlayerActions.tooglePlayerVisibility();
	}
	render() {
		let playPause = classNames({
			'play-pause': true,
			'icon-play': !this.props.paused,
			'icon-pause': this.props.paused
		});
    let cover = this.props.song.cover || 'img/nocover.png',
        title = this.props.song.title || '',
        artist = this.props.song.artist || '';
		return (
			<div className="mini-player show" onClick={this.handleClick}>
				<div className="mini-cover" style={{backgroundImage: "url('"+cover+"')"}}></div>
				<div className="info">
					<span className="title">{title}</span>
					<span className="artist">{artist}</span>
				</div>
				<i className={playPause}></i>
			</div>
		)
	}
}
