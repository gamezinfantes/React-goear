import alt from '../alt'
import SearchPageActions from '../actions/searchPageActions'

class SearchPageStore {
	constructor(){
		this.songs = [];
		this.isLoading = true;
		this.bindListeners({
			handleSetSongs: SearchPageActions.SET_SONGS,
			handleSetLoading: SearchPageActions.SET_LOADING,
		});
	}

	handleSetSongs(songs){
		this.songs = songs;
	}
	handleSetLoading(loading){
		this.isLoading = loading;
	}

}

export default alt.createStore(SearchPageStore, 'SearchPageStore')