import alt from '../alt'
import PlContextMenuActions from '../actions/plContextMenuActions'

class PlContextMenuStore {
	constructor(){
		this.isActive = false;
		this.posX = 0; 
		this.posY = 0;
		this.song = {};

		this.bindListeners({
			open: PlContextMenuActions.OPEN,
			close: PlContextMenuActions.CLOSE,
		})

	}
	open(data){
		this.setState({
		isActive: true,
		posX: data.posX, 
		posY: data.posY,
		song: data.song});
	}
	close(){
		this.isActive = false;
		this.song = {};
	}

}


export default alt.createStore(PlContextMenuStore, 'PlContextMenuStore');
