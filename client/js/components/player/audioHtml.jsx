import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import PlayerStore from '../../stores/playerStore'
import AudioActions from '../../actions/audioActions'
import PlayerActions from '../../actions/playerActions'
import SongUtils from '../../utils/songUtils'



export default class AudioHtml extends React.Component {
	componentDidMount () {
    this.audioTag = ReactDOM.findDOMNode(this);
    this.audioTag.preload = 'none';

		this.audioTag.addEventListener('timeupdate', this.onCurrentTimeUpdate.bind(this));
		this.audioTag.addEventListener('durationchange', this.onDurationChange.bind(this));
		this.audioTag.addEventListener('ended', this.onSongEnd.bind(this));
		// native events
		this.audioTag.addEventListener('pause', this.onPause.bind(this));
		this.audioTag.addEventListener('play', this.onPlay.bind(this));
		// this.audioTag.addEventListener('volumechange', this..bind(this));

		document.addEventListener('audio-pause', this.onSinteticPause.bind(this));
		document.addEventListener('audio-play', this.onSinteticPlay.bind(this));
		document.addEventListener('audio-tooglepause', this.onSintetictooglePause.bind(this));
		// document.addEventListener('volumechange', this..bind(this));


		this.audioTag.addEventListener('waiting', this.onWaiting.bind(this));
		this.audioTag.addEventListener('loadstart', this.onLoadStart.bind(this));
		this.audioTag.addEventListener('loadeddata', this.onLoadedData.bind(this));
		this.audioTag.addEventListener('canplay', this.onCanPlay.bind(this));
		document.addEventListener('setAudioTime', this.onChangeTime.bind(this));
	}


	componentWillUnmount () {
		this.audioTag.removeEventListener('timeupdate', this.onCurrentTimeUpdate.bind(this));
		this.audioTag.removeEventListener('durationchange', this.onDurationChange.bind(this));
		this.audioTag.removeEventListener('ended', this.onSongEnd.bind(this));


		this.audioTag.removeEventListener('waiting', this.onWaiting.bind(this));
		this.audioTag.removeEventListener('loadstart', this.onLoadStart.bind(this));
		this.audioTag.removeEventListener('loadeddata', this.onLoadedData.bind(this));
		this.audioTag.removeEventListener('canplay', this.onCanPlay.bind(this));
		document.removeEventListener('setAudioTime', this.onChangeTime.bind(this));
	}
	onSongEnd(event){
		this.props.onSongEnd(event);
	}
	onSintetictooglePause(event){
		if(this.audioTag.paused){
			this.audioTag.play();
		} else {
			this.audioTag.pause();
		}
	}
	onSinteticPause(event){
		this.audioTag.pause();
	}
	onSinteticPlay(event){
		this.audioTag.play();
	}
	onPause(event){
		PlayerActions.pause();
	}
	onPlay(event){
		PlayerActions.play();
	}

	onChangeTime(event){
		this.audioTag.currentTime = event.detail.time;
	}
	onCurrentTimeUpdate(){
		PlayerActions.changeTime(this.audioTag.currentTime);
	}
	onDurationChange(){
		PlayerActions.changeDuration(this.audioTag.duration);
	}
	onWaiting(){
		PlayerActions.startBuffering();
	}
	onLoadStart(){
		PlayerActions.startBuffering();
	}
	onLoadedData(){
		PlayerActions.stopBuffering();
	}
	onCanPlay(){
		PlayerActions.stopBuffering();
	}

	render(){
		return(
			<audio src={this.props.file} preload="none"></audio>
		)
	}
}
