import alt from '../alt'
import SearchAsideActions from '../actions/searchActions'

class SearchAsideStore {
	constructor(){
		this.show = false;
		this.results = [];
		this.history = this.initialHistory();
		this.searching = false;


		this.bindListeners({
			handleToogleShow: SearchAsideActions.TOOGLE_SHOW,
			handleSetResults: SearchAsideActions.SET_RESULTS,
			handleAddToHistory: SearchAsideActions.ADD_TO_HISTORY,
			handleClearHistory: SearchAsideActions.CLEAR_HISTORY,
			handleSetSearching: SearchAsideActions.SET_SEARCHING,
		});
	}

	initialHistory(){
		if (typeof localStorage !=='undefined') {
			if (localStorage.history) {
				return JSON.parse(localStorage.history);
			}
		}
		return [];
	}

	handleSetResults(results){
		this.results = results;
	}

	handleToogleShow(){
		this.show = !this.show;
	}

	handleAddToHistory(item){
		let position = this.history.indexOf(item)
		if (position > -1 ){
			this.history.splice(position, 1);
		}

		this.history.unshift(item);
		// remove las element
		if (this.history.lenght > 9) {
			this.history.pop();
		}
		this.saveHistory();
	}
	handleClearHistory(){
		this.history = [];
		this.saveHistory();
	}
	handleSetSearching(value) {
		this.searching = value
	}

	saveHistory(){
		if(typeof localStorage !== 'undefined'){
			localStorage.history = JSON.stringify(this.history);
		}
	}



}

export default alt.createStore(SearchAsideStore, 'SearchAsideStore')
