import alt from '../alt'

class SongStore {
	construct(){
		this.songs = {};
	}

	getSong(id){

	}
	addSong(song){
		this.songs[song.id] = song;
	}
}

export default alt.createStore(SongStore, 'SongStore');