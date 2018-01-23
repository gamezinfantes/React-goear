import alt from '../alt'
import request from 'superagent'


class SearchPageActions {
	setSongs(songs) { this.dispatch(songs); }
	setLoading(loading) { this.dispatch(loading); }
	fechSongs(q){
		this.actions.setLoading(true);
		request
		.get('/api/search/'+q+'/')
		.set('Accept', 'application/json')
		.end( (error, res) => {
		  this.actions.setLoading(false);
		  this.actions.setSongs(res.body);
		});
	}
}

export default alt.createActions(SearchPageActions);
