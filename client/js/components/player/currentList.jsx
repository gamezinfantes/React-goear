import React from 'react'
import PlayerStore from '../../stores/playerStore'
import PlayerActions from '../../actions/playerActions'
import Scrollbar from '../reactScrollbar/scrollArea.jsx'

export default class ListCurrent extends React.Component {
	onClick(i, event){
		PlayerActions.playSong(i);
	}
	onClickRemove(i, event){
		event.stopPropagation();
		PlayerActions.removeSong(i);
	}
	render() {
		if(this.props.songs.length==0){
			return (
				<div className="current-list">
					<div className="current-list-empty"></div>
				</div>
			)
		} else {
			return(
				<Scrollbar horizontal={false} className="current-list">
					<ul>
						{this.props.songs.map((song, i) =>{
							let activeClass = i==this.props.order[this.props.currentSong] ? 'active' : '';
							return (
								<li onClick={this.onClick.bind(this, i)} className={activeClass} key={i}>
									<span className="track">{song.title}</span>
									<span>{song.artist}</span>
									<span className="remove" onClick={this.onClickRemove.bind(this, i)}>&#215;</span>
								</li>
							)
						})}
					</ul>

				</Scrollbar>
			)
		}
	}
}
