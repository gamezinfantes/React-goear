import alt from '../alt'
import AudioActions from '../actions/audioActions'
import PlayerActions from '../actions/playerActions'
import  {knuthShuffle} from 'knuth-shuffle'


class PlayerStore {
  constructor() {
    this.canControlled = true;
  	this.currentSong = 0;
  	this.duration = 0;
    this.isBuffering = true;
  	this.loop = false;
  	this.order = [];
  	this.paused = true;
  	this.showPlaylist = false;
  	this.songs = [];
  	this.shuffle = false;
  	this.time = 0;
  	this.volume = true;

  	this.getInitialSongs();

    this.bindListeners({
  	  handleAddSong: PlayerActions.ADD_SONG,
  	  handleAddSongAt: PlayerActions.ADD_SONG_AT,
  	  handleAddSongNext: PlayerActions.ADD_SONG_NEXT,
  	  handleChangeDuration: PlayerActions.CHANGE_DURATION,
  	  handleChangeOrder: PlayerActions.CHANGE_ORDER,
  	  handleChangeTime: PlayerActions.CHANGE_TIME,
  	  handleNext: PlayerActions.NEXT,
  	  handlePlaySong: PlayerActions.PLAY_SONG,
  	  handlePrevious: PlayerActions.PREVIOUS,
  	  handleRemoveSong: PlayerActions.REMOVE_SONG,
  	  handleSetAudioTime: PlayerActions.SET_AUDIO_TIME,
  	  handleSetSongs: PlayerActions.SET_SONGS,
      handlePlayPause: PlayerActions.PLAY_PAUSE,
      handlePlay: PlayerActions.PLAY,
      handlePause: PlayerActions.PAUSE,
      handleToogleLoop: PlayerActions.TOOGLE_LOOP,
      handleToogleShuffle: PlayerActions.TOOGLE_SHUFFLE,
      handleToogleVolume: PlayerActions.TOOGLE_VOLUME,
      handleStartBuffering: PlayerActions.START_BUFFERING,
      handleStopBuffering: PlayerActions.STOP_BUFFERING,

    });

    this.exportPublicMethods({
    	getSongs: this.getSongs.bind(this)
    });
  }
    initialOrder(){
    	let order = [];
    	for (var i = 0; i < this.songs.length; i++) {
    		order.push(i);
    	}
    	return order;
    }

  getSongs(){
  	return this.songs;
  }

  handleSetSongs(songs){
  	this.songs = songs;
  	this.order = this.initialOrder();
  	this.saveSongs();
  }

  handlePlay(){
    if(this.songs.length > 0){
      this.paused = false;
    }
  }
  handlePause(){
  	this.paused = true;
  }
  handlePlayPause() {
    this.paused = !this.paused;
  }
  handleToogleLoop() {
    this.loop = !this.loop;
  }
  handleToogleVolume() {
    this.volume = !this.volume;
  }



	handleNext() {
    this.time = 0;
		//Siguiente cancio
    if(this.currentSong < this.order.length-1){
  		this.currentSong = this.currentSong + 1 ;
      if (!this.paused) {
        AudioActions.play.defer();
      }
		//last song of the listc
    } else if (this.currentSong == this.order.length-1) {
			this.currentSong = 0;
			if(this.loop == false){
				AudioActions.pause.defer();
			}
		}
	}
	handlePrevious() {
		// song's start
		if (this.time > 3) {
			this.handleSetAudioTime(0);
		} else{
			if (this.currentSong>0)
        	this.currentSong = this.currentSong-1;
          if (!this.paused) {
            AudioActions.play.defer();
          }
		}

	}
	handleChangeDuration(duration) {
      this.duration = duration;
	}
	handleChangeTime(time) {
	  this.time = time;
	}
	handleChangeOrder(order) {
	  this.order = order;
	}

	handleAddSong(song){
		this.handleAddSongAt({song: song, index:this.songs.length});
	}
	randomIntFromInterval(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	handleAddSongAt(data){
		let {song, index} = data;
		//push into songs
		this.songs.splice(index, 0, song);
		let ind = (this.shuffle) ? this.randomIntFromInterval(this.currentSong, this.songs.length) : index;
		this.order.splice(ind, 0, index);
		for (var i = 0; i < this.songs.length; i++) {
			if(this.order[i]>index){
				this.order[i]++
			}
		}
		if (ind < this.currentSong) {
			this.currentSong++;
		}
		this.saveSongs();

	}
	handleAddSongNext(song) {
		// || 0 handles empty songs
		this.handleAddSongAt({song: song, index: (this.order[this.currentSong]+1) || 0 });
		if (this.paused) {
			this.currentSong++;
			AudioActions.play.defer();
		}
	}

	handlePlaySong(index) {
		let orderIndex = this.order.indexOf(index);
		this.currentSong = orderIndex;
		this.time = 0;
    if (!this.paused) {
      AudioActions.play.defer();
    }
	}
	handleRemoveSong(index){
		let orderIndex = this.order.indexOf(index);
		this.songs.splice(this.order[orderIndex], 1);
    if (orderIndex < this.currentSong ) {
      this.currentSong = this.currentSong - 1;
    }

    if (orderIndex == this.currentSong ) {
      // Last song
      if(this.currentSong == this.songs.length -1 ){
        this.currentSong = this.songs.length>1 ? is.currentSong - 1 : 0;
          AudioActions.pause.defer();
      } else {
        if (!this.paused) {
          AudioActions.play.defer();
        }
      }
    }
    this.order = this.initialOrder();
		this.saveSongs();
	}

	handleToogleShuffle(){
    	if (this.shuffle) {
    		this.currentSong = this.order[this.currentSong];
    		this.order = this.initialOrder();
    	} else {
 		   	this.randomOrder();
    	}
    	this.shuffle = !this.shuffle;
	}
	handleSetAudioTime(time){
		let event = new CustomEvent("setAudioTime", {
			detail: {
				time: time,
			},
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event)
	}

	randomOrder(){
		// The shuffle modifies the original array
		// calling a.slice(0) creates a copy, which is assigned to b
		let shuffleOrder = [this.currentSong];
		let oldOrder = this.order.slice(0);
		// currentSong is removed
		oldOrder.splice(this.currentSong, 1);
		// reorder songs
		shuffleOrder = shuffleOrder.concat(knuthShuffle(oldOrder));
		this.order = shuffleOrder;
		this.currentSong = 0;
	}

	saveSongs(){
    if (typeof localStorage !== 'undefined') {
		  localStorage.currentPlaylist = JSON.stringify(this.songs);
    }
	}
	getInitialSongs(){
    if (typeof localStorage !== 'undefined') {
  		this.songs = JSON.parse(localStorage.currentPlaylist || '[]');
  		this.order = this.initialOrder();
    }
		// this.currentSong =
	}
	handleStartBuffering(){
		this.isBuffering = true;
	}
	handleStopBuffering(){
		this.isBuffering = false;
	}
}

export default alt.createStore(PlayerStore, 'PlayerStore');
