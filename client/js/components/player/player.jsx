import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import PlayerStore from '../../stores/playerStore'
import AudioActions from '../../actions/audioActions'
import PlayerActions from '../../actions/playerActions'
import SongUtils from '../../utils/songUtils'

import AudioHtml from './audioHtml.jsx'


export class InfoPlayer extends React.Component {
	render(){
		var coverStyle = {
			backgroundImage: `url(${this.props.cover})`
		}
		return (
			<div>
				<div className="cover" style={coverStyle}>
				</div>
				<div className="info">
					<span className="title">{this.props.title}</span>
					<span className="artist">{this.props.artist}</span>
				</div>
			</div>
		)
	}
}


export class ProgressBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isMoving: false,
			time: 0
		}
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.mouseOutWindow = this.mouseOutWindow.bind(this);
		this.releaseElement = this.releaseElement.bind(this);
	}

	onMouseDown(event){
		// FUTURE: Block selection text when moving
		this.setState({ isMoving: true });
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('touchmove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
		document.addEventListener('touchend', this.onMouseUp);
        document.addEventListener('mouseout', this.mouseOutWindow);

        this.Time(event);
	}
	onMouseMove(event){
        this.Time(event);
	}
	onMouseUp(event){
		PlayerActions.setAudioTime(this.state.time);
        this.releaseElement();
	}
	mouseOutWindow(event){
		event = event ? event : window.event;
        var from = event.relatedTarget || event.toElement;
		if (!from || from.nodeName == 'HTML') {
			this.releaseElement();
		}
	}
	releaseElement(){
		this.setState({ isMoving: false });
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('touchmove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
		document.removeEventListener('touchend', this.onMouseUp);
        document.removeEventListener('mouseout', this.mouseOutWindow);
	}
	Time(event){
		let progressBar = ReactDOM.findDOMNode(this.refs.progressBar);
		let clientX = event.clientX || event.touches[0].clientX;
		// posicion del click respeccto a la barra de progreso
		let pos = clientX - progressBar.getBoundingClientRect().left;
		// time calculation over pogress bar size
		let time = pos / progressBar.offsetWidth * this.props.duration;
		if(time >= 0 && time <= this.props.duration ){
			this.setState({time: time});
		}
	}

	getTime(){
		return this.state.isMoving ?  this.state.time : this.props.time;
	}
	render(){
		let timePercetage = SongUtils.toPercentage(this.getTime(), this.props.duration);

		return(
			<div>
				<div className="progress-bar" ref="progressBar"
				  onMouseDown = {this.onMouseDown.bind(this)}
				  onTouchStart = {this.onMouseDown.bind(this)}>
					<div className="progress" style={{ width: timePercetage+'%' }}></div>
					<span className="position" style={{ left: timePercetage+'%' }}></span>
				</div>
				<div className="time-marker">
					<span className="current">{SongUtils.secondsToMinutes(this.getTime())}</span>
					<span className="duration">{SongUtils.secondsToMinutes(this.props.duration)}</span>
				</div>
			</div>
		)
	}
}
ProgressBar.defaultProps = { duration: 0, time: 0 }

export class Controls extends React.Component {
	onChickHandler(cb){
		if (this.props.canControlled) {
			cb();
		}
	}
	onClickPlayPause(event){
		AudioActions.tooglePause();
	}
	onClickNext(event){
		PlayerActions.next();
	}
	onClickPrevious(){
		PlayerActions.previous();
	}
	onClickLoop(event){
		PlayerActions.toogleLoop();
	}
	onClickShuffle(event){
    PlayerActions.toogleShuffle();
	}
	render(){
		let loopClasses = classNames({
    		'icon-loop': true,
    		'active': this.props.loop
    	});
    let shuffleClasses = classNames({
    		'icon-shuffle': true,
    		'active': this.props.shuffle
    	});
		let classIconPlayPause = this.props.paused ? "icon-play" : "icon-pause";
		return(
	<div className="controls">
		<i className={shuffleClasses} onClick={this.onChickHandler.bind(this, this.onClickShuffle)}></i>
		<span className="playback">
			<i className="icon-previous" onClick={this.onChickHandler.bind(this, this.onClickPrevious)}></i>
			<i className={classIconPlayPause} onClick={this.onChickHandler.bind(this, this.onClickPlayPause)}>
				<div className="play-loading"></div>
			</i>
			<i className="icon-next" onClick={this.onChickHandler.bind(this, this.onClickNext)}></i>
		</span>
		<i className={loopClasses} onClick={this.onChickHandler.bind(this, this.onClickLoop)}></i>
	</div>

		)
	}
}



export default class Player extends React.Component {
	constructor(props) {
    super(props);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onSongEnd = this.onSongEnd.bind(this);
  }

	componentDidMount() {
		document.body.addEventListener('keyup', this.keyControls)
	}

	componentWillUnmount() {
		document.body.removeEventListener('keyup', this.keyControls)
	}

	keyControls(event){
		let key = event.keyCode;
		let SPACE = 32;
		if (!(event.target.nodeName == 'INPUT' || event.target.nodeName == 'TEXTAREA')) {
			switch(key){
				case SPACE:
					AudioActions.tooglePause();
				break;
			}
		}

	}

	onTimeUpdate(time){
		let audioTag = ReactDom.findDOMNode(this.refs.audioTag);
		audioTag.currentTime = time;
	}

	onSongEnd(){
		PlayerActions.next();
	}
	onClickHidePlayer(){
		PlayerActions.tooglePlayerVisibility();
	}

	onClickToogleList(){
		document.querySelector('#current-list').classList.toggle('show');
	}

    render (){
			let song = this.props.song;

    	return (
	   <section className="player noselect">
	   		<div className="player-header">
	   			<i className="down" onClick={this.onClickHidePlayer}></i>
	   			<i className="icon-list2 list" onClick={this.onClickToogleList}></i>
	   		</div>
	   		<div className="player-content">
				<InfoPlayer title={song.title} artist={song.artist} cover={song.cover} />
				<ProgressBar onTimeUpdate={this.onTimeUpdate} time={this.props.time} duration={song.duration} />
				<Controls
				  paused={this.props.paused} canControlled={this.props.canControlled}
				  loop={this.props.loop} shuffle={this.props.shuffle} />
				<AudioHtml
				  ref="audioTag"
				  file={song.file}
				  onSongEnd={this.onSongEnd}/>
	   		</div>
		</section>
    )
    }
}
