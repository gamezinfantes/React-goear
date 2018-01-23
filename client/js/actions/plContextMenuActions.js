import alt from '../alt'
import PlayerActions from '../actions/playerActions'

class PlConteMenuActions {
	open(data){
		/* data = { posX, poxY, song } */
		this.dispatch(data);
	}
	close(){ this.dispatch();	}

	play(song){
		PlayerActions.addSongNext(song);
		this.dispatch();
	}
	addToQueue(song){
		PlayerActions.addSong(song);
		this.dispatch();
	}
	addToMyMusic(song){
		this.dispatch();
	}
	share(song){
		this.dispatch();
	}


}

export default alt.createActions(PlConteMenuActions);
