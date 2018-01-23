import alt from '../alt'
import request from 'superagent'


class SearchActions {
	toogleShow() { 
		document.querySelector('.search-aside input').focus();
		this.dispatch(); 
	}
	hide() { this.dispatch(); }
	setResults(results) { this.dispatch(results); }
	clearResults() { 
		this.actions.setSearching(false);
		this.actions.setResults([]); 
	}

	setHistory(results) { this.dispatch(results); }
	clearHistory() { this.dispatch(); }
	addToHistory(item) { this.dispatch(item); }
	fetchResults(q) { 
	  this.actions.setSearching(true);
	  request
		.get('https://api.spotify.com/v1/search')
		.query({
			q: q,
			type: 'track',
			market: 'ES',
			limit: 10})
		.set('Accept', 'application/json')
		.end( (error, res) => {
		  window.response = res.body;
		  let results = [];
		  response.tracks.items.map((item) => { results.push(item.name);} )
		  this.actions.setResults(results);
		});
	}
	setSearching(value) { this.dispatch(value); }

}

export default alt.createActions(SearchActions);