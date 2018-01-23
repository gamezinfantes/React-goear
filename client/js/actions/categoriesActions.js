import alt from '../alt'
import request from 'superagent'
import PlayerActions from './playerActions'

class CategoriesActions {
	fetchSongs(category) { 
	  request
		.get(`api/category/${category}/`)
		.set('Accept', 'application/json')
		.end( (error, res) => {
		  let response = res.body;
		  PlayerActions.setSongs(response);
		});
	}

}

export default alt.createActions(CategoriesActions);