import React from 'react'
import TracklistContextMenu from './tracklistContextMenu.jsx'
import PlayerActions from '../../actions/playerActions'
import PlContextMenuActions from '../../actions/plContextMenuActions'

import './tracklist.styl'

export class RowTrack extends React.Component {
	doubleClick(){
		PlayerActions.addSong(this.props.song);
	}
	onContextMenu(event){
		event.preventDefault();
		PlContextMenuActions.open({
			posX: event.clientX,
			posY: event.clientY,
			song: this.props.song
		});
	}
	secondsToMinutes(seconds){
		seconds = Math.floor(seconds);
		let min = Math.floor(seconds/60),
			sec = Math.floor(seconds%60);
		// format whith leading 0
		let fsec = (sec < 10) ? ("0" + sec) : sec;
		return `${min}:${fsec}`
	}
	render() {
		return (
			<tr onDoubleClick={this.doubleClick.bind(this)} onContextMenu={this.onContextMenu.bind(this)} key={this.props.key}>
				<td className="title">{this.props.song.title}</td>
				<td className="artist">{this.props.song.artist}</td>
				<td className="duration">{this.secondsToMinutes(this.props.song.duration)}</td>
				<td className="bitrate">192kbps</td>
				<td>
					<span className="piker icon-more" onClick={this.onContextMenu.bind(this)}></span>
				</td>
			</tr>
		)
	}
}

export default class Tracklist extends React.Component {
	render(){
		return (
		<div>
			<table className="track-list">
				<thead>
					<tr>
						<th>TITULO</th>
						<th>ARTISTA</th>
						<th>DURACION</th>
						<th>CALIDAD</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{this.props.songs.map((song, i) => {
					return(
						<RowTrack song={song} key={i} />
					)
				})}
				</tbody>
			</table>
			<TracklistContextMenu />
		</div>
		)
	}
}
