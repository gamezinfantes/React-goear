import alt from '../alt'

class PlayerActions {
	addSong(song) { this.dispatch(song); }
	addSongAt(data){ this.dispatch(data); }
	addSongNext(song) { this.dispatch(song); }
	changeDuration(duration) { this.dispatch(duration); }
	changeOrder(order) { this.dispatch(order); }
	changeTime(time) { this.dispatch(time); }
	next() { this.dispatch(); }
	/* Tooble plause */
	playPause() { this.dispatch(); }
	/* Pause current track */
	pause() { this.dispatch(); }
	/* Play current track */
	play() { this.dispatch(); }
	playSong(index) { this.dispatch(index); }
	/* Back to previous track*/
	previous() { this.dispatch(); }

	removeSong(index) { this.dispatch(index); }
	setAudioTime(time) { this.dispatch(time); }
	setSongs(songs) { this.dispatch(songs); }
	startBuffering() { this.dispatch(); }
	stopBuffering() { this.dispatch(); }
	toogleLoop() { this.dispatch(); }
	toogleShuffle() { this.dispatch(); }
	toogleVolume() { this.dispatch(); }
	tooglePlayerVisibility(){
		document.body.classList.toggle('show-player');
	}

}

export default alt.createActions(PlayerActions);
